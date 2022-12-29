import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import VoucherService from "../../APIServices/VoucherAPI";
import VoucherEmployeeService from "../../APIServices/VoucherEmployeeAPI";
import VoucherOutsourceService from "../../APIServices/VoucherOutsourceAPI";
import VoucherServiceItemService from "../../APIServices/VoucherServiceItemAPI";
import "./printVoucher.scss";

function PrintVoucher() {
  const { voucherId } = useParams();
  const [voucherService, setVoucherService] = useState({});
  const [voucherServiceItemService, setVoucherServiceItemService] = useState(
    []
  );
  const [externalItmes, setExternalItems] = useState([]);
  let totals = 0;

  let finalTotals = 0;

  const [voucherEmployeeService, setVoucherEmployeeService] = useState([]);
  // *****
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // ***

  useEffect(() => {
    async function fetchVoucherService() {
      const data = await VoucherService.GetVoucher(voucherId);
      setVoucherService(data);
    }

    async function fetchVoucherServiceItemService() {
      const data = await VoucherServiceItemService.GetVoucherServiceItem(
        voucherId
      );
      setVoucherServiceItemService(data);
    }

    async function fetchVoucherEmployeeService() {
      const data = await VoucherEmployeeService.GetVoucherEmployee(voucherId);
      setVoucherEmployeeService(data);
    }

    async function fetchExternalItems() {
      const data = await VoucherOutsourceService.GetVoucherOutsource(voucherId);
      setExternalItems(data);
    }

    fetchVoucherService();
    fetchVoucherServiceItemService();
    fetchVoucherEmployeeService();
    fetchExternalItems();
  }, []);

  // console.log("VoucherService", voucherService);
  // console.log("voucherServiceItemService", voucherServiceItemService);
  // console.log("voucherEmployeeService", voucherEmployeeService);
  console.log(externalItmes);
  function employeeLeader() {
    return voucherEmployeeService.filter((emp) => emp.role === "leader");
  }

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
    <div>
      <div ref={componentRef} className="voucher_wrapper">
        <div className="voucher_header_wrapper">
          <div className="voucher_headerLeft">
            <img
              className="voucher_image"
              src="https://www.billboard.com/wp-content/uploads/2022/05/nayeon-twice-2022-press-billboard-1548.png?w=1024"
            />
            <div className="voucher_header">
              <h3>Nice</h3>
              <p>Carworkshop</p>
            </div>
          </div>
          <div className="voucher_headerRight">
            <div className="phoneWrapper">
              <h4>Phone</h4>
              <p>
                09-2010823,09-91033259,<br></br>09-43066781,09-792010823
              </p>
            </div>
            <div className="emailWrapper">
              <h4>Email</h4>
              <p>nicecarworkshop.mdy@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="voucher_table_infoWrapper">
          <div className="voucher_table_invoiceWrapper">
            <div className="voucher_table_headerInfoTag">
              <p className="header">Customer Name</p>
              <p className="header_value">
                {/* {voucherService.voucher?.customerCar_id.car.car_number} */}
                {voucherService.voucher?.customerCar_id.customer.name}
              </p>
            </div>
            <div className="voucher_table_headerInfoTag">
              <p className="header">Car Plate no</p>
              <p className="header_value">
                {voucherService.voucher?.customerCar_id.car.car_number}
              </p>
            </div>
          </div>
          <div className="voucher_table_invoiceWrapper">
            <div className="voucher_table_headerInfoTag">
              <p className="header">Employee Leader</p>
              <p className="header_value">
                {employeeLeader()[0]?.employee_id.name}
              </p>
            </div>
            <div className="voucher_table_headerInfoTag">
              <p className="header">Id</p>
              <p className="header_value">
                {employeeLeader()[0]?.employee_id.id}
              </p>
            </div>
          </div>
          <div className="voucher_table_invoiceWrapper">
            <div className="voucher_table_headerInfoTag">
              <p className="header">Invoice No</p>
              <p className="header_value">{voucherService.voucher?.id}</p>
            </div>
            <div className="voucher_table_headerInfoTag">
              <p className="header">Date</p>
              <p className="header_value">{voucherService.voucher?.date}</p>
            </div>
          </div>
        </div>
        <div className="serivce_info_wrapper">
          {voucherServiceItemService.map((ser, index) => (
            <table key={index}>
              <tr>
                <th>Service Name</th>
                <th>Item Owner</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Totals</th>
              </tr>
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
            </table>
          ))}
          <table>
            <tr>
              <th>Source</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotals</th>
            </tr>
            {externalItmes.map((itm, index) => (
              <tr key={index}>
                <td>{itm.source_name}</td>
                <td>{itm.item_name}</td>
                <td>{itm.quantity}</td>
                <td>{itm.price}</td>
                <td>{itm.total}</td>
              </tr>
            ))}
          </table>
          <div className="totals_wrapper">
            <h3>Totals:</h3>
            <p>{finalTotals}</p>
          </div>
        </div>
      </div>
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
}

export default PrintVoucher;
