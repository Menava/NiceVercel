import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_DROPDOWN_VALUE } from "../initialValues";

const inputedServiceSlice = createSlice({
  name: "inputedService",
  initialState: {
    makeService: {},
    errors: {},
  },
  reducers: {
    makeService: (state, action) => {
      const { data, navigate } = action.payload;

      if (
        data.customerName === "" ||
        data.customerPhone === "" ||
        data.customerCarNo === "" ||
        data.employeeLeader === "" ||
        data.employees.length <= 0
      ) {
        if (data.customerName === "")
          state.errors.customerName = "Customer name is required";
        if (data.customerPhone === "")
          state.errors.customerPhone = "Customer Phone is required";
        if (data.customerCarNo === "")
          state.errors.customerCarNo = "Car No is required";
        if (data.employeeLeader.name === "")
          state.errors.employeeLeader = "Employee Leader is required";
        if (data.employees.length <= 0)
          state.errors.employees = "Employee is required";
      } else {
        state.makeService = {
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerCarNo: data.customerCarNo,
          customerCarModel: data.customerCarModel,
          customerCarYear: data.customerCarYear,
          customerCarBrand: data.customerCarBrand,
          customerCarColor: data.customerCarColor,
          employeeLeader: data.employeeLeader,
          employees: data.employees,
          errorImages: data.errorImages,
          frameType: data.frameType,
          servicePlace: data.servicePlace,
          component: data.component,
          errorType: data.errorType,
          customerSignature: data.customerSignature,
          employeeSignature: data.employeeSignature,
        };
        navigate("/services");
      }
    },
    resetError: (state) => {
      state.errors = {};
    },
    resetMakeService: (state) => {
      state.makeService = {};
    },
  },
});

export const { makeService, resetError, resetMakeService } =
  inputedServiceSlice.actions;

export default inputedServiceSlice.reducer;
