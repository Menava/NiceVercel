import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  changeInputs,
  imageChangedToggle,
} from "../../redux/modalsAndDataSlice";
import { BiImageAdd } from "react-icons/bi";

import "./popupModal.scss";

function PopupModal({
  editModelHeader,
  initialValues,
  toChangeInputObj,
  handleFunction,
  buttonName,
}) {
  const dispatch = useDispatch();
  const modalWrapperRef = useRef();
  const addImageRef = useRef();
  const modalsAndData = useSelector((state) => state.modalsAndData);
  const { loading } = useSelector((state) => state.loading);

  function closeModalHandle(e) {
    if (loading) {
      return;
    }
    e.target === modalWrapperRef.current && dispatch(closeModal());
  }

  const objKeys = Object.keys(initialValues);

  function handleOnChage(e, propName) {
    const inputValue =
      propName === "Image" ? e.target.files[0] : e.target.value;

    dispatch(
      changeInputs({
        propName,
        value: inputValue,
        initialValues,
        toChangeInputObj,
      })
    );
  }

  function editImageChangeHandle(e, propName) {
    const inputValue =
      propName === "Image" ? e.target.files[0] : e.target.value;

    dispatch(
      changeInputs({
        propName,
        value: inputValue,
        initialValues,
        toChangeInputObj,
      })
    );

    dispatch(imageChangedToggle());
  }
  const disabledVariables = ["Id", "Supplier", "Qty"];
  const textareaVariables = ["Service Detail", "Description"];
  return (
    <div
      className="popupModalWrapper"
      ref={modalWrapperRef}
      onClick={closeModalHandle}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFunction();
        }}
      >
        <h2>{editModelHeader}</h2>
        {objKeys.map((item) => (
          <div className="editInputWrapper" key={item}>
            <label>{item}</label>
            {disabledVariables.includes(item) ? (
              <input
                type="text"
                disabled
                value={initialValues[`${item}`]}
                onChange={(e) => handleOnChage(e, item)}
              />
            ) : (
              <>
                {textareaVariables.includes(item) ? (
                  <textarea
                    disabled={loading}
                    value={initialValues[`${item}`]}
                    onChange={(e) => handleOnChage(e, item)}
                  />
                ) : item === "Image" ? (
                  <div className="inputImageWrapper">
                    <div
                      className="addImage_iconWrapper"
                      onClick={() => addImageRef.current.click()}
                    >
                      <BiImageAdd className="addImage_icon" />
                    </div>

                    <input
                      disabled={loading}
                      className="fileInput"
                      type="file"
                      onChange={(e) => editImageChangeHandle(e, item)}
                      style={{ display: "none" }}
                      ref={addImageRef}
                    />

                    {modalsAndData.editButtonClicked ? (
                      <img
                        className="fileImage"
                        src={
                          modalsAndData.imageChanged
                            ? URL.createObjectURL(initialValues[item])
                            : `https://drive.google.com/uc?export=view&id=${initialValues[item]}`
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        alt=""
                        className="fileImage"
                        src={
                          initialValues[item]
                            ? URL.createObjectURL(initialValues[item])
                            : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                        }
                      />
                    )}
                  </div>
                ) : (
                  <input
                    disabled={loading}
                    type="text"
                    value={initialValues[`${item}`]}
                    onChange={(e) => handleOnChage(e, item)}
                  />
                )}
              </>
            )}
          </div>
        ))}
        <button className="popupModalBtn" disabled={loading}>
          {loading ? "Loading" : buttonName}
        </button>
      </form>
    </div>
  );
}

export default PopupModal;
