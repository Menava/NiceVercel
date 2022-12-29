import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemService from "../../APIServices/ItemAPI";
import { getItems } from "../../redux/Apicall";
import { closeModal } from "../../redux/modalsAndDataSlice";
import "./deleteItemModal.scss";

function DeleteItemModal({ handleFunction }) {
  const dispatch = useDispatch();
  // const { toDeleteItemId } = useSelector((state) => state.modalsAndData);

  function cancelHandle() {
    dispatch(closeModal());
  }

  return (
    <div className="deleteItemModal_wrapper">
      <div className="delete_buttonsWrapper">
        <button onClick={cancelHandle}>Cancel</button>
        <button
          onClick={() => {
            handleFunction();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteItemModal;
