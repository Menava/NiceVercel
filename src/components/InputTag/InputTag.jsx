import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInputOnChangeHandle } from "../../redux/prepareServiceInputSlice";
import "./inputTag.scss";

function InputTag({
  labelName,
  pHolder,
  handleUserInputChange,
  userInputPropName,
  errorMessage,
  haveDropdown,
  filterFunction,
}) {
  const prepareServiceInputs = useSelector(
    (state) => state.prepareserviceInputs
  );

  const dispatch = useDispatch();
  const [activeDropdown, setActiveDropdown] = useState(true);

  function handleUserInputChange(e) {
    dispatch(
      userInputOnChangeHandle({
        propName: userInputPropName,
        value: e.target.value,
      })
    );
  }

  useEffect(() => {
    if (prepareServiceInputs[userInputPropName].length <= 1) {
      setActiveDropdown(true);
    }
  }, [prepareServiceInputs[userInputPropName]]);

  return (
    <div className="inputTagWrapper">
      <div className="inputTag">
        <label>{labelName}</label>
        <input
          type="text"
          placeholder={pHolder}
          onChange={handleUserInputChange}
          value={
            userInputPropName === "employeeLeader"
              ? prepareServiceInputs[userInputPropName].name
              : prepareServiceInputs[userInputPropName]
          }
        />
        {activeDropdown &&
          haveDropdown &&
          prepareServiceInputs[userInputPropName] && (
            <div className="dropdown_inputList">
              {filterFunction(
                prepareServiceInputs[userInputPropName],
                setActiveDropdown,
                userInputPropName
              )}
            </div>
          )}
      </div>
      <p className="error">{errorMessage}</p>
    </div>
  );
}

export default InputTag;
