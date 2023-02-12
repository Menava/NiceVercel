import { createSlice, current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const INITIAL_INCOMES_OPTIONS = [
  { option: "General Income", selected: false },
  { option: "Something2", selected: false },
  { option: "Something3", selected: false },
];

const modalsAndDataSlice = createSlice({
  name: "modal",
  initialState: {
    openEditIncomeModal: false,
    openEditEmployeeSalryModal: false,
    openDeleteEmployeeSalaryModal: false,
    openEditCustomerModal: false,
    openEditServiceModal: false,
    openEditItemsModal: false,
    openEditEmployeeModal: false,
    openEditItemModal: false,
    openRestockItemModal: false,
    openRefundItemModal: false,
    openEditSupplierModal: false,
    openNavSidebarModal: false,
    openAddServiceModal: false,
    openAddNewCustomerModal: false,
    openAddNewEmployeeModal: false,
    openAddItemModal: false,
    openAddSupplierModal: false,
    openAddEmployeesPrepareServiceModal: false,
    openCustomerSignaturePad: false,
    openEmployeeSignaturePad: false,
    openCustomerFinalSignaturePad: false,
    openEmployeeFinalSignaturePad: false,
    openAddNewServiceServiceStatus: false,
    openAddItemServiceStatus: false,
    openAddCustomerItemServiceStatus: false,
    openGiveSalaryModal: false,
    openGeneralPurhcaseModal: false,
    openIncomeModal: false,
    openExternalItemModal: false,
    openAddNewServicePlaceModal: false,
    openWaitingModal: false,
    openDeleteItemModal: false,
    toDeleteItemId: "",
    openDeleteSerivceModal: false,
    openDeleteServiceId: "",
    payModal: false,
    sidebarRef: "",
    customerFinalSignature: "",
    employeeFinalSignature: "",
    userSelectedImage: "",
    waitingCurrentList: "",
    // For service Status Detail
    serviceId: "",
    servicePlaceId: "",
    specificServiceItems: [],
    setServices: "",
    servicePlaceCustomerId: "",

    // Modal Inital Values with Label name prop
    servicePlaceInitialValues: {
      ["Service Place Name"]: "",
    },
    serviceStatusCustomerInputInitialValues: {
      "Item Name": "",
    },
    toChangeCustomerId: "",
    customerInitialValues: {
      "Customer Name": "",
      "Customer Phone No": "",
    },
    voucherPaymentId: "",
    payInitialValues: {
      Totals: "",
      PaidAmount: "",
      PayAmount: "",
    },

    generalPurchaseInitialValues: {
      Description: "",
      Price: "",
      Quantity: "",
      Type: "",
    },

    toChangeEmployeeId: "",
    employeeInitialValues: {
      "Employee Name": "",
      Position: "",
      Username: "",
      Password: "",
    },

    toChangeServiceId: "",
    serviceInitialValues: {
      "Service Type": "",
      "Service Price": "",
      "Service Detail": "",
      Image: "",
    },

    // Itemsss **
    toChangeSupplierItemId: "",
    toChangeItemId: "",
    avaiableItemQty: "",
    itemsInitialValues: {
      "Item Name": "",
      Qty: "",
      Price: "",
      Supplier: "",
      Image: "",
    },

    externalItemInitialValues: {
      "Item Name": "",
      Source: "",
      Price: "",
      Quantity: "",
    },

    // income intital values
    incomeInitialValues: {
      Description: "",
      "Income Amount": "",
      Type: "",
    },

    incomeOptions: INITIAL_INCOMES_OPTIONS,

    allIncomes: [],

    itemsRestockValues: {
      "Item Name": "",
      "Restock Qty": "",
      "Buy Price": "",
      "Sell Price": "",
    },

    itemsRefundValues: {
      "Refund Qty": "",
    },
    // Itemsss **

    toChangeSupplierId: "",
    supplierInitialValues: {
      "Supplier Name": "",
    },

    editSalaryModal: {
      Salary: "",
    },

    generalPurchase: {
      Description: "",
      Quantity: "",
      UnitPrice: "",
    },

    // Datas from fetch
    customers: [],
    employees: [],
    services: [],
    items: [],
    toRefillItems: [],
    vouchers: [],
    suppliers: [],
    employeeSalaries: [],
    generalPurchases: [],
    incomes: [],
    externalItems: [],
    waitingLists: [],
    // Edit Button Click check
    editButtonClicked: false,
    // To track image changed or not
    imageChanged: false,
    toDeleteEmpSalaryId: "",
    toEditEmpSalaryId: "",
    openDeleteGeneralPurchaseModal: false,
    openEditGeneralPurchaseModal: false,
    toEditGeneralPurchaseId: "",
    toDeleteGeneralPurchaseId: "",
    toChangeIncomeId: "",
    deleteIncomeModal: false,
  },
  reducers: {
    openDeleteIncomeModal: (state, action) => {
      const { data } = action.payload;
      state.deleteIncomeModal = true;
      state.toChangeIncomeId = data;
    },
    changeEditIncome: (state, action) => {
      const { data } = action.payload;

      const copied = [...state.allIncomes];
      const ChangedAry = copied.map((res) => (res.id === data.id ? data : res));
      state.allIncomes = ChangedAry;
    },
    getAllIncomes: (state, action) => {
      const { data } = action.payload;
      state.allIncomes = data;
    },
    addIncome: (state, action) => {
      const { data } = action.payload;
      state.allIncomes = [...state.allIncomes, data];
    },
    openEditIncomeModal: (state, action) => {
      const { id, description, amount, incomeType } = action.payload;
      state.toChangeIncomeId = id;
      console.log(incomeType);
      state.incomeInitialValues.Description = description;
      state.incomeInitialValues["Income Amount"] = amount;
      state.openEditIncomeModal = true;

      const copiedAry = [...state.incomeOptions];
      copiedAry.map((copAry) =>
        copAry.option === incomeType
          ? (copAry.selected = true)
          : (copAry.selected = false)
      );

      const selectedOptionIndex = copiedAry.findIndex(
        (copAry) => copAry.selected
      );
      state.incomeInitialValues.Type = copiedAry[selectedOptionIndex].option;
      state.incomeOptions = copiedAry;
    },
    openIncomeModal: (state) => {
      state.openIncomeModal = true;
      state.incomeInitialValues["Income Amount"] = "";
      state.incomeInitialValues.Type = "";
      state.incomeInitialValues.Description = "";
      state.incomeOptions = INITIAL_INCOMES_OPTIONS;
    },
    changeIncomeInputHandle: (state, action) => {
      const { toChangeProperty, data } = action.payload;
      state.incomeInitialValues[toChangeProperty] = data;
    },
    changeSelectedIncomeOptions: (state, action) => {
      const { toChangeOption } = action.payload;
      const copiedAry = [...state.incomeOptions];
      copiedAry.map((copAry) =>
        copAry.option === toChangeOption
          ? (copAry.selected = true)
          : (copAry.selected = false)
      );
      const selectedOptionIndex = copiedAry.findIndex(
        (copAry) => copAry.selected
      );
      state.incomeInitialValues.Type = copiedAry[selectedOptionIndex].option;
      state.incomeOptions = copiedAry;
    },
    openEditGeneralPurchaseModal: (state) => {
      state.openEditGeneralPurchaseModal = true;
    },
    openDeleteGeneralPurchaseModal: (state, action) => {
      const { toDeleteId } = action.payload;
      state.openDeleteGeneralPurchaseModal = true;
      state.toDeleteGeneralPurchaseId = toDeleteId;
    },
    openEditEmployeeSalryModal: (state, action) => {
      const { prevSalary, toEditEmployeeSalaryId } = action.payload;
      state.openEditEmployeeSalryModal = true;
      state.editSalaryModal.Salary = prevSalary;
      state.toEditEmpSalaryId = toEditEmployeeSalaryId;
    },
    openDeleteEmployeeSalaryModal: (state, action) => {
      const { toDeleteEmployeeSalaryId } = action.payload;
      state.openDeleteEmployeeSalaryModal = true;
      state.toDeleteEmpSalaryId = toDeleteEmployeeSalaryId;
    },
    clearExternalItems: (state) => {
      state.externalItems = [];
    },
    openDeleteSerivceModal: (state, action) => {
      const { id } = action.payload;
      state.openDeleteSerivceModal = true;
      state.openDeleteServiceId = id;
    },
    openDeleteItemModal: (state, action) => {
      const { id } = action.payload;
      state.openDeleteItemModal = true;
      state.toDeleteItemId = id;
    },
    fetchWaitingLists: (state, action) => {
      const { data } = action.payload;
      state.waitingLists = data;
    },
    openWaitingModal: (state, action) => {
      const data = action.payload;
      state.openWaitingModal = true;
      state.waitingCurrentList = data;
    },
    openPayModal: (state, action) => {
      const { data } = action.payload;
      console.log(data);
      state.payModal = true;
      state.payInitialValues.PaidAmount = data.payment.paid_amount;
      state.payInitialValues.PayAmount = "";
      state.payInitialValues.Totals = data.payment.total_amount;
      state.voucherPaymentId = data.payment.id;
    },
    openAddNewServicePlaceModal: (state) => {
      state.openAddNewServicePlaceModal = true;
      state.servicePlaceInitialValues["Service Place Name"] = "";
    },
    openExternalItemModal: (state) => {
      state.openExternalItemModal = true;
      state.externalItemInitialValues["Item Name"] = "";
      state.externalItemInitialValues.Price = "";
      state.externalItemInitialValues.Quantity = "";
      state.externalItemInitialValues.Source = "";
    },
    addExternalItems: (state, action) => {
      const { data } = action.payload;
      state.externalItems = [...state.externalItems, data];
    },
    delteExternalItems: (state, action) => {
      const { itmName } = action.payload;
      const toDelteIndex = state.externalItems.findIndex(
        (item) => item.itemName === itmName
      );
      const copiedAry = [...state.externalItems];
      copiedAry.splice(toDelteIndex, 1);
      state.externalItems = copiedAry;
    },
    setUserSelectedImage: (state, action) => {
      const { data } = action.payload;
      state.userSelectedImage = data;
    },
    removeUserSelectedImage: (state) => {
      state.userSelectedImage = "";
    },
    fetchGeneralPurchases: (state, action) => {
      const { data } = action.payload;
      state.generalPurchases = data;
    },

    fetchEmployeeSalaries: (state, action) => {
      const { data } = action.payload;
      state.employeeSalaries = data;
    },

    openGeneralPurhcaseModal: (state) => {
      state.openGeneralPurhcaseModal = true;
      state.generalPurchaseInitialValues.Description = "";
      state.generalPurchaseInitialValues.Price = "";
      state.generalPurchaseInitialValues.Quantity = "";
      state.generalPurchaseInitialValues.Type = "";
    },

    openGiveSalaryModal: (state) => {
      state.openGiveSalaryModal = true;
    },
    setCustomerFinalSignature: (state, action) => {
      state.customerFinalSignature = action.payload;
    },
    removeCustomerFinalSignature: (state) => {
      state.customerFinalSignature = "";
    },
    setEmployeeFinalSignature: (state, action) => {
      state.employeeFinalSignature = action.payload;
    },
    removeEmployeeFinalSignature: (state) => {
      state.employeeFinalSignature = "";
    },
    setSidebarRef: (state, action) => {
      state.sidebarRef = action.payload;
    },

    openAddNewServiceServiceStatusModal: (state, action) => {
      const { servicePlaceId, setServices } = action.payload;
      state.openAddNewServiceServiceStatus = true;
      state.servicePlaceId = servicePlaceId;
      state.setServices = setServices;
    },

    openAddCustomerItemServiceStatusModal: (state, action) => {
      const {
        serviceId,
        servicePlaceId,
        serviceItems,
        setServices,
        customerId,
      } = action.payload;

      state.openAddCustomerItemServiceStatus = true;
      state.serviceId = serviceId;
      state.servicePlaceId = servicePlaceId;
      state.specificServiceItems = [...serviceItems];
      state.setServices = setServices;
      state.servicePlaceCustomerId = customerId;
      state.serviceStatusCustomerInputInitialValues["Item Name"] = "";
    },
    openAddItemServiceStatusModal: (state, action) => {
      const { serviceId, servicePlaceId, serviceItems, setServices } =
        action.payload;
      state.openAddItemServiceStatus = true;
      state.serviceId = serviceId;
      state.servicePlaceId = servicePlaceId;
      state.specificServiceItems = [...serviceItems];
      state.setServices = setServices;
    },
    // Customer actions
    openCustomerFinalSignaturePadModal: (state) => {
      state.openCustomerFinalSignaturePad = true;
    },
    openCustomerSignaturePadModal: (state) => {
      state.openCustomerSignaturePad = true;
    },
    openModalCustomer: (state, action) => {
      state.openEditCustomerModal = true;
      const data = action.payload.dataObj;
      state.customerInitialValues["Customer Name"] = data.name;
      state.customerInitialValues["Customer Phone No"] = data.phone;
      state.toChangeCustomerId = data.id;
    },
    openAddNewCustomerModal: (state) => {
      state.openAddNewCustomerModal = true;
      state.customerInitialValues["Customer Name"] = "";
      state.customerInitialValues["Customer Phone No"] = "";
    },
    fetchVouchers: (state, action) => {
      const { data } = action.payload;
      state.vouchers = data;
    },
    fetchCustomers: (state, action) => {
      const { data } = action.payload;
      state.customers = data;
    },
    updateCustomer: (state, action) => {
      const { id, name, phone } = action.payload.data;
      state.customers = state.customers.map((customer) => {
        if (customer.id === id) {
          return { id, name, phone };
        }
        return customer;
      });
    },
    removeCustomer: (state, action) => {
      const customers = current(state.customers);
      const { deletedCustomer } = action.payload;
      const copyEmployees = [...customers];
      const index = copyEmployees.findIndex(
        (employee) => employee.id === deletedCustomer.id
      );
      if (index >= 0) {
        copyEmployees.splice(index, 1);
        state.customers = copyEmployees;
      }
    },
    // Employee actions
    openEmployeeFinalSignaturePadModal: (state) => {
      state.openEmployeeFinalSignaturePad = true;
    },
    openEmployeeSignaturePadModal: (state) => {
      state.openEmployeeSignaturePad = true;
    },
    openModalEmployee: (state, action) => {
      state.openEditEmployeeModal = true;
      const data = action.payload.dataObj;
      state.toChangeEmployeeId = data.id;
      state.employeeInitialValues["Employee Name"] = data.name;
      state.employeeInitialValues.Position = data.position;
      state.employeeInitialValues.Username = data.username;
      state.employeeInitialValues.Password = data.password;
    },
    openAddNewEmployeeModal: (state) => {
      state.openAddNewEmployeeModal = true;
      state.employeeInitialValues["Employee Name"] = "";
      state.employeeInitialValues.Position = "";
      state.employeeInitialValues.Username = "";
      state.employeeInitialValues.Password = "";
    },

    openAddEmployeesPrepareServiceModal: (state) => {
      state.openAddEmployeesPrepareServiceModal = true;
    },

    fetchEmployees: (state, action) => {
      const { data } = action.payload;
      state.employees = data;
    },
    updateEmployee: (state, action) => {
      const { id, name, position, username, password } = action.payload.data;
      console.log(action.payload.data);
      state.employees = state.employees.map((employee) => {
        if (employee.id === id) {
          return { ...employee, name, position, username, password };
        }
        return employee;
      });
    },
    // Services Actions
    fetchServices: (state, action) => {
      const { data } = action.payload;
      state.services = data;
    },
    openModalService: (state, action) => {
      state.openEditServiceModal = true;
      const data = action.payload.dataObj;
      console.log("service Image path", data.service_imagePath);
      // console.log("DATA", data.service_imageName);
      state.editButtonClicked = true;
      state.serviceInitialValues["Service Type"] = data.service_type;
      state.serviceInitialValues["Service Price"] = data.service_price;
      state.serviceInitialValues["Service Detail"] = data.service_detail;
      state.serviceInitialValues["Image"] = data.service_imagePath;
      state.toChangeServiceId = data.id;
    },
    openAddNewServiceModal: (state) => {
      state.openAddServiceModal = true;
      state.editButtonClicked = false;
      state.serviceInitialValues["Image"] = "";
      state.serviceInitialValues["Service Detail"] = "";
      state.serviceInitialValues["Service Price"] = "";
      state.serviceInitialValues["Service Type"] = "";
    },
    // Items actions
    fetchItems: (state, action) => {
      const { data } = action.payload;
      state.items = data;
    },
    openModalItems: (state, action) => {
      state.openEditItemModal = true;
      const data = action.payload.dataObj;
      console.log("DATA model Items", data);
      state.editButtonClicked = true;
      state.itemsInitialValues["Item Name"] = data.name;
      state.itemsInitialValues["Qty"] = data.quantity;
      state.itemsInitialValues["Price"] = data.price;
      state.itemsInitialValues["Image"] = data.item_imagePath;
      state.itemsInitialValues["Supplier"] = data.supplier.name;
      state.toChangeItemId = data.id;
      state.toChangeSupplierItemId = data.supplier.id;
    },

    openRestockItemModal: (state, action) => {
      const data = action.payload.data;
      console.log(data);
      state.openRestockItemModal = true;
      state.itemsRestockValues["Item Name"] = data.name;
      state.toChangeItemId = data.id;
      state.itemsRestockValues["Restock Qty"] = "";
      state.itemsRestockValues["Buy Price"] = "";
      state.itemsRestockValues["Sell Price"] = "";
    },

    openRefundItemModal: (state, action) => {
      const data = action.payload.data;
      state.openRefundItemModal = true;
      state.toChangeItemId = data.id;
      state.itemsRefundValues["Refund Qty"] = "";
      state.avaiableItemQty = data.quantity;
    },

    openAddItemModal: (state) => {
      state.openAddItemModal = true;
    },

    disconnectItemSet: (state, action) => {
      const { data } = action.payload;
      state.items = JSON.parse(data);
    },

    resetItemAfterRemoveAddedService: (state) => {
      const copiedAry = [...state.toRefillItems];
      console.log("refill items", copiedAry);
    },
    disconnectItemHandle: (state, action) => {
      const { socket } = action.payload;
      const items = current(state.items);
      const adServices = JSON.parse(Cookies.get("addedService"));
      console.log("added Service", adServices);
      const copiedAddedServices = [...adServices];
      let itemsAry = [...items];

      copiedAddedServices.forEach((ser) => {
        ser.items.forEach((item) => {
          const toUpdateIndex = itemsAry.findIndex((itm) => itm.id === item.id);
          if (toUpdateIndex >= 0) {
            console.log("Found");
            // itemsAry[toUpdateIndex].quantity =
            //   itemsAry[toUpdateIndex].quantity + item.qty;
            itemsAry[toUpdateIndex] = {
              ...itemsAry[toUpdateIndex],
              quantity: itemsAry[toUpdateIndex].quantity + item.qty,
            };
          }
        });
      });
      state.toRefillItems = itemsAry;
    },
    decreaseItemQty: (state, action) => {
      const { id, name } = action.payload;
      const items = current(state.items);
      const copyItems = [...items];

      state.items = copyItems.map((item) => {
        if ((item.id === id || item.name === name) && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      // Cookies.remove("items", { path: "/" });
      // Cookies.set("items", JSON.stringify(state.items), {
      //   path: "/",
      // });
    },
    increaseItemQty: (state, action) => {
      const { id, name } = action.payload;
      const items = current(state.items);
      const copyItems = [...items];

      state.items = copyItems.map((item) => {
        if ((item.id === id || item.name === name) && item.quantity >= 0) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      // Cookies.remove("items", { path: "/" });
      // Cookies.set("items", JSON.stringify(state.items), {
      //   path: "/",
      // });
    },
    resetItemQty: (state, action) => {
      const { id, name, qty } = action.payload;
      const items = current(state.items);
      const copyItems = [...items];

      state.items = copyItems.map((item) => {
        if (item.id === id || item.name === name) {
          return { ...item, quantity: item.quantity + qty };
        } else {
          return item;
        }
      });
      // Cookies.remove("items", { path: "/" });
      // Cookies.set("items", JSON.stringify(state.items), {
      //   path: "/",
      // });
    },
    resetWholeAddedItemQty: (state, action) => {
      const { addedServices, serviceName, socket } = action.payload;
      const items = current(state.items);
      const copyItems = [...items];
      const addedServiceIndex = addedServices.findIndex(
        (service) => service.serviceName === serviceName
      );
      addedServices[addedServiceIndex].items.forEach((item) => {
        const toEditIndex = copyItems.findIndex(
          (copyItem) => copyItem.name === item.name
        );

        if (toEditIndex !== -1) {
          copyItems[toEditIndex] = {
            ...copyItems[toEditIndex],
            quantity: copyItems[toEditIndex].quantity + item.qty,
          };
        }
      });
      state.items = copyItems;
      // Cookies.remove("items", { path: "/" });
      // Cookies.set("items", JSON.stringify(state.items), {
      //   path: "/",
      // });
    },
    resetItemsOnDisconnect: (state, action) => {
      const { databaseData } = action.payload;
      console.log("Database Data", databaseData);
      const items = current(state.items);
      console.log("Disconnect Items", items);
      console.log("cookie added Service", Cookies.get("addedService"));
      // const copiedDatabaseData = [...databaseData];
      // const copiedDisconnectItems = [...items];
    },
    closeModal: (state) => {
      state.openEditIncomeModal = false;
      state.openIncomeModal = false;
      state.openEditCustomerModal = false;
      state.openEditServiceModal = false;
      state.openEditItemsModal = false;
      state.openEditEmployeeModal = false;
      state.openNavSidebarModal = false;
      state.openAddServiceModal = false;
      state.openAddNewCustomerModal = false;
      state.openAddNewEmployeeModal = false;
      state.imageChanged = false;
      state.openEditItemModal = false;
      state.openAddItemModal = false;
      state.openEditSupplierModal = false;
      state.openAddSupplierModal = false;
      state.openAddEmployeesPrepareServiceModal = false;
      state.openCustomerSignaturePad = false;
      state.openEmployeeSignaturePad = false;
      state.openAddItemServiceStatus = false;
      state.serviceId = "";
      state.servicePlaceId = "";
      state.openAddCustomerItemServiceStatus = false;
      state.openAddNewServiceServiceStatus = false;
      state.openCustomerFinalSignaturePad = false;
      state.openEmployeeFinalSignaturePad = false;
      state.openRestockItemModal = false;
      state.openRefundItemModal = false;
      state.openGiveSalaryModal = false;
      state.openGeneralPurhcaseModal = false;
      state.openExternalItemModal = false;
      state.openAddNewServicePlaceModal = false;
      state.payModal = false;
      state.openWaitingModal = false;
      state.openDeleteItemModal = false;
      state.openDeleteSerivceModal = false;
      state.openEditEmployeeSalryModal = false;
      state.openDeleteEmployeeSalaryModal = false;
      state.openDeleteGeneralPurchaseModal = false;
      state.openEditGeneralPurchaseModal = false;
      state.deleteIncomeModal = false;
    },
    // Supplier Actions
    fetchSuppliers: (state, action) => {
      const { data } = action.payload;
      state.suppliers = data;
    },
    openModalSupplier: (state, action) => {
      const data = action.payload.dataObj;
      state.openEditSupplierModal = true;
      state.supplierInitialValues["Supplier Name"] = data.name;
      state.toChangeSupplierId = data.id;
      console.log(data.id);
    },
    openAddModalSupplier: (state) => {
      state.openAddSupplierModal = true;
      state.supplierInitialValues["Supplier Name"] = "";
    },
    changeInputs: (state, action) => {
      const { propName, toChangeInputObj, value } = action.payload;
      state[toChangeInputObj] = {
        ...state[toChangeInputObj],
        [propName]: value,
      };
    },
    openModalNavSidebar: (state) => {
      state.openNavSidebarModal = true;
    },
    // To track image is changed or not
    imageChangedToggle: (state) => {
      state.imageChanged = true;
    },
  },
});

export const {
  openDeleteIncomeModal,
  changeEditIncome,
  openEditIncomeModal,
  addIncome,
  getAllIncomes,
  openIncomeModal,
  changeIncomeInputHandle,
  changeSelectedIncomeOptions,
  fetchVouchers,
  openPayModal,
  openModalCustomer,
  closeModal,
  changeInputs,
  openModalEmployee,
  openModalService,
  updateCustomer,
  fetchEmployees,
  updateEmployee,
  fetchCustomers,
  removeCustomer,
  openModalNavSidebar,
  fetchServices,
  openAddNewServiceModal,
  openAddNewCustomerModal,
  openAddNewEmployeeModal,
  imageChangedToggle,
  fetchItems,
  openModalItems,
  openAddItemModal,
  fetchSuppliers,
  openModalSupplier,
  openAddModalSupplier,
  decreaseItemQty,
  increaseItemQty,
  resetItemQty,
  resetWholeAddedItemQty,
  openAddEmployeesPrepareServiceModal,
  openCustomerSignaturePadModal,
  openEmployeeSignaturePadModal,
  openAddItemServiceStatusModal,
  openAddCustomerItemServiceStatusModal,
  openAddNewServiceServiceStatusModal,
  setSidebarRef,
  openCustomerFinalSignaturePadModal,
  openEmployeeFinalSignaturePadModal,
  setCustomerFinalSignature,
  setEmployeeFinalSignature,
  removeCustomerFinalSignature,
  removeEmployeeFinalSignature,
  openRestockItemModal,
  openRefundItemModal,
  openGiveSalaryModal,
  openGeneralPurhcaseModal,
  fetchEmployeeSalaries,
  fetchGeneralPurchases,
  setUserSelectedImage,
  removeUserSelectedImage,
  openExternalItemModal,
  addExternalItems,
  delteExternalItems,
  resetItemsOnDisconnect,
  disconnectItemHandle,
  disconnectItemSet,
  openAddNewServicePlaceModal,
  openWaitingModal,
  fetchWaitingLists,
  openDeleteItemModal,
  openDeleteSerivceModal,
  clearExternalItems,
  openEditEmployeeSalryModal,
  openDeleteEmployeeSalaryModal,
  openDeleteGeneralPurchaseModal,
  openEditGeneralPurchaseModal,
} = modalsAndDataSlice.actions;

export default modalsAndDataSlice.reducer;
