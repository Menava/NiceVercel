import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PopupModal from "./components/popupModal/PopupModal";
import Sidebar from "./components/Sidebar/Sidebar";
import Pages from "./Pages";
import Login from "./pages/Login/Login";
import { alreadyLogin, login, withoutPermission } from "./redux/userSlice";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  disconnectItems,
  editCustomer,
  editEmployee,
  getAllServicePlaces,
  getEmployees,
  getEmployeeSalareis,
  getGeneralPurchases,
  getItems,
  getServices,
  getSuppliers,
  getVouchers,
} from "./redux/Apicall";
import {
  addExternalItems,
  closeModal,
  disconnectItemHandle,
  disconnectItemSet,
  openModalNavSidebar,
  resetItemsOnDisconnect,
  setCustomerFinalSignature,
  setEmployeeFinalSignature,
} from "./redux/modalsAndDataSlice";
import { FaRegListAlt } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import AppNavSidebar from "./components/appNavSidebar/AppNavSidebar";
import ServiceService from "./APIServices/ServiceAPI";
import ItemService from "./APIServices/ItemAPI";
import SupplierService from "./APIServices/SupplierAPI";
import { fetchAddedServiceFromCookie } from "./redux/addedServicesSlice";
import {
  addEmployee,
  setCustomerSignature,
  setEmployeeSignature,
} from "./redux/prepareServiceInputSlice";
import SignaturePadCompo from "./components/signaturePadCompo/SignaturePadCompo";
import OpenAddItemService from "./components/openAddItemService/OpenAddItemService";
import AddServiceServiceStatus from "./components/addServiceServiceStatus/AddServiceServiceStatus";
import ServicePlaceServiceItemService from "./APIServices/ServicePlaceServiceItemAPI";
import AddNewItemModal from "./components/addNewItemModal/AddNewItemModal";
import ItemPurchaseService from "./APIServices/ItemPurchasesAPI";

import ItemPaymentService from "./APIServices/ItemPaymentAPI";
import GiveEmployeeSalaryModal from "./components/giveEmployeeSalaryModal/GiveEmployeeSalaryModal";
import GeneralPurchaseService from "./APIServices/GeneralPurchaseAPI";
import ReviewImage from "./pages/reviewImage/ReviewImage";
import Noti from "./components/Noti/Noti";
import { setSocketItems } from "./redux/socketSlice";
import EmployeeService from "./APIServices/EmployeeAPI";
import ServicePlaceService from "./APIServices/ServicePlaceAPI";
import VoucherPaymentService from "./APIServices/VoucherPaymentAPI";
import AppService from "./APIServices/AppAPI";
import WaitingModal from "./components/waitingModal/WaitingModal";
import DeleteItemModal from "./components/deleteItemModal/DeleteItemModal";
import NotificationService from "./APIServices/NotificationAPI";
import { finishLoading, startLoading } from "./redux/loadingSlice";
import EmployeePayrollService from "./APIServices/EmployeePayrollAPI";
import GeneralPurchaseModal from "./components/generalPurchaseModal/GeneralPurchaseModal";

