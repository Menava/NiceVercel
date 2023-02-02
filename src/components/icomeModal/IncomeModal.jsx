import React from "react";
import "./incomeModal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIncomeInputHandle,
  changeSelectedIncomeOptions,
  closeModal,
} from "../../redux/modalsAndDataSlice";
import { useRef } from "react";

const IncomeModal = ({ buttonName }) => {
  const { incomeInitialValues, incomeOptions } = useSelector(
    (state) => state.modalsAndData
  );

  const dispatch = useDispatch();
  const backgroundRef = useRef();

  function onChangeHandle(e, toChangeProperty) {
    dispatch(
      changeIncomeInputHandle({ toChangeProperty, data: e.target.value })
    );
  }

  function changeIncomeOptionsHandle(toChangeOption) {
    dispatch(changeSelectedIncomeOptions({ toChangeOption }));
  }

  function editIncomeHandle() {
    alert("Edit Income handle tirggered");
  }

  function addIncomeHandle() {
    const description = incomeInitialValues.Description;
    const incomeAmount = incomeInitialValues["Income Amount"];
    const incomeType = incomeInitialValues.Type;
    console.log(description, incomeAmount, incomeType);
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
          {Object.keys(incomeInitialValues)
            .filter((objKey) => objKey !== "Type")
            .map((item, index) => (
              <div className="item_input" key={index}>
                <label>{item}</label>
                <input
                  // disabled={loading}
                  type={
                    ["Income Amount"].some((element) => element === item)
                      ? "number"
                      : "text"
                  }
                  value={incomeInitialValues[item]}
                  onChange={(e) => onChangeHandle(e, item)}
                />
              </div>
            ))}
          <label>Incomes Options</label>
          <div className="purchaseOptins_wrapper">
            {incomeOptions.map((opt, index) => (
              <div
                onClick={() => changeIncomeOptionsHandle(opt.option)}
                className={
                  opt.selected ? " purchaseOption active" : "purchaseOption"
                }
                key={index}
              >
                <p>{opt.option}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="buyItem_btn"
          onClick={addIncomeHandle}
          // disabled={loading}
        >
          {/* {loading ? "Loading" : "General Purchase"} */}
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default IncomeModal;
