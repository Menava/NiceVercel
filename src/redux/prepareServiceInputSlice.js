import { createSlice, current } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  customerName: "",
  customerPhone: "",
  customerCarNo: "",
  customerCarModel: "",
  customerCarYear: "",
  customerCarBrand: "",
  customerCarColor: "",
  employeeLeader: { name: "", id: "" },
  customerSignature: "",
  employeeSignature: "",
  employees: [],
  errorImages: [],

  // Initial dropdownValues
  // frameType: "Select frame Type",
  // servicePlace: "Select service Place",
  // component: "Please choose component",
  // errorType: "Select Error Type",

  frameType: { name: "Select frame Type", id: "" },
  servicePlace: { name: "Select service Place", id: "" },
  component: { name: "Please choose component", id: "" },
  errorType: { name: "Select Error Type", id: "" },

  frameTypeActive: false,
  servicePlaceActive: false,
  componentsActive: false,
  errorTypeActive: false,
  dropdownLists: {
    frameTypes: [],
    servicePlaces: [],
    components: [],
    errorTypes: [],
  },
};

const prepareServiceInputSlice = createSlice({
  name: "prepareServiceInput",
  initialState: INITIAL_STATE,
  reducers: {
    setCustomerSignature: (state, action) => {
      state.customerSignature = action.payload;
    },
    removeCustomerSignature: (state) => {
      state.customerSignature = "";
    },
    setEmployeeSignature: (state, action) => {
      state.employeeSignature = action.payload;
    },
    removeEmployeeSignature: (state) => {
      state.employeeSignature = "";
    },
    userInputOnChangeHandle: (state, action) => {
      const { propName, value } = action.payload;
      state[propName] = value;
    },
    userInputTagEmployeeDropdownHandle: (state, action) => {
      const { propName, data } = action.payload;
      state[propName] = { name: data.name, id: data.id };
    },
    userInputTagCustomerDropdownHandle: (state, action) => {
      const { data, propName } = action.payload;
      state[propName] = data.name;
      state.customerPhone = data.phone;
    },

    userInputDropdownToggle: (state, action) => {
      const { propName } = action.payload;
      state[propName] = !state[propName];
    },

    userInputSelectDropdown: (state, action) => {
      const { propName, value } = action.payload;
      state[propName].name = value.name;
      state[propName].id = value.id;
    },
    addEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index === -1) state.employees = [...state.employees, action.payload];
    },
    removeEmployee: (state, action) => {
      const employees = current(state.employees);
      const { id } = action.payload;
      const cloneEmployees = [...employees];
      const toRemoveIndex = cloneEmployees.findIndex(
        (employee) => employee.id === id
      );
      cloneEmployees.splice(toRemoveIndex, 1);
      state.employees = cloneEmployees;
    },
    addErrorImages: (state, action) => {
      const { data } = action.payload;
      state.errorImages = [...state.errorImages, data];
      state.component = INITIAL_STATE.component;
      state.errorType = INITIAL_STATE.errorType;
    },
    removeErrorImages: (state, action) => {
      const errorImages = current(state.errorImages);
      const cloneErrorImages = [...errorImages];
      const { errorImage } = action.payload;
      const toRemoveIndex = cloneErrorImages.findIndex(
        (errImage) => errImage.errorImage === errorImage
      );
      cloneErrorImages.splice(toRemoveIndex, 1);
      state.errorImages = cloneErrorImages;
    },
    fetchFrameType: (state, action) => {
      state.dropdownLists.frameTypes = action.payload.data;
    },
    fetchFrameComponents: (state, action) => {
      state.dropdownLists.components = action.payload.data;
    },
    fetchErrorTypes: (state, action) => {
      state.dropdownLists.errorTypes = action.payload.data;
    },
    fetchServicePlaces: (state, action) => {
      state.dropdownLists.servicePlaces = action.payload.data;
    },
    addDummyData: (state, action) => {
      const { id, name, dummyEmpLeader, dummyEmployees } = action.payload;
      state.customerName = "Unknown";
      state.customerCarModel = "Unknown";
      state.customerCarYear = "Unknown";
      state.customerCarBrand = "Unknown";
      state.customerCarColor = "Unknown";
      state.frameType = { id, name };
      state.servicePlace = { name: "Other" };
      state.employeeLeader = dummyEmpLeader;
      state.employees = [dummyEmployees];
    },
    resetInputValues: (state) => {
      state.customerName = "";
      state.customerPhone = "";
      state.customerCarNo = "";
      state.customerCarModel = "";
      state.customerCarYear = "";
      state.customerCarBrand = "";
      state.customerCarColor = "";
      state.employeeLeader = { name: "", id: "" };
      state.customerSignature = "";
      state.employeeSignature = "";
      state.employees = [];
      state.errorImages = [];
      state.frameType = { name: "Select frame Type", id: "" };
      state.servicePlace = { name: "Select service Place", id: "" };
      state.component = { name: "Please choose component", id: "" };
      state.errorType = { name: "Select Error Type", id: "" };
      state.frameTypeActive = false;
      state.servicePlaceActive = false;
      state.componentsActive = false;
      state.errorTypeActive = false;
      state.dropdownLists = {
        frameTypes: [],
        servicePlaces: [],
        components: [],
        errorTypes: [],
      };
    },
  },
});

export const {
  userInputOnChangeHandle,
  userInputDropdownToggle,
  userInputSelectDropdown,
  removeEmployee,
  removeErrorImages,
  fetchFrameType,
  fetchFrameComponents,
  fetchErrorTypes,
  userInputTagEmployeeDropdownHandle,
  userInputTagCustomerDropdownHandle,
  addEmployee,
  addErrorImages,
  setCustomerSignature,
  setEmployeeSignature,
  removeCustomerSignature,
  removeEmployeeSignature,
  fetchServicePlaces,
  resetInputValues,
  addDummyData,
} = prepareServiceInputSlice.actions;

export default prepareServiceInputSlice.reducer;
