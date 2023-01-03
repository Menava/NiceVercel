import Cookies from "js-cookie";

import {
  fetchCustomers,
  updateCustomer,
  fetchEmployees,
  updateEmployee,
  removeCustomer,
  fetchServices,
  fetchItems,
  fetchSuppliers,
  fetchEmployeeSalaries,
  fetchGeneralPurchases,
  resetItemQty,
  resetItemsOnDisconnect,
  fetchVouchers,
  fetchWaitingLists,
} from "./modalsAndDataSlice";
import CustomerService from "../APIServices/CustomerAPI";
import EmployeeService from "../APIServices/EmployeeAPI";
import ServiceService from "../APIServices/ServiceAPI";
import ItemService from "../APIServices/ItemAPI";
import SupplierService from "../APIServices/SupplierAPI";
import DamageTypeService from "../APIServices/DamageTypeAPI";
import CarFrameService from "../APIServices/CarFrameAPI";
import {
  fetchErrorTypes,
  fetchFrameComponents,
  fetchFrameType,
  fetchServicePlaces,
} from "./prepareServiceInputSlice";
import FrameComponentService from "../APIServices/FrameComponentAPI";
import { fetchServiceDetail } from "./serviceDetailSlice";
import ServicePlaceService from "../APIServices/ServicePlaceAPI";
import EmployeePayrollService from "../APIServices/EmployeePayrollAPI";
import GeneralPurchaseService from "../APIServices/GeneralPurchaseAPI";
import AddedService from "../components/addedService/AddedService";
import VoucherService from "../APIServices/VoucherAPI";
import AppService from "../APIServices/AppAPI";

// Fetch General Purchases
export async function getGeneralPurchases(dispatch) {
  const data = await GeneralPurchaseService.GetGeneralPurchases();

  dispatch(fetchGeneralPurchases({ data }));
}

// Fetch Employee Salaries
export async function getEmployeeSalareis(dispatch) {
  const data = await EmployeePayrollService.GetEmployeePayrolls();
  dispatch(fetchEmployeeSalaries({ data }));
}

// Customers
export async function getCustomer(dispatch) {
  const data = await CustomerService.GetCustomer();
  dispatch(fetchCustomers({ data }));
}

export async function editCustomer(id, name, phone, dispatch) {
  const data = await CustomerService.UpdateCustomer(id, { name, phone });
  dispatch(updateCustomer({ data }));
}

export async function deleteCustomer(id, dispatch) {
  const deletedCustomer = await CustomerService.DeleteCustomer(id);
  dispatch(removeCustomer({ deletedCustomer }));
}

// Employees
export async function getEmployees(dispatch) {
  const data = await EmployeeService.GetEmployee();
  dispatch(fetchEmployees({ data }));
}

export async function editEmployee(
  id,
  name,
  position,
  username,
  password,
  dispatch
) {
  const data = await EmployeeService.UpdateEmployee(id, {
    name,
    position,
    username,
    password,
  });
  dispatch(updateEmployee({ data }));
}

// Services
export async function getServices(dispatch) {
  const data = await ServiceService.GetServices();
  dispatch(fetchServices({ data }));
}

// Items

export async function getItems(dispatch) {
  const data = await ItemService.GetItems();
  dispatch(fetchItems({ data }));
}

export async function disconnectItems(dispatch) {
  const data = await ItemService.GetItems();
  dispatch(resetItemsOnDisconnect({ databaseData: data }));
}

// Suppliers
export async function getSuppliers(dispatch) {
  const data = await SupplierService.GetSuppliers();
  dispatch(fetchSuppliers({ data }));
}

// Frame Type
export async function getFrameTypes(dispatch) {
  const data = await CarFrameService.GetCarframes();
  dispatch(fetchFrameType({ data }));
}

// Component Type
export async function getComponentTypes(dispatch, id) {
  const data = await FrameComponentService.GetFrameComponents(id);
  dispatch(fetchFrameComponents({ data }));
}

// Error Type
export async function getErrorTypes(dispatch) {
  const data = await DamageTypeService.GetDamageTypes();
  dispatch(fetchErrorTypes({ data }));
}

export async function getServicePlaces(dispatch) {
  let data = await ServicePlaceService.GetServicePlaces();
  data = [
    ...data.filter((dat) => dat.status === "Free"),
    { name: "Other" },
    { name: "Waiting" },
  ];
  console.log("Service Place data", data);
  dispatch(fetchServicePlaces({ data }));
}

export async function getAllServicePlaces(dispatch) {
  let data = await ServicePlaceService.GetServicePlaces();
  data = [...data, { name: "Other" }, { name: "Waiting" }];
  console.log("All Serive Places", data);
  dispatch(fetchServicePlaces({ data }));
}

// service Detail

export async function getServiceDetail(dispatch, id) {
  const data = await ServiceService.GetService(id);
  dispatch(fetchServiceDetail({ data }));
}

export async function getVouchers(dispatch) {
  const data = await VoucherService.GetVouchers();
  dispatch(fetchVouchers({ data }));
}

export async function getWaitingLists(dispatch) {
  const data = await ServicePlaceService.GetServicePlaces();
  dispatch(fetchWaitingLists({ data }));
}
