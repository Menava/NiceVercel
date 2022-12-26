import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import modalsAndDataReducer from "./modalsAndDataSlice";
import prepareServiceRducer from "./prepareServiceInputSlice";
import inputedServiceSliceReducer from "./inputedServiceSlice";
import addedServiceReducer from "./addedServicesSlice";
import serviceDetailReducer from "./serviceDetailSlice";
import loadingReducer from "./loadingSlice";
import socketReducer from "./socketSlice";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
    user: userReducer,
    modalsAndData: modalsAndDataReducer,
    prepareserviceInputs: prepareServiceRducer,
    inputedService: inputedServiceSliceReducer,
    addedService: addedServiceReducer,
    serviceDetail: serviceDetailReducer,
    loading: loadingReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
