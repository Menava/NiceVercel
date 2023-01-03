import React, { useState } from "react";
import "./vouDetail.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VoucherEmployeeService from "../../APIServices/VoucherEmployeeAPI";
import VoucherPaymentService from "../../APIServices/VoucherPaymentAPI";
import VoucherServiceItemService from "../../APIServices/VoucherServiceItemAPI";
import InitCheckService from "../../APIServices/InitCheckAPI";
import VoucherService from "../../APIServices/VoucherAPI";
import FinalCheckService from "../../APIServices/FinalcheckAPI";
import InitialImageService from "../../APIServices/InitialImageAPI";
import FinalImageService from "../../APIServices/FinalImageAPI";
import VoucherOutsourceService from "../../APIServices/VoucherOutsourceAPI";

function VouDetail() {
  const { voucherId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [voucher, setVoucher] = useState({});
  const [voucherServiceItemService, setVoucherServiceItemService] = useState(
    []
  );
  const [initialImages, setInitialImages] = useState([]);
  const [intitalCheck, setInititalCheck] = useState({});
  const [externalItmes, setExternalItems] = useState([]);
  const [FinalCheck, setFinalCheck] = useState({});
  const [finalImages, setFinalImages] = useState([]);
  let totals = 0;

  let finalTotals = 0;
  useEffect(() => {
    async function fetchVoucher() {
      const voucher = await VoucherService.GetVoucher(voucherId);
      setVoucher(voucher);
      const itCheck = await InitCheckService.GetInitCheck(
        voucher.voucher.initChecklist_id
      );
      const initialImage = await InitialImageService.GetInitialImages(
        voucher.voucher.initChecklist_id
      );

      const finalCheck = await FinalCheckService.GetFinalCheck(
        voucher.voucher.finalChecklist_id
      );
      const finalImage = await FinalImageService.GetFinalImage(
        voucher.voucher.finalChecklist_id
      );
      setInititalCheck(itCheck);
      setInitialImages(initialImage);
      setFinalImages(finalImage);
      setFinalCheck(finalCheck);
      // console.log("itcheck", itCheck);
      // console.log("Initial Image", initialImage);
      // console.log("FinalCheck", finalCheck);
      // console.log("FinalImage", finalImage);
    }
    console.log("Initital Images", initialImages);
    async function fetchVoucherEmployee() {
      const data = await VoucherEmployeeService.GetVoucherEmployee(voucherId);
      setEmployees(data);
      // console.log("VoucherEmployeeService", data);
    }
    async function fetchVoucherServiceItem() {
      const data = await VoucherServiceItemService.GetVoucherServiceItem(
        voucherId
      );
      setVoucherServiceItemService(data);
    }
    async function fetchVoucherPaymentService() {
      const data = await VoucherPaymentService.GetVoucherPayment(voucherId);
      // console.log("VoucherPaymentService", data);
    }
    async function fetchExternalItems() {
      const data = await VoucherOutsourceService.GetVoucherOutsource(voucherId);
      setExternalItems(data);
    }
    fetchVoucher();
    fetchVoucherEmployee();
    fetchVoucherServiceItem();
    fetchVoucherPaymentService();
    fetchExternalItems();
    // fetchInitialCheck();
  }, []);

  function filterItemByOwner(service, owner) {
    if (owner === "CUSTOMER") {
      return service.items.filter((item) => item.hasOwnProperty("customer_id"));
    }
    if ((owner = "NICE")) {
      return service.items.filter(
        (item) => !item.hasOwnProperty("customer_id")
      );
    }
  }

  function calculateSubTotals(service) {
    const service_price = service.service.service_price;
    let items_ary = service.items.filter(
      (item) => !item.hasOwnProperty("customer_id")
    );
    let items_price = 0;

    let external_price = externalItmes.reduce(
      (current, next) => current + next.total,
      0
    );

    items_ary.forEach((itm) => (items_price += itm.price * itm.quantity));
    totals += items_price + service_price;
    finalTotals = totals + external_price;
    return items_price + service_price;
  }

  return (
    <div className="vouDetail__wrapper">
      <h2 className="vouDetail_header">Voucher Detail</h2>

      <div className="customerDetail_wrapper">
        <div className="detail_wrapper">
          <h3>Customer Name</h3>
          <p>{voucher.voucher?.customerCar_id?.customer.name}</p>
        </div>
        <div className="detail_wrapper">
          <h3>Car No</h3>
          <p>{voucher.voucher?.customerCar_id?.car.car_number}</p>
        </div>
        <div className="detail_wrapper">
          <h3>Date</h3>
          <p>{voucher.voucher?.date}</p>
        </div>
      </div>
      <h3 className="subTitle">Employees</h3>
      <div className="table_outsideWrapper">
        <div className="table_insideWrapper">
          <table>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.id}</td>
                  <td>{emp.employee_id.name}</td>
                  <td>{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h3 className="subTitle">Services</h3>

      {voucherServiceItemService.map((ser, index) => (
        <div className="table_outsideWrapper" key={index}>
          <div className="table_insideWrapper">
            <table>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Item Owner</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Totals</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ser.service?.service_type}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{ser.service.service_price}</td>
                  <td>{ser.service.service_price}</td>
                </tr>
                {filterItemByOwner(ser, "CUSTOMER")?.map((itm, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>Customer</td>
                    <td>{itm.name}</td>
                    <td>{itm.quantity}</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                ))}
                {filterItemByOwner(ser, "NICE")?.map((itm, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>Nice</td>
                    <td>{itm.name}</td>
                    <td>{itm.quantity}</td>
                    <td>{itm.price}</td>
                    <td>{itm.price * itm.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Subtotals</td>
                  <td>{calculateSubTotals(ser)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <h3 className="subTitle">Outsource Item</h3>
      <div className="table_outsideWrapper">
        <div className="table_insideWrapper">
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotals</th>
              </tr>
            </thead>
            <tbody>
              {externalItmes.map((itm, index) => (
                <tr key={index}>
                  <td>{itm.source_name}</td>
                  <td>{itm.item_name}</td>
                  <td>{itm.quantity}</td>
                  <td>{itm.price}</td>
                  <td>{itm.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h3 className="total">Totals : {finalTotals}</h3>

      <h3 className="subTitle">Initial Check List</h3>
      <div className="table_outsideWrapper">
        <div className="table_insideWrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Damage Part</th>
                <th>Damage Type</th>
              </tr>
            </thead>
            <tbody>
              {initialImages.map((inImage, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`https://drive.google.com/uc?export=view&id=${inImage.imagePath}`}
                      alt="drive image"
                    />
                  </td>
                  <td>{inImage.damagedPart}</td>
                  <td>{inImage.damageType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sign_wrapper">
        <div className="left_size">
          <h4>Signs</h4>
          <div className="wrapper">
            <div className="SignImage_wrapper">
              <img
                src={`https://drive.google.com/uc?export=view&id=${intitalCheck.customer_signPath}`}
                alt="drive image"
              />
              <p>Customer</p>
            </div>
            <div className="SignImage_wrapper">
              <img
                src={`https://drive.google.com/uc?export=view&id=${intitalCheck.employee_signPath}`}
                alt="drive image"
              />
              <p>Employee</p>
            </div>
          </div>
        </div>
        {/* <div className="right_size">
          <h4>Notes</h4>
          <p>{intitalCheck.notes}</p>
        </div> */}
      </div>

      <h3 className="subTitle">Final Check List</h3>
      <div className="table_outsideWrapper">
        <div className="table_insideWrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Damage Part</th>
                <th>Damage Type</th>
              </tr>
            </thead>
            <tbody>
              {finalImages.map((inImage, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`https://drive.google.com/uc?export=view&id=${inImage.imagePath}`}
                      alt="drive image"
                    />
                  </td>
                  <td>{inImage.damagedPart}</td>
                  <td>{inImage.damageType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sign_wrapper">
        <div className="left_size">
          <h4>Signs</h4>
          <div className="wrapper">
            <div className="SignImage_wrapper">
              <img
                src={`https://drive.google.com/uc?export=view&id=${FinalCheck.customer_signPath}`}
                alt="drive image"
              />
              <p>Customer</p>
            </div>
            <div className="SignImage_wrapper">
              <img
                src={`https://drive.google.com/uc?export=view&id=${FinalCheck.employee_signPath}`}
                alt="drive image"
              />
              <p>Employee</p>
            </div>
          </div>
        </div>
        <div className="right_size">
          <h4>Notes</h4>
          <p>{FinalCheck.notes}</p>
        </div>
      </div>
    </div>
  );
}

export default VouDetail;
