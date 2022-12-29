import React, { useState } from "react";
import EditableItemPrice from "../EditableItemPrice/EditableItemPrice";

import "./createVoucherService.scss";

function CreateVoucherService({
  SERVICE,
  setServicePlaceServiceItem,
  servicePlaceServiceItem,
}) {
  const [servicePriceInput, setServicePriceInput] = useState("");
  const [openEditPrice, setOpenEditPrice] = useState(true);

  function servicePriceHandle() {
    if (servicePriceInput !== "") {
      const toChangeServicePriceId = SERVICE.service.id;
      const changedServicePriceAry = servicePlaceServiceItem.map((ser) => {
        if (ser.service.id === toChangeServicePriceId) {
          return {
            items: ser.items,
            service: {
              ...ser.service,
              service_price: parseInt(servicePriceInput),
            },
            status: ser.status,
          };
        }
        return ser;
      });
      setServicePlaceServiceItem(changedServicePriceAry);
      setOpenEditPrice(false);
      setServicePriceInput("");
      calculateSubTotals();
    }
  }

  function editServicePriceHandle() {
    setOpenEditPrice(true);
  }

  function filterItemByOwner(owner) {
    if (owner === "CUSTOMER") {
      return SERVICE.items.filter((item) => item.hasOwnProperty("customer_id"));
    }
    if ((owner = "NICE")) {
      return SERVICE.items.filter(
        (item) => !item.hasOwnProperty("customer_id")
      );
    }
  }

  function calculateSubTotals() {
    const service_price = SERVICE.service.service_price;
    let items_ary = SERVICE.items.filter(
      (item) => !item.hasOwnProperty("customer_id")
    );
    let items_price = 0;
    items_ary.forEach((itm) => (items_price += itm.price * itm.quantity));

    return items_price + service_price;
  }

  return (
    <div className="createVoucherService_wrapper">
      <div className="serviceName_wrapper">
        <h4>{SERVICE.service.service_type}</h4>
        {openEditPrice ? (
          <div className="input_wrapper">
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  console.log("trigger");
                  servicePriceHandle();
                }
              }}
              type="text"
              value={servicePriceInput}
              onChange={(e) => setServicePriceInput(e.target.value)}
            />
            <button onClick={() => servicePriceHandle()}>Set Price</button>
          </div>
        ) : (
          <div className="price_wrapper">
            <p onClick={editServicePriceHandle} className="edit">
              Edit
            </p>
            <p className="price">{SERVICE.service.service_price}</p>
          </div>
        )}
      </div>
      {/* Customer  item */}
      {filterItemByOwner("CUSTOMER")?.map((itm) => (
        <div className="itm_wrapper" key={itm.id}>
          <h4 className="itm_name">
            {itm.name} ({itm.quantity}) CUS
          </h4>
          <p className="itm_price">0</p>
        </div>
      ))}
      {/* Car workshop item */}
      {filterItemByOwner("NICE")?.map((itm) => (
        <div className="itm_wrapper" key={itm.id}>
          <h4 className="itm_name">
            {itm.name} ({itm.quantity})
          </h4>
          <EditableItemPrice
            itm={itm}
            SERVICE={SERVICE}
            setServicePlaceServiceItem={setServicePlaceServiceItem}
            servicePlaceServiceItem={servicePlaceServiceItem}
          />
        </div>
      ))}
      <div className="subtotals_wrapper">
        <h4 className="subtotals">
          Subtotals{" "}
          <span className="subtotals_price">{calculateSubTotals()}</span>
        </h4>
      </div>
    </div>
  );
}

export default CreateVoucherService;
