import React, { useEffect, useRef, useState } from "react";
import "./createVoucher.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import VoucherService from "../../APIServices/VoucherAPI";
import VoucherEmployeeService from "../../APIServices/VoucherEmployeeAPI";
import VoucherServiceItemService from "../../APIServices/VoucherServiceItemAPI";
import InfoTag from "../../components/infoTag/InfoTag";
import Table from "../../components/table/Table";
import CheckListSign from "../../components/checkListSign/CheckListSign";
import InitialFinalCheckList from "../../components/initialFinalCheckList/InitialFinalCheckList";
import ServicePlaceService from "../../APIServices/ServicePlaceAPI";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import { useDispatch, useSelector } from "react-redux";
import modalsAndDataSlice, {
  clearExternalItems,
  delteExternalItems,
  openCustomerFinalSignaturePadModal,
  openEmployeeFinalSignaturePadModal,
  openExternalItemModal,
  removeCustomerFinalSignature,
  removeEmployeeFinalSignature,
  setUserSelectedImage,
} from "../../redux/modalsAndDataSlice";
import { BiImageAdd } from "react-icons/bi";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { ImCross } from "react-icons/im";
import CreateVoucherService from "../../components/createVoucherService/CreateVoucherService";
import FrameComponentService from "../../APIServices/FrameComponentAPI";
import DamageTypeService from "../../APIServices/DamageTypeAPI";
import ErrorComponentImage from "../../components/errorComponentImage/ErrorComponentImage";
import ServiceItemService from "../../APIServices/ServiceItemAPI";
import FinalCheckService from "../../APIServices/FinalcheckAPI";
import FinalImageService from "../../APIServices/FinalImageAPI";
import VoucherPaymentService from "../../APIServices/VoucherPaymentAPI";
import VoucherOutsourceService from "../../APIServices/VoucherOutsourceAPI";
import AppService from "../../APIServices/AppAPI";
import { finishLoading, startLoading } from "../../redux/loadingSlice";