function App() {
  const { username, position } = useSelector((state) => state.user);
  const modalsAndData = useSelector((state) => state.modalsAndData);
  const addedService = useSelector((state) => state.addedService);
  // console.log("AddedServices", addedService.addedServices);
  // console.log("Items", modalsAndData.items);
  const { customerInitialValues, employeeInitialValues } = modalsAndData;
  const { employeeLeader } = useSelector((state) => state.prepareserviceInputs);
  const { socket } = useSelector((state) => state.socket);
  const customerSignaturePad = useRef({});
  const employeeSignaturePad = useRef({});
  const customerFinalSignaturePad = useRef({});
  const employeeFinalSignaturePad = useRef({});
  const notiWrapperRef = useRef();
  const dispatch = useDispatch();
  const addEmployeePrepareServiceRef = useRef();
  const inputedService = useSelector((state) => state.inputedService);
  const [openNoti, setOpenNoti] = useState(false);
  function closeModalHandle(e) {
    e.target === addEmployeePrepareServiceRef.current && dispatch(closeModal());
  }
  const [generalPurchase, setGeneralPurchase] = useState({
    Description: "",
    Price: "",
    Quantity: "",
  });
  const [purchaseOptions, setPurchaseOptions] = useState({
    Cooking: "",
    General: "",
    Food: "",
    Tax: "",
    Donation: "",
    "Health Care": "",
  });
  const [selectedPurchaseOptions, setSelectedPurchaseOptions] = useState("");
  const [toEditGeneralPurchaseId, setToEditGeneralPurchaseId] = useState("");
  // useEffect(() => {
  //   function onBeforeunload(e) {
  //     e.preventDefault();
  //     Cookies.remove("addedService", { path: "/" });
  //     // Cookies.remove("items", { path: "/" });
  //     e.returnValue = "";
  //   }

  //   window.addEventListener("beforeunload", onBeforeunload);

  //   return () => window.removeEventListener("beforeunload", onBeforeunload);
  // }, []);

  // useEffect(() => {
  //   socket.on("user-connected-self-excluded", (data) => {
  //     socket.emit(
  //       "item_event",
  //       Cookies.get("refillItems"),
  //       Cookies.get("items")
  //     );
  //   });

  //   return () => socket.disconnect();
  // }, []);

  // useEffect(() => {
  //   socket.on("receive_items", function (data) {
  //     getItems(dispatch, "SOCKET", data);
  //   });

  //   socket.on("disconnect", (data) => {
  //     dispatch(disconnectItemSet({ data }));
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);

  // Check user is in local storage or not

  useEffect(() => {
    async function fetchSession() {
      // const session = await AppService.GetSession();
      // if (session.user !== null) {
      //   dispatch(
      //     alreadyLogin({
      //       name: session.user.name,
      //       username: session.user.username,
      //       position: session.user.position,
      //     })
      //   );
      // }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    dispatch(fetchAddedServiceFromCookie());
  }, [dispatch, Cookies.get("addedService")]);

  // Customer handle Functions
  function updateCustomerHandle() {
    const toChangeId = modalsAndData.toChangeCustomerId;
    editCustomer(
      toChangeId,
      customerInitialValues["Customer Name"],
      customerInitialValues["Customer Phone No"],
      dispatch
    );
    dispatch(closeModal());
  }

  // Employee handle Functions
  function updateEmployeeHandle() {
    const id = modalsAndData.toChangeEmployeeId;
    const employeeName = employeeInitialValues["Employee Name"];
    const position = employeeInitialValues.Position;
    const username = employeeInitialValues.Username;
    const password = employeeInitialValues.Password;
    editEmployee(id, employeeName, position, username, password, dispatch);
    dispatch(closeModal());
  }

  // toggle App Nav Sidebar handle
  function openAppNavSidebar() {
    dispatch(openModalNavSidebar());
  }

  // Add new service Handle
  async function addNewServiceHandle() {
    dispatch(startLoading());
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", modalsAndData.serviceInitialValues.Image);
    // console.log("FORMDATA", formData.get("file"));
    formData.append(
      "service_type",
      modalsAndData.serviceInitialValues["Service Type"]
    );
    formData.append(
      "service_price",
      modalsAndData.serviceInitialValues["Service Price"]
    );
    formData.append(
      "service_detail",
      modalsAndData.serviceInitialValues["Service Detail"]
    );
    const service_data = await ServiceService.InsertService(formData);

    console.log("service_data", service_data);

    dispatch(finishLoading());
    getServices(dispatch);
    if (service_data === 500) alert("Something went wrong");
    if (service_data !== 500) {
      dispatch(closeModal());
    }
  }

  async function editServiceHandle() {
    dispatch(startLoading());
    const formData = new FormData();
    const id = modalsAndData.toChangeServiceId;

    formData.append("file", modalsAndData.serviceInitialValues.Image);
    formData.append(
      "service_type",
      modalsAndData.serviceInitialValues["Service Type"]
    );
    formData.append(
      "service_price",
      modalsAndData.serviceInitialValues["Service Price"]
    );
    formData.append(
      "service_detail",
      modalsAndData.serviceInitialValues["Service Detail"]
    );
    const data = await ServiceService.UpdateService(id, formData);

    dispatch(finishLoading());
    getServices(dispatch);
    if (data === 500) alert("Something went wrong");
    if (data !== 500) {
      dispatch(closeModal());
    }
  }

  // Add new Customer Handle
  function addNewCustomerHandle() {
    console.log("Add new Customer");
  }

  // Add new Employee Handle
  async function addNewEmployeeHandle() {
    if (
      modalsAndData.employeeInitialValues["Employee Name"] === " " ||
      modalsAndData.employeeInitialValues.Position === "" ||
      modalsAndData.employeeInitialValues.Username === "" ||
      modalsAndData.employeeInitialValues.Password === ""
    ) {
      alert("Please fill out this form properly");
      return;
    }
    await EmployeeService.InsertEmployee({
      name: modalsAndData.employeeInitialValues["Employee Name"],
      position: modalsAndData.employeeInitialValues.Position,
      username: modalsAndData.employeeInitialValues.Username,
      password: modalsAndData.employeeInitialValues.Password,
    });
    getEmployees(dispatch);
    dispatch(closeModal());
  }

  async function editItemHandle() {
    dispatch(startLoading());
    const formData = new FormData();
    formData.append("file", modalsAndData.itemsInitialValues.Image);
    console.log("FORMDATA", formData.get("file"));
    formData.append("name", modalsAndData.itemsInitialValues["Item Name"]);
    formData.append("quantity", modalsAndData.itemsInitialValues["Qty"]);
    formData.append("price", modalsAndData.itemsInitialValues["Price"]);
    formData.append("supplier_id", modalsAndData.toChangeSupplierItemId);
    console.log("triggered item edit Item");
    const data = await ItemService.UpdateItem(
      modalsAndData.toChangeItemId,
      formData
    );

    if (data.status === 500) {
      alert("Something went wrong");
      return;
    }
    dispatch(finishLoading());
    if (data.status !== 500) {
      getItems(dispatch);
      dispatch(closeModal());
    }
  }

  // Add new Supplier
  async function addSupplier() {
    const name = modalsAndData.supplierInitialValues["Supplier Name"];
    await SupplierService.InsertSupplier(name);
    getSuppliers(dispatch);
    dispatch(closeModal());
  }

  async function editSupplier() {
    const name = modalsAndData.supplierInitialValues["Supplier Name"];
    const id = modalsAndData.toChangeSupplierId;
    await SupplierService.UpdateSupplier(id, name);
    getSuppliers(dispatch);
    dispatch(closeModal());
  }

  function recieveCustomerSignatureHandle(dataURL) {
    dispatch(setCustomerSignature(dataURL));
  }

  function recieveEmployeeSignatureHandle(dataURL) {
    dispatch(setEmployeeSignature(dataURL));
  }

  function recieveCustomerFinalSignatureHandle(dataURL) {
    dispatch(setCustomerFinalSignature(dataURL));
  }

  function recieveEmployeeFinalSignatureHandle(dataURL) {
    dispatch(setEmployeeFinalSignature(dataURL));
  }

  async function addServiceStatusCustomerItemHandle() {
    // console.log("service Place Id", modalsAndData.servicePlaceId);
    // console.log("service Id", modalsAndData.serviceId);
    // console.log("Customer Id", modalsAndData.servicePlaceCustomerId);
    if (
      modalsAndData.serviceStatusCustomerInputInitialValues["Item Name"] === ""
    )
      return;

    await ServicePlaceServiceItemService.AppendItem({
      servicePlace_id: modalsAndData.servicePlaceId,
      service_id: modalsAndData.serviceId,
      item_name:
        modalsAndData.serviceStatusCustomerInputInitialValues["Item Name"],
      item_id: "None",
      item_price: "None",
      customer_id: modalsAndData.servicePlaceCustomerId,
    });
    await ServicePlaceServiceItemService.GetTestMethod(
      modalsAndData.servicePlaceId
    ).then((resp) => {
      modalsAndData.setServices(resp);
    });
    dispatch(closeModal());
  }

  async function restockItemHandle() {
    const restockQty = modalsAndData.itemsRestockValues["Restock Qty"];
    const buyPrice = modalsAndData.itemsRestockValues["Buy Price"];
    const sellPrice = modalsAndData.itemsRestockValues["Sell Price"];

    const purchase_resp = await ItemPurchaseService.InsertItemPurchase({
      quantity_received: parseInt(restockQty),
      refund_quantity: 0,
      unit_price: buyPrice,
      sell_price: sellPrice,
      item_id: modalsAndData.toChangeItemId,
      status: false,
    });

    await ItemPaymentService.InsertItemPayment({
      paid_amount: purchase_resp.quantity_received * purchase_resp.unit_price,
      purchase_id: purchase_resp.id,
    });
    getItems(dispatch);
    dispatch(closeModal());
  }

  async function refundItemHandle() {
    const refundQty = modalsAndData.itemsRefundValues["Refund Qty"];
    const toChangeId = modalsAndData.toChangeItemId;
    const avaiableItemQty = modalsAndData.avaiableItemQty;
    if (refundQty > avaiableItemQty) {
      alert("Refund quatity is more than current item quantity");
      return;
    }
    await ItemPurchaseService.UpdateItemPurchase(toChangeId, { refundQty });

    getItems(dispatch);
    dispatch(closeModal());
  }
  // *****************************************
  async function addGeneralPurchaseHandle() {
    await GeneralPurchaseService.InsertGeneralPurchase({
      description: modalsAndData.generalPurchaseInitialValues.Description,
      unit_price: parseFloat(modalsAndData.generalPurchaseInitialValues.Price),
      quantity: parseInt(modalsAndData.generalPurchaseInitialValues.Quantity),
      purchase_type: modalsAndData.generalPurchaseInitialValues.Type,
    });
    getGeneralPurchases(dispatch);
    dispatch(closeModal());
  }
  // ******************************************

  // handling notiWrapper close base on click
  function notiWrapperCloseHandle(e) {
    let clickState = false;
    [...notiWrapperRef.current.children].forEach((notiDiv) => {
      if (e.target === notiDiv) {
        clickState = true;
        return;
      }
      if (e.target === notiDiv.firstElementChild) {
        clickState = true;
        return;
      }
    });
    if (!clickState && notiWrapperRef.current !== e.target && openNoti) {
      setOpenNoti(false);
    }
  }
  function addExternalItemHandle() {
    const itemName = modalsAndData.externalItemInitialValues["Item Name"];
    const price = modalsAndData.externalItemInitialValues.Price;
    const quantity = modalsAndData.externalItemInitialValues.Quantity;
    const source = modalsAndData.externalItemInitialValues.Source;
    const externalItem = { itemName, price, quantity, source };
    dispatch(addExternalItems({ data: externalItem }));
    dispatch(closeModal());
  }

  async function addNewSerivcePlaceHandle() {
    await ServicePlaceService.InsertServicePlace({
      name: modalsAndData.servicePlaceInitialValues["Service Place Name"],
      customerCar_id: "None",
      initChecklist_id: "None",
      state: 0,
      status: "Free",
    });
    getAllServicePlaces(dispatch);
    dispatch(closeModal());
  }

  async function payHandle() {
    const totals = modalsAndData.payInitialValues.Totals;
    const PaidAmount = modalsAndData.payInitialValues.PaidAmount;

    const totalsPaid =
      PaidAmount + parseInt(modalsAndData.payInitialValues.PayAmount);
    console.log(totals);
    console.log(totalsPaid);
    // console.log(totals <= totalsPaid);
    if (totalsPaid > totals) {
      alert("You can't add more than totals Amount");
    } else {
      await VoucherPaymentService.UpdateVoucherPayment(
        modalsAndData.voucherPaymentId,
        {
          paid_amount: totalsPaid,
        }
      );
      getVouchers(dispatch);
      dispatch(closeModal());
    }
  }

  async function deleteItemHandle() {
    await ItemService.DeleteItem(modalsAndData.toDeleteItemId);
    dispatch(closeModal());
    getItems(dispatch);
  }

  async function deleteServiceHandle() {
    await ServiceService.DeleteService(modalsAndData.openDeleteServiceId);
    dispatch(closeModal());
    getServices(dispatch);
  }

  const [notificatons, setNotificatoins] = useState([]);
  async function getNotifications() {
    const result = await NotificationService.GetNotifications();
    setNotificatoins(result);
    console.log("noti result", result);
  }
  useEffect(() => {
    getNotifications();
  }, []);

  async function deleteEmployeeSalaryHandle() {
    await EmployeePayrollService.DeleteEmployeePayroll(
      modalsAndData.toDeleteEmpSalaryId
    );
    getEmployeeSalareis(dispatch);
    dispatch(closeModal());
  }

  async function editSalaryHandle() {
    const salary = modalsAndData.editSalaryModal.Salary;
    const toEditRowId = modalsAndData.toEditEmpSalaryId;
    await EmployeePayrollService.UpdateEmployeePayroll(toEditRowId, {
      salary_amount: salary,
    }).then((resp) => console.log(resp));
    getEmployeeSalareis(dispatch);
    dispatch(closeModal());
  }

  async function deleteGeneralPurchase() {
    const toChangeId = modalsAndData.toDeleteGeneralPurchaseId;
    await GeneralPurchaseService.DeleteGeneralPurchase(toChangeId);
    getGeneralPurchases(dispatch);
    dispatch(closeModal());
  }

  // async function editGeneralPurchase() {
  //   const toChangeId = modalsAndData.toEditGeneralPurchaseId;
  //   const Description = modalsAndData.generalPurchase.Description;
  //   const Quantity = modalsAndData.generalPurchase.Quantity;
  //   const UnitPrice = modalsAndData.generalPurchase.UnitPrice;
  //   await GeneralPurchaseService.UpdateGeneralPurchase(toChangeId, {
  //     description: modalsAndData.generalPurchase.Description,
  //     unit_price: modalsAndData.generalPurchase.UnitPrice,
  //     quantity: modalsAndData.generalPurchase.Quantity,
  //     purchase_type: "Cost",
  //   });
  //   getGeneralPurchases(dispatch);
  //   dispatch(closeModal());
  // }
  //
  return (
    <BrowserRouter>
      {!username ? (
        <Login />
      ) : (
        <div>
          {modalsAndData.userSelectedImage !== "" && (
            <ReviewImage imageSrc={modalsAndData.userSelectedImage} />
          )}
          <div
            onClick={notiWrapperCloseHandle}
            className={
              modalsAndData.userSelectedImage === "" ? "app" : "d-none"
            }
          >
            <Sidebar />
            <div className="app_right">
              {modalsAndData.openWaitingModal && <WaitingModal />}
              {modalsAndData.openDeleteItemModal && (
                <DeleteItemModal handleFunction={deleteItemHandle} />
              )}
              {modalsAndData.openDeleteSerivceModal && (
                <DeleteItemModal handleFunction={deleteServiceHandle} />
              )}
              {modalsAndData.openDeleteEmployeeSalaryModal && (
                <DeleteItemModal handleFunction={deleteEmployeeSalaryHandle} />
              )}
              {modalsAndData.openDeleteGeneralPurchaseModal && (
                <DeleteItemModal handleFunction={deleteGeneralPurchase} />
              )}
              {/* Open pay Modal */}
              {modalsAndData.payModal && (
                <PopupModal
                  editModelHeader="Payment"
                  initialValues={modalsAndData.payInitialValues}
                  toChangeInputObj="payInitialValues"
                  handleFunction={payHandle}
                  buttonName="Add Payment"
                />
              )}
              {/* Open add new service place modal */}
              {modalsAndData.openAddNewServicePlaceModal && (
                <PopupModal
                  editModelHeader="Add New Service Place"
                  initialValues={modalsAndData.servicePlaceInitialValues}
                  toChangeInputObj="servicePlaceInitialValues"
                  handleFunction={addNewSerivcePlaceHandle}
                  buttonName="Add Service Place"
                />
              )}
              {/* openExternalItemModal */}
              {modalsAndData.openExternalItemModal && (
                <PopupModal
                  editModelHeader="External Item"
                  initialValues={modalsAndData.externalItemInitialValues}
                  toChangeInputObj="externalItemInitialValues"
                  handleFunction={addExternalItemHandle}
                  buttonName="Add External Item"
                />
              )}
              {/* Geneeral purchase Modal */}
              {modalsAndData.openGeneralPurhcaseModal && (
                <GeneralPurchaseModal
                  generalPurchase={generalPurchase}
                  setGeneralPurchase={setGeneralPurchase}
                  purchaseOptions={purchaseOptions}
                  setPurchaseOptions={setPurchaseOptions}
                  selectedPurchaseOptions={selectedPurchaseOptions}
                  setSelectedPurchaseOptions={setSelectedPurchaseOptions}
                  toEditGeneralPurchaseId={toEditGeneralPurchaseId}
                  setToEditGeneralPurchaseId={setToEditGeneralPurchaseId}
                  buttonName="Add General Purchase"
                />
                // <PopupModal
                //   editModelHeader="General Purchase"
                //   initialValues={modalsAndData.generalPurchaseInitialValues}
                //   toChangeInputObj="generalPurchaseInitialValues"
                //   handleFunction={addGeneralPurchaseHandle}
                //   buttonName="General Purchase"
                // />
              )}
              {/* Give Employee salaries Modal */}
              {modalsAndData.openGiveSalaryModal && <GiveEmployeeSalaryModal />}
              {/* openAddCustomerItemServiceModal */}
              {modalsAndData.openAddCustomerItemServiceStatus && (
                <PopupModal
                  editModelHeader="Add Customer item"
                  initialValues={
                    modalsAndData.serviceStatusCustomerInputInitialValues
                  }
                  toChangeInputObj="serviceStatusCustomerInputInitialValues"
                  handleFunction={addServiceStatusCustomerItemHandle}
                  buttonName="Add"
                />
              )}
              {/* openAddNewServiceServiceStatus Modal */}
              {modalsAndData.openAddNewServiceServiceStatus && (
                <AddServiceServiceStatus />
              )}
              {/* openAddItemServiceStatus Modal  */}
              {modalsAndData.openAddItemServiceStatus && <OpenAddItemService />}
              {/* Edit Customer Modal */}
              {modalsAndData.openEditCustomerModal && (
                <PopupModal
                  editModelHeader="Edit Customer"
                  initialValues={modalsAndData.customerInitialValues}
                  toChangeInputObj="customerInitialValues"
                  handleFunction={updateCustomerHandle}
                  buttonName="Edit"
                />
              )}
              {/* Add New Customer Modal */}
              {modalsAndData.openAddNewCustomerModal && (
                <PopupModal
                  editModelHeader="Add New Customer"
                  initialValues={modalsAndData.customerInitialValues}
                  toChangeInputObj="customerInitialValues"
                  handleFunction={addNewCustomerHandle}
                  buttonName="Add"
                />
              )}
              {/* Edit Employee Modal */}
              {modalsAndData.openEditEmployeeModal && (
                <PopupModal
                  editModelHeader="Edit Employee"
                  initialValues={modalsAndData.employeeInitialValues}
                  toChangeInputObj="employeeInitialValues"
                  handleFunction={updateEmployeeHandle}
                  buttonName="Edit"
                />
              )}
              {/* Add New Employee Modal */}
              {modalsAndData.openAddNewEmployeeModal && (
                <PopupModal
                  editModelHeader="Add New Employee"
                  initialValues={modalsAndData.employeeInitialValues}
                  toChangeInputObj="employeeInitialValues"
                  handleFunction={addNewEmployeeHandle}
                  buttonName="Add"
                />
              )}
              {/* Edit Service Modal */}
              {modalsAndData.openEditServiceModal && (
                <PopupModal
                  editModelHeader="Edit Service"
                  initialValues={modalsAndData.serviceInitialValues}
                  toChangeInputObj="serviceInitialValues"
                  handleFunction={editServiceHandle}
                  buttonName="Edit"
                />
              )}
              {modalsAndData.openEditGeneralPurchaseModal && (
                <GeneralPurchaseModal
                  generalPurchase={generalPurchase}
                  setGeneralPurchase={setGeneralPurchase}
                  purchaseOptions={purchaseOptions}
                  setPurchaseOptions={setPurchaseOptions}
                  selectedPurchaseOptions={selectedPurchaseOptions}
                  setSelectedPurchaseOptions={setSelectedPurchaseOptions}
                  toEditGeneralPurchaseId={toEditGeneralPurchaseId}
                  setToEditGeneralPurchaseId={setToEditGeneralPurchaseId}
                  buttonName="Edit General Purchase"
                  edit
                />
              )}
              {/* Add New Service Modal */}
              {modalsAndData.openAddServiceModal && (
                <PopupModal
                  editModelHeader="Add New Service"
                  initialValues={modalsAndData.serviceInitialValues}
                  toChangeInputObj="serviceInitialValues"
                  buttonName="Add"
                  handleFunction={addNewServiceHandle}
                />
              )}

              {/* Edit item Modal */}
              {modalsAndData.openEditItemModal && (
                <PopupModal
                  editModelHeader="Edit Item"
                  initialValues={modalsAndData.itemsInitialValues}
                  toChangeInputObj="itemsInitialValues"
                  buttonName="Edit"
                  handleFunction={editItemHandle}
                />
              )}
              {/* Add Item Modal */}
              {modalsAndData.openAddItemModal && <AddNewItemModal />}
              {/* openRefundItemModal */}
              {modalsAndData.openRefundItemModal && (
                <PopupModal
                  editModelHeader="Refund Item"
                  initialValues={modalsAndData.itemsRefundValues}
                  toChangeInputObj="itemsRefundValues"
                  buttonName="Refund"
                  handleFunction={refundItemHandle}
                />
              )}
              {modalsAndData.openEditEmployeeSalryModal && (
                <PopupModal
                  editModelHeader="Edit Salary"
                  initialValues={modalsAndData.editSalaryModal}
                  toChangeInputObj="editSalaryModal"
                  buttonName="Change"
                  handleFunction={editSalaryHandle}
                />
              )}
              {/* openopenRestockItemModal */}
              {modalsAndData.openRestockItemModal && (
                <PopupModal
                  editModelHeader="Restock Item"
                  initialValues={modalsAndData.itemsRestockValues}
                  toChangeInputObj="itemsRestockValues"
                  buttonName="Restock"
                  handleFunction={restockItemHandle}
                />
              )}
              {/* Edit Supplier Modal */}
              {modalsAndData.openEditSupplierModal && (
                <PopupModal
                  editModelHeader="Edit Supplier"
                  initialValues={modalsAndData.supplierInitialValues}
                  toChangeInputObj="supplierInitialValues"
                  buttonName="Edit"
                  handleFunction={editSupplier}
                />
              )}
              {/* Add Supplier Modal */}
              {modalsAndData.openAddSupplierModal && (
                <PopupModal
                  editModelHeader="Add New Supplier"
                  initialValues={modalsAndData.supplierInitialValues}
                  toChangeInputObj="supplierInitialValues"
                  buttonName="Add"
                  handleFunction={addSupplier}
                />
              )}
              {modalsAndData.openAddEmployeesPrepareServiceModal && (
                <div
                  className="addEmployees_wrapper"
                  ref={addEmployeePrepareServiceRef}
                  onClick={closeModalHandle}
                >
                  <div className="employees_wrapper">
                    <h2>Click to add employee</h2>
                    {modalsAndData.employees
                      .filter(
                        (employee) => employee.name !== employeeLeader.name
                      )
                      .map((emp) => (
                        <h3
                          onClick={() => dispatch(addEmployee(emp))}
                          key={emp.id}
                        >
                          {emp.name}
                        </h3>
                      ))}
                  </div>
                </div>
              )}
              {modalsAndData.openCustomerSignaturePad && (
                <SignaturePadCompo
                  signaturePad={customerSignaturePad}
                  confirmSignatureFunc={recieveCustomerSignatureHandle}
                />
              )}
              {modalsAndData.openEmployeeSignaturePad && (
                <SignaturePadCompo
                  signaturePad={employeeSignaturePad}
                  confirmSignatureFunc={recieveEmployeeSignatureHandle}
                />
              )}
              {modalsAndData.openCustomerFinalSignaturePad && (
                <SignaturePadCompo
                  signaturePad={customerFinalSignaturePad}
                  confirmSignatureFunc={recieveCustomerFinalSignatureHandle}
                />
              )}
              {modalsAndData.openEmployeeFinalSignaturePad && (
                <SignaturePadCompo
                  signaturePad={employeeFinalSignaturePad}
                  confirmSignatureFunc={recieveEmployeeFinalSignatureHandle}
                />
              )}
              {/* App Nav Sidebar modal */}
              {modalsAndData.openNavSidebarModal && <AppNavSidebar />}
              <div className="app_nav">
                <div className="app_navLeft">
                  <h3>
                    {username}: ({position})
                  </h3>
                </div>
                <div className="app_navRight">
                  <div
                    ref={notiWrapperRef}
                    className={
                      openNoti
                        ? "notiDropdown_wrapper active"
                        : "notiDropdown_wrapper"
                    }
                  >
                    {notificatons.map((noti) => (
                      <Noti
                        key={noti.id}
                        noti={noti}
                        setOpenNoti={setOpenNoti}
                        setNotificatoins={setNotificatoins}
                      />
                    ))}
                  </div>
                  <FaRegListAlt
                    className="app_nav_icon"
                    style={{
                      color:
                        Object.keys(inputedService.makeService).length === 0
                          ? "red"
                          : "green",
                    }}
                  />
                  <div
                    className="notiIcon_wrapper"
                    onClick={() => setOpenNoti((prev) => !prev)}
                  >
                    <div className="noti_wrapper">
                      {notificatons.filter((res) => !res.seen).length}
                    </div>
                    <MdNotifications className="app_nav_icon" />
                  </div>
                  <FaRegListAlt
                    className="app_nav_icon"
                    onClick={openAppNavSidebar}
                  />
                </div>
              </div>
              <Pages
                generalPurchase={generalPurchase}
                setGeneralPurchase={setGeneralPurchase}
                purchaseOptions={purchaseOptions}
                setPurchaseOptions={setPurchaseOptions}
                selectedPurchaseOptions={selectedPurchaseOptions}
                setSelectedPurchaseOptions={setSelectedPurchaseOptions}
                toEditGeneralPurchaseId={toEditGeneralPurchaseId}
                setToEditGeneralPurchaseId={setToEditGeneralPurchaseId}
              />
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
