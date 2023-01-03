import CustomerService from "../APIServices/CustomerAPI";
import CarService from "../APIServices/CarAPI";
import CustomercarService from "./CustomerCarAPI";
import FrameService from "../APIServices/CarFrameAPI";
import ItemService from "../APIServices/ItemAPI";
import ServiceService from "../APIServices/ServiceAPI";
import SupplierService from "../APIServices/SupplierAPI";
import ServiceItemService from "../APIServices/ServiceItemAPI";
import EmployeeService from "../APIServices/EmployeeAPI";
import FinalCheckService from "../APIServices/FinalcheckAPI";
import InitCheckService from "../APIServices/InitCheckAPI";
import VoucherService from "../APIServices/VoucherAPI";
import VoucherEmployeeService from "../APIServices/VoucherEmployeeAPI";
import VoucherServiceItemService from "../APIServices/VoucherServiceItemAPI";
import FinalImageService from "../APIServices/FinalImageAPI";
import { useState, useEffect, useRef } from "react";
import AppService from "../APIServices/AppAPI";
import ServicePlaceServiceItemService from "./ServicePlaceServiceItemAPI";
import SignaturePad from "react-signature-pad-wrapper";
import ServicePlaceService from "./ServicePlaceAPI";
import ServicePlaceEmployeeService from "./ServicePlaceEmployeeAPI";
import WebsocketTest from "./WebsocketTest";
import NotificationService from "./NotificationAPI";

function ApiTestingGround() {
  const [value, setValue] = useState("");
  const [token, setToken] = useState("");
  const [sesValue, setSesValue] = useState("");
  const [sessionData, setSessionData] = useState({});
  // const option = "withdata";
  // AppService.ResetDatabase(option);
  // console.log("SESSION DATA", sessionData["user-items"]);
  function setSessionHandle() {
    VoucherService.Get_ItemProfit().them((resp) => console.log(resp));
  }
  function getSessionHandle() {
    AppService.GetSession().then((resp) => {
      console.log(resp);
    });
  }

  function deleteSession() {
    AppService.DeleteSession();
  }
  function loginHundle() {
    const username = "admin";
    const password = "admin";
    AppService.login(username, password);
  }
  function logoutHundle() {
    // AppService.logout();
    const day = 11;
    const month = 8;
    const year = 2022;
    VoucherService.GetSales(day, month, year);
  }
  function userItemHundle() {
    const userItems = { "item id": "1", "item name": "oil" };
    const itemsJson = JSON.stringify(userItems);
    const formData = new FormData();
    formData.append("user-items", itemsJson);
    AppService.SetUserItems(formData).then((resp) => console.log(resp));
  }

  function loadChartInfo() {
    NotificationService.GetNotifications().then((resp) => console.log(resp));
    // NotificationService.UpdatetNotifications();
    // VoucherService.GetCustomeVouchers(1).then((resp) => console.log(resp));
  }

  return (
    <>
      <input
        onChange={(e) => {
          setSesValue(e.target.value);
        }}
      />
      <button onClick={setSessionHandle}>set session</button>
      <br />
      <button onClick={deleteSession}>delete session</button>
      <button onClick={getSessionHandle}>GET session</button>
      <br />
      <button onClick={loginHundle}>login</button>
      <button onClick={logoutHundle}>logout</button>
      <br />
      <button onClick={loadChartInfo}>add user items</button>
      {/* <WebsocketTest /> */}
    </>
  );
}

export default ApiTestingGround;
