import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import GeneralPurchaseService from "../../APIServices/GeneralPurchaseAPI";
import { getGeneralPurchases } from "../../redux/Apicall";
import { closeModal } from "../../redux/modalsAndDataSlice";
import "./generalPurchaseModal.scss";

const GeneralPurchaseModal = ({
  buttonName,
  generalPurchase,
  setGeneralPurchase,
  purchaseOptions,
  setPurchaseOptions,
  selectedPurchaseOptions,
  setSelectedPurchaseOptions,
  toEditGeneralPurchaseId,
  setToEditGeneralPurchaseId,
  businessOptions,
  setBusineesOptions,
  edit,
  selectedBusinessOption,
  setSelectedBusinessOption,
}) => {
  const backgroundRef = useRef();
  const dispatch = useDispatch();

  function onChangeHandle(e, toChangeProperty) {
    const inputValue = e.target.value;
    setGeneralPurchase({ ...generalPurchase, [toChangeProperty]: inputValue });
  }

  async function addGeneralPurchaseHandle() {
    await GeneralPurchaseService.InsertGeneralPurchase({
      description: generalPurchase.Description,
      unit_price: parseFloat(generalPurchase.Price),
      quantity: parseInt(generalPurchase.Quantity),
      purchase_type: selectedPurchaseOptions,
      business_type: selectedBusinessOption,
    });
    getGeneralPurchases(dispatch);
    dispatch(closeModal());
  }

  async function editGeneralPurchase() {
    const toChangeId = toEditGeneralPurchaseId;
    const Description = generalPurchase.Description;
    const Quantity = generalPurchase.Quantity;
    const UnitPrice = generalPurchase.Price;

    await GeneralPurchaseService.UpdateGeneralPurchase(toChangeId, {
      description: Description,
      unit_price: UnitPrice,
      quantity: Quantity,
      purchase_type: selectedPurchaseOptions,
      business_type: selectedBusinessOption,
    });

    getGeneralPurchases(dispatch);
    dispatch(closeModal());
  }

  return (
    <div
      className="addNewItemModal_wrapper"
      ref={backgroundRef}
      onClick={(e) => {
        if (e.target === backgroundRef.current) {
          dispatch(closeModal());
        }
      }}
    >
      <div className="addNewItemModal">
        <h2>General Purchase</h2>
        <div className="input_wrapper">
          {Object.keys(generalPurchase).map((item, index) => (
            <div className="item_input" key={index}>
              <label>{item}</label>
              <input
                // disabled={loading}
                type={
                  ["Price", "Quantity"].some((element) => element === item)
                    ? "number"
                    : "text"
                }
                value={generalPurchase[item]}
                onChange={(e) => onChangeHandle(e, item)}
              />
            </div>
          ))}
          <label>Business Options</label>
          <div className="purchaseOptins_wrapper">
            {Object.keys(businessOptions).map((option, index) => (
              <div
                className={
                  selectedBusinessOption === option
                    ? " purchaseOption active"
                    : "purchaseOption"
                }
                key={index}
                onClick={() => {
                  const newObj = { ...businessOptions };
                  Object.keys(newObj).forEach((obj) => {
                    if (obj === option) {
                      newObj[obj] = obj;
                      setSelectedBusinessOption(obj);
                    } else {
                      newObj[obj] = "";
                    }
                  });
                  setBusineesOptions(newObj);
                }}
              >
                <p>{option}</p>
              </div>
            ))}
          </div>
          <label>Purchase Options</label>
          <div className="purchaseOptins_wrapper">
            {Object.keys(purchaseOptions).map((option, index) => (
              <div
                className={
                  selectedPurchaseOptions === option
                    ? " purchaseOption active"
                    : "purchaseOption"
                }
                key={index}
                onClick={() => {
                  const newObj = { ...purchaseOptions };
                  Object.keys(newObj).forEach((obj) => {
                    if (obj === option) {
                      newObj[obj] = obj;
                      setSelectedPurchaseOptions(obj);
                    } else {
                      newObj[obj] = "";
                    }
                  });
                  setPurchaseOptions(newObj);
                }}
              >
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="buyItem_btn"
          onClick={() =>
            edit ? editGeneralPurchase() : addGeneralPurchaseHandle()
          }
          // disabled={loading}
        >
          {/* {loading ? "Loading" : "General Purchase"} */}
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default GeneralPurchaseModal;
