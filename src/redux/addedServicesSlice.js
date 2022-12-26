import { createSlice, current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const addedServicesSlice = createSlice({
  name: "addedService",
  initialState: {
    addedServices: [],
  },
  reducers: {
    resetAddedServices: (state, action) => {
      const { navigate } = action.payload;
      state.addedServices = [];
      navigate("/serviceStatus");
    },
    fetchAddedServiceFromCookie: (state) => {
      if (Cookies.get("addedService")) {
        state.addedServices = JSON.parse(Cookies.get("addedService"));
      } else {
        state.addedServices = [];
      }
    },
    addService: (state, action) => {
      state.addedServices = [...state.addedServices, action.payload];
    },
    addCustomerItem: (state, action) => {
      const { id, data } = action.payload;
      const add = current(state.addedServices);
      const copyAddService = [...add];

      const toAddIndex = copyAddService.findIndex(
        (service) => service.id === id
      );

      copyAddService[toAddIndex] = {
        ...copyAddService[toAddIndex],
        items: [...copyAddService[toAddIndex].items, data],
      };
      state.addedServices = copyAddService;
    },
    addItems: (state, action) => {
      const { id, data, remainItems, toCheckItemQtyIndex } = action.payload;
      const add = current(state.addedServices);
      // console.log("addedServices", add);
      const copyAddService = [...add];
      if (
        copyAddService.length > 0 &&
        remainItems[toCheckItemQtyIndex].quantity > 0
      ) {
        const toAddIndex = copyAddService.findIndex(
          (service) => service.id === id
        );
        // checking service is added or not
        const toChangeQty = copyAddService[toAddIndex].items.findIndex(
          (item) => item.name === data.name
        );
        if (toChangeQty === -1) {
          copyAddService[toAddIndex] = {
            ...copyAddService[toAddIndex],
            items: [...copyAddService[toAddIndex].items, data],
          };
        } else {
          const changedQtyAry = copyAddService[toAddIndex].items.map((item) => {
            if (item.name === data.name) {
              return { ...item, qty: item.qty + 1 };
            } else {
              return item;
            }
          });
          copyAddService[toAddIndex] = {
            ...copyAddService[toAddIndex],
            items: changedQtyAry,
          };
        }
        state.addedServices = copyAddService;
      } else {
        remainItems[toCheckItemQtyIndex].quantity > 0
          ? alert("Add service first to add item")
          : alert("Out of stock");
      }
    },
    removeItem: (state, action) => {
      const { itemName, serviceName } = action.payload;
      const add = current(state.addedServices);

      const copyAddService = [...add];
      const toRemoveIndex = copyAddService.findIndex(
        (service) => service.serviceName === serviceName
      );

      const toRemoveItemIndex = copyAddService[toRemoveIndex].items.findIndex(
        (item) => item.name === itemName
      );
      const copyItems = [...copyAddService[toRemoveIndex].items];
      copyItems.splice(toRemoveItemIndex, 1);

      copyAddService[toRemoveIndex] = {
        ...copyAddService[toRemoveIndex],
        items: copyItems,
      };

      state.addedServices = copyAddService;
    },
    removeService: (state, action) => {
      const { id } = action.payload;
      const add = current(state.addedServices);
      const copyAddService = [...add];
      const toRemoveIndex = copyAddService.findIndex(
        (service) => service.id === id
      );
      copyAddService.splice(toRemoveIndex, 1);
      state.addedServices = copyAddService;
    },
    increaseQty: (state, action) => {
      const { itemName, serviceName } = action.payload;
      const add = current(state.addedServices);
      const copyAddService = [...add];

      const toAddIndex = copyAddService.findIndex(
        (service) => service.serviceName === serviceName
      );

      const changedQtyAry = copyAddService[toAddIndex].items.map((item) => {
        if (item.name === itemName) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      copyAddService[toAddIndex] = {
        ...copyAddService[toAddIndex],
        items: changedQtyAry,
      };
      state.addedServices = copyAddService;
    },
    decreaseQty: (state, action) => {
      const { itemName, serviceName } = action.payload;
      const add = current(state.addedServices);
      const copyAddService = [...add];

      const toAddIndex = copyAddService.findIndex(
        (service) => service.serviceName === serviceName
      );
      const changedQtyAry = copyAddService[toAddIndex].items.map((item) => {
        if (item.name === itemName) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return item;
        }
      });
      copyAddService[toAddIndex] = {
        ...copyAddService[toAddIndex],
        items: changedQtyAry,
      };
      copyAddService[toAddIndex].items.forEach((item, index) => {
        if (item.qty === 0) {
          copyAddService[toAddIndex].items.splice(index, 1);
        }
      });
      state.addedServices = copyAddService;
    },
  },
});

export const {
  addService,
  addItems,
  removeService,
  increaseQty,
  decreaseQty,
  removeItem,
  fetchAddedServiceFromCookie,
  addCustomerItem,
  resetAddedServices,
} = addedServicesSlice.actions;

export default addedServicesSlice.reducer;
