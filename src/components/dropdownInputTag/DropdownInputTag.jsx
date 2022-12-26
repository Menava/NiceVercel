import React, { useRef, useState } from "react";
import "./dropdownInputTag.scss";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  userInputSelectDropdown,
  userInputDropdownToggle,
  addErrorImages,
} from "../../redux/prepareServiceInputSlice";
import { getComponentTypes } from "../../redux/Apicall";
import { INITIAL_DROPDOWN_VALUE } from "../../initialValues";

function DropdownInputTag({
  lableName,
  userInputPropName,
  ddPropName,
  activePropName,
  Icon,
  errorMessage,
  frameType,
}) {
  const hiddenFileInput = useRef();
  const dispatch = useDispatch();

  const prepareServiceInputs = useSelector(
    (state) => state.prepareserviceInputs
  );

  function toggleActiveDropdown() {
    dispatch(userInputDropdownToggle({ propName: activePropName }));
  }

  function handleDropdownSelect(item) {
    const id = dispatch(
      userInputSelectDropdown({
        propName: userInputPropName,
        value: item,
      })
    ).payload.value.id;
    frameType && getComponentTypes(dispatch, id);
  }

  function handleFileBtnClick() {
    if (
      prepareServiceInputs.errorType.name ===
        INITIAL_DROPDOWN_VALUE.errorType ||
      prepareServiceInputs.frameType.name ===
        INITIAL_DROPDOWN_VALUE.frameType ||
      prepareServiceInputs.component.name === INITIAL_DROPDOWN_VALUE.component
    ) {
      alert("Please fill out frame type, error type and component");
      return;
    }
    hiddenFileInput.current.click();
  }

  function handleAddErrorImageHandle(e) {
    const imageFile = e.target.files[0];
    // To check initial DropDownValue is select or not
    // console.log(INITIAL_DROPDOWN_VALUE);

    const newErrorImageObj = {
      frameType: prepareServiceInputs.frameType.name,
      damageType: prepareServiceInputs.errorType.name,
      errorImage: imageFile,
      component: prepareServiceInputs.component.name,
    };

    dispatch(addErrorImages({ data: newErrorImageObj }));
  }

  return (
    <>
      {Icon ? (
        <div className="dropDownWrapper">
          <div className="dropdownInputTag" onClick={toggleActiveDropdown}>
            <label>{lableName}</label>
            <div className="dropdownValue">
              {prepareServiceInputs[userInputPropName].name}
              <IoIosArrowDropdownCircle className="dropdownIcon" />
            </div>

            {prepareServiceInputs[activePropName] && (
              <div className="dropdownList">
                {prepareServiceInputs.dropdownLists[ddPropName].map(
                  (item, index) => (
                    <p key={index} onClick={() => handleDropdownSelect(item)}>
                      {item.name}
                    </p>
                  )
                )}
              </div>
            )}
            <p className="error">{errorMessage}</p>
          </div>
          <div className="addImage_iconWrapper" onClick={handleFileBtnClick}>
            <BiImageAdd className="addImage_icon" />
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            onChange={handleAddErrorImageHandle}
          />
        </div>
      ) : (
        <div className="dropdownInputTag" onClick={toggleActiveDropdown}>
          <label>{lableName}</label>
          <div className="dropdownValue">
            {prepareServiceInputs[userInputPropName].name}
            <IoIosArrowDropdownCircle className="dropdownIcon" />
          </div>

          {prepareServiceInputs[activePropName] && (
            <div className="dropdownList">
              {prepareServiceInputs.dropdownLists[ddPropName].map(
                (item, index) => (
                  <p key={index} onClick={() => handleDropdownSelect(item)}>
                    {item.name}
                  </p>
                )
              )}
            </div>
          )}
          <p className="error">{errorMessage}</p>
        </div>
      )}
    </>
  );
}

export default DropdownInputTag;
