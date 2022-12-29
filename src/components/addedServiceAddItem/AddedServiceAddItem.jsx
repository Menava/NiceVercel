import React from "react";
import "./addedServiceAddItem.scss";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeItem,
} from "../../redux/addedServicesSlice";
import {
  decreaseItemQty,
  increaseItemQty,
  resetItemQty,
} from "../../redux/modalsAndDataSlice";
function AddedServiceAddItem({ itemName, qty, price, serviceName }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.modalsAndData);
  // const { socket } = useSelector((state) => state.socket);

  const itemInStock =
    items[items.findIndex((item) => item.name === itemName)]?.quantity;

  function increaseQtyHandle() {
    dispatch(decreaseItemQty({ name: itemName }));
    dispatch(increaseQty({ itemName, serviceName }));
  }

  function decreaseQtyHandle() {
    dispatch(increaseItemQty({ name: itemName }));
    dispatch(decreaseQty({ itemName, serviceName }));
  }

  function removeItemHandle() {
    dispatch(resetItemQty({ name: itemName, qty }));
    dispatch(removeItem({ itemName, serviceName }));
  }

  return (
    <div className="addedServiceAddItem">
      <p className="addServiceAddItem_itemName">{itemName}</p>
      <div className="increaseDecreaseWrapper">
        <button className="minusButton" onClick={decreaseQtyHandle}>
          -
        </button>
        <p className="itemQty">{qty}</p>
        {itemInStock === 0 ? (
          <button className="plusButton" onClick={increaseQtyHandle} disabled>
            +
          </button>
        ) : (
          <button className="plusButton" onClick={increaseQtyHandle}>
            +
          </button>
        )}
      </div>
      <div className="totalsWrapper">
        <p>{price * qty}</p>
        <FaTrash
          className="addedServiceAddItem_trashIcon"
          onClick={removeItemHandle}
        />
      </div>
    </div>
  );
}

export default AddedServiceAddItem;
