import React, { useState } from "react";
import "./editableItemPrice.scss";

const EditableItemPrice = ({
  itm,
  setServicePlaceServiceItem,
  servicePlaceServiceItem,
  SERVICE,
}) => {
  const [openEditItemPrice, setOpenEditItemPrice] = useState(false);
  const [itemPriceInput, setItemPriceInput] = useState("");

  const itemPriceHandle = () => {
    // console.log("servicePlaceServiceItem", servicePlaceServiceItem);
    // console.log("SERVICE", SERVICE);
    const toEditServiceIndex = servicePlaceServiceItem.findIndex(
      (ser) => ser.service.id === SERVICE.service.id
    );
    const finalResult = servicePlaceServiceItem.map((ser, index) => {
      if (toEditServiceIndex === index) {
        return {
          ...ser,
          items: ser.items.map((item) =>
            itm.id === item.id
              ? { ...item, price: parseInt(itemPriceInput) }
              : item
          ),
        };
      }
      return ser;
    });
    setServicePlaceServiceItem(finalResult);
    setItemPriceInput("");
    setOpenEditItemPrice(false);
  };

  return (
    <>
      {openEditItemPrice ? (
        <div className="input_wrapper">
          <input
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log("trigger");
                itemPriceHandle();
              }
            }}
            type="text"
            value={itemPriceInput}
            onChange={(e) => setItemPriceInput(e.target.value)}
          />
          <button onClick={() => itemPriceHandle()}>Set Price</button>
        </div>
      ) : (
        <div className="item_price_wrapper">
          <p
            className="item_price_edit"
            onClick={() => setOpenEditItemPrice(true)}
          >
            Edit
          </p>
          <p className="itm_price">{itm.price * itm.quantity}</p>
        </div>
      )}
    </>
  );
};

export default EditableItemPrice;