function CreateVoucher() {
  const { servicePlaceId } = useParams();
  const modalsAndData = useSelector((state) => state.modalsAndData);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef();
  const navigate = useNavigate();

  const [servicePlaceService, setServicePlaceService] = useState({});
  const [servicePlaceServiceItem, setServicePlaceServiceItem] = useState([]);
  const [errorImages, setErrorImages] = useState([]);
  const [errorType, setErrorType] = useState("Select Error Type");
  const [componentType, setComponentType] = useState("Select Component Type");
  const [activeDropdowns, setActiveDropdowns] = useState({
    errorTypeActive: false,
    componenetTypeActive: false,
  });
  const [componentsType, setComponentsType] = useState([]);
  const [errorsType, setErrosType] = useState([]);
  const [customerNotes, setCustomerNotes] = useState("");
  const [paymentCheck, setPaymentCheck] = useState({
    fullPayment: false,
    customPayment: false,
    noPayment: false,
  });
  const [payAmount, setPayAmount] = useState("");
  const { loading } = useSelector((state) => state.loading);
  useEffect(() => {
    async function fetchServicePalce() {
      const data = await ServicePlaceService.GetServicePlace(servicePlaceId);
      setServicePlaceService(data);
      async function fetchComponent() {
        const compoData = await FrameComponentService.GetFrameComponents(
          data.serviceplaces.customerCar_id.car.frame_id
        );
        setComponentsType(compoData);
      }
      fetchComponent();
    }

    async function fetchServicePlaceServiceItem() {
      const data = await ServicePlaceServiceItemService.GetTestMethod(
        servicePlaceId
      );
      setServicePlaceServiceItem(data);
    }

    async function fetchErrorTypes() {
      const data = await DamageTypeService.GetDamageTypes();
      setErrosType(data);
    }

    fetchServicePlaceServiceItem();
    fetchServicePalce();
    fetchErrorTypes();
    dispatch(removeCustomerFinalSignature());
    dispatch(removeEmployeeFinalSignature());
  }, [dispatch, servicePlaceId]);

  function openCustomerFinalSignautrePadHandle() {
    dispatch(openCustomerFinalSignaturePadModal());
  }

  function openEmployeeFinalSignautrePadHandle() {
    dispatch(openEmployeeFinalSignaturePadModal());
  }

  // console.log("Serivce palce service item", servicePlaceServiceItem);
  // console.log("Serivce palce service", servicePlaceService);

  async function createVoucherHandle() {
    dispatch(startLoading());
    const finalChecklist_id = await FinalCheckService.InsertFinalCheck({
      employee_sign: modalsAndData.employeeFinalSignature,
      customer_sign: modalsAndData.customerFinalSignature,
      notes: customerNotes,
      customer_rating: 1,
    });
    if (finalChecklist_id === 500) {
      alert("Something went wrong");
      dispatch(finishLoading());
      return;
    }
    const FinalImage_formData = new FormData();
    errorImages.forEach((formError) => {
      FinalImage_formData.append("file", formError.errorImage);
      let value_dict = {
        initcheck_id: finalChecklist_id.id,
        damaged_part: formError.component,
        damage_type: formError.damageType,
      };
      FinalImage_formData.append("all_value", JSON.stringify(value_dict));
    });
    const final_form_data = await FinalImageService.InsertFinalImage(
      FinalImage_formData
    );
    if (final_form_data === 500) {
      alert("Something went wrong");
      dispatch(finishLoading());
      return;
    }
    const serviceFormData = new FormData();
    serviceFormData.append("array", JSON.stringify(servicePlaceServiceItem));
    serviceFormData.append(
      "servicePlace_id",
      servicePlaceService.serviceplaces.id
    );
    await ServiceItemService.UpdateServiceItem(serviceFormData);
    const servicePlace_Data = await ServicePlaceService.DeleteServicePlace(
      servicePlaceService.serviceplaces.id
    );
    if (servicePlace_Data.service_place.name.includes("Other")) {
      await ServicePlaceService.RealDeleteServicePlace(
        servicePlaceService.serviceplaces.id
      );
    }
    const voucher_data = await VoucherService.InsertVoucher({
      customerCar_id: servicePlace_Data.service_place.customerCar_id,
      initChecklist_id: servicePlace_Data.service_place.initChecklist_id,
      finalChecklist_id: finalChecklist_id.id,
      total: calculateTotals(),
    });
    modalsAndData.externalItems.forEach(
      async (itm) =>
        await VoucherOutsourceService.InsertVoucherOutsource({
          voucher_id: voucher_data.id,
          item_name: itm.itemName,
          source_name: itm.source,
          quantity: itm.quantity,
          price: itm.price,
          total: itm.price * itm.quantity,
        }).then((res) => console.log(res))
    );
    servicePlace_Data.serviceplace_Employees.forEach(async (emp) => {
      await VoucherEmployeeService.InsertVoucherEmployee({
        employee_id: emp.employee_id,
        voucher_id: voucher_data.id,
        role: emp.role,
      });
    });
    servicePlace_Data.serviceplace_ServiceItems.forEach(async (serviceItem) => {
      await VoucherServiceItemService.InsertVoucherServiceItem({
        service_place: serviceItem.servicePlace_id,
        voucher_id: voucher_data.id,
        serviceItem_id: serviceItem.serviceItem_id,
      });
    });
    const [day, month, year] = [1, 8, 2022];
    await VoucherPaymentService.InsertVoucherPayment(day, month, year, {
      total_amount: calculateTotals(),
      paid_amount: paymentCheck.fullPayment
        ? calculateTotals()
        : paymentCheck.customPayment
        ? payAmount
        : paymentCheck.noPayment
        ? 0
        : null,
      voucher_id: voucher_data.id,
    });
    await AppService.ClearFolder();
    dispatch(finishLoading());
    navigate(`/tables/vouchersTable/printVoucher/${voucher_data.id}`);
  }

  function calculateTotals() {
    let totals = 0;
    let finalTotals = 0;
    let services_price = 0;
    servicePlaceServiceItem.forEach(
      (ser) => (services_price += ser.service.service_price)
    );

    let items_price = 0;
    let external_price = modalsAndData.externalItems.reduce(
      (current, next) => current + parseInt(next.price * next.quantity),
      0
    );

    servicePlaceServiceItem.forEach((ser) =>
      ser.items
        .filter((itm) => !itm.hasOwnProperty("customer_id"))
        .forEach((it) => (items_price += it.price * it.quantity))
    );

    totals = services_price + items_price;
    console.log(totals);
    console.log(external_price);
    finalTotals = totals + external_price;
    return finalTotals;
  }

  function toggleActiveDropdown(toChangeProperty) {
    setActiveDropdowns({
      ...activeDropdowns,
      [toChangeProperty]: !activeDropdowns[toChangeProperty],
    });
  }

  function handleFileBtnClick() {
    hiddenFileInput.current.click();
  }

  function handleAddErrorImageHandle(e) {
    const imageFile = e.target.files[0];
    console.log(imageFile);

    if (
      errorType === "Select Error Type" ||
      componentType === "Select Component Type"
    ) {
      return;
    }

    const newErrorImageObj = {
      damageType: errorType,
      errorImage: imageFile,
      component: componentType,
    };

    setErrorImages([...errorImages, newErrorImageObj]);
    setErrorType("Select Error Type");
    setComponentType("Select Component Type");
  }

  function handleDropdownSelect(item, toChange) {
    if (toChange === "COMPONENT") {
      setComponentType(item.name);
      return;
    }
    if (toChange === "ERROR") {
      setErrorType(item.name);
      return;
    }
  }

  function deleteErrorImageHandle(errorImage) {
    const cloneErrorImages = [...errorImages];
    const toRemoveIndex = cloneErrorImages.findIndex(
      (errImage) => errImage.errorImage === errorImage
    );
    cloneErrorImages.splice(toRemoveIndex, 1);
    setErrorImages([...cloneErrorImages]);
  }

  useEffect(() => {
    dispatch(clearExternalItems());
  }, []);

  return (
    <div className="createVoucher_wrapper">
      <h3>Service Place {servicePlaceService?.serviceplaces?.name}</h3>
      <div className="createVoucher">
        {servicePlaceServiceItem?.map((service, index) => (
          <CreateVoucherService
            key={index}
            SERVICE={service}
            setServicePlaceServiceItem={setServicePlaceServiceItem}
            servicePlaceServiceItem={servicePlaceServiceItem}
          />
        ))}
      </div>
      <div className="externalItems_wrapper">
        <button
          className="addExternalItems_btn"
          onClick={() => dispatch(openExternalItemModal())}
        >
          Add External Item
        </button>
        <h3>External Items</h3>
        <div className="exItems_outsideWrapper">
          <div className="exItems_wrapper">
            <table>
              <tr>
                <th>Item Name</th>
                <th>Source</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotals</th>
                <th>Actions</th>
              </tr>
              {modalsAndData.externalItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.source}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity * item.price}</td>
                  <td>
                    <button
                      onClick={() =>
                        dispatch(delteExternalItems({ itmName: item.itemName }))
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="totals_wrapper">
        <h4 className="totals">
          Totals <span className="totals_price">{calculateTotals()}</span>
        </h4>
      </div>
      <div className="divDivider">
        <div className="dropDownWrapper">
          <div
            className="dropdownInputTag"
            onClick={() => toggleActiveDropdown("componenetTypeActive")}
          >
            <label>Component</label>
            <div className="dropdownValue">
              {componentType}
              <IoIosArrowDropdownCircle className="dropdownIcon" />
            </div>

            {activeDropdowns.componenetTypeActive && (
              <div className="dropdownList">
                {componentsType.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => handleDropdownSelect(item, "COMPONENT")}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="errordropdown_wrapper">
          <div className="dropDownWrapper">
            <div
              className="dropdownInputTag"
              onClick={() => toggleActiveDropdown("errorTypeActive")}
            >
              <label>Error</label>
              <div className="dropdownValue">
                {errorType}
                <IoIosArrowDropdownCircle className="dropdownIcon" />
              </div>

              {activeDropdowns.errorTypeActive && (
                <div className="dropdownList">
                  {errorsType.map((item, index) => (
                    <p
                      key={index}
                      onClick={() => handleDropdownSelect(item, "ERROR")}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="addImage_iconWrapper" onClick={handleFileBtnClick}>
              <BiImageAdd className="addImage_icon" />
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleAddErrorImageHandle}
            />
          </div>
        </div>
      </div>
      <div className="divSelectedComponent_wrapper">
        <label>Selected Component</label>
        <div className="selectComponentInsideWrapper">
          <div className="divOverFlowWrapper">
            <div className="selectedComponent">
              {errorImages.map((error, index) => (
                <ErrorComponentImage
                  key={index}
                  errorImage={error.errorImage}
                  damageType={error.damageType}
                  deleteErrorImageFunc={deleteErrorImageHandle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="signatureDiv_wrapper">
        <label>Signatures</label>
        <div className="signatureButtonsWrapper">
          {modalsAndData.employeeFinalSignature ? (
            <div className="signatureImageWrapper">
              <div
                className="signatureImage_removeIconWrapper"
                onClick={() => dispatch(removeEmployeeFinalSignature())}
              >
                <ImCross className="signature_removeIcon" />
              </div>
              <img
                onClick={(e) =>
                  dispatch(setUserSelectedImage({ data: e.target.src }))
                }
                src={modalsAndData.employeeFinalSignature}
                alt="employeeSignature"
              />
              <label>Employee Signature</label>
            </div>
          ) : (
            <button onClick={openEmployeeFinalSignautrePadHandle}>
              Add Employee Signature
            </button>
          )}
          {modalsAndData.customerFinalSignature ? (
            <div className="signatureImageWrapper">
              <div
                className="signatureImage_removeIconWrapper"
                onClick={() => dispatch(removeCustomerFinalSignature())}
              >
                <ImCross className="signature_removeIcon" />
              </div>
              <img
                onClick={(e) =>
                  dispatch(setUserSelectedImage({ data: e.target.src }))
                }
                src={modalsAndData.customerFinalSignature}
                alt="customerSignature"
              />
              <label>Customer Signature</label>
            </div>
          ) : (
            <button onClick={openCustomerFinalSignautrePadHandle}>
              Add Customer Signature
            </button>
          )}
        </div>
      </div>
      <div className="customerNotes_wrapper">
        <label>Notes</label>
        <textarea
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
        ></textarea>
      </div>
      <div className="payment">
        <label>Payment Method</label>
        <div className="payments_wrapper">
          <div
            className="paymentMethod_wrapper"
            onClick={() =>
              setPaymentCheck({
                fullPayment: true,
                customPayment: false,
                noPayment: false,
              })
            }
          >
            <p>Full payment</p>
            <input
              checked={paymentCheck.fullPayment}
              type="radio"
              onChange={() => console.log("asdf")}
            />
          </div>
          <div
            className="paymentMethod_wrapper"
            onClick={() =>
              setPaymentCheck({
                fullPayment: false,
                customPayment: true,
                noPayment: false,
              })
            }
          >
            <p>Custom payment</p>
            <input type="radio" checked={paymentCheck.customPayment} />
          </div>
          <div
            className="paymentMethod_wrapper"
            onClick={() =>
              setPaymentCheck({
                fullPayment: false,
                customPayment: false,
                noPayment: true,
              })
            }
          >
            <p>No payment</p>
            <input type="radio" checked={paymentCheck.noPayment} />
          </div>
        </div>
      </div>
      {paymentCheck.customPayment && (
        <input
          onChange={(e) => {
            const amount = e.target.value;
            const totals = calculateTotals();
            if (amount < totals) {
              setPayAmount(amount);
              return;
            }
            if (amount > totals) {
              setPayAmount(totals);
              return;
            }
            setPayAmount(amount);
          }}
          value={payAmount}
          type="text"
          placeholder={`Add Payment`}
          className="paymentInput"
        />
      )}
      <button
        className="createVoucherBtn"
        onClick={createVoucherHandle}
        disabled={loading}
      >
        {loading ? "Loading" : "Create Voucher"}
      </button>
    </div>
  );
}

export default CreateVoucher;
