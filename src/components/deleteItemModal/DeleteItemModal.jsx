import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalsAndDataSlice";
import "./deleteItemModal.scss";

function DeleteItemModal({ handleFunction }) {
  const dispatch = useDispatch();

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
