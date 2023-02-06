import React from "react";
import "./incomeModal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncome,
  changeEditIncome,
  changeIncomeInputHandle,
  changeSelectedIncomeOptions,
  closeModal,
} from "../../redux/modalsAndDataSlice";
import { useRef } from "react";
import GeneralIncomeService from "../../APIServices/GeneralIncome";

const IncomeModal = ({ buttonName, edit }) => {
  const { incomeInitialValues, incomeOptions, toChangeIncomeId } = useSelector(
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

  async function editIncomeHandle() {
    const id = toChangeIncomeId;
    const description = incomeInitialValues.Description;
    const amount = incomeInitialValues["Income Amount"];
    const type = incomeInitialValues.Type;

    await GeneralIncomeService.UpdateGeneralIncome(id, {
      description,
      amount,
      income_type: type,
    }).then((res) => dispatch(changeEditIncome({ data: res })));

    dispatch(closeModal());
  }

  async function addIncomeHandle() {
    const description = incomeInitialValues.Description;
    const incomeAmount = incomeInitialValues["Income Amount"];
    const incomeType = incomeInitialValues.Type;
    await GeneralIncomeService.InsertGeneralIncome({
      description,
      amount: incomeAmount,
      income_type: incomeType,
    }).then((res) => dispatch(addIncome({ data: res })));
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
          onClick={() => (edit ? editIncomeHandle() : addIncomeHandle())}
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
