import React, { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import InputTag from "../../components/InputTag/InputTag";
import "./prepareService.scss";
import EmployeeNameTag from "../../components/employeeNameTag/EmployeeNameTag";
import ErrorComponentImage from "../../components/errorComponentImage/ErrorComponentImage";
import DropdownInputTag from "../../components/dropdownInputTag/DropdownInputTag";
import { useDispatch, useSelector } from "react-redux";
import { resetError, makeService } from "../../redux/inputedServiceSlice";
import { useNavigate } from "react-router-dom";
import {
  getCustomer,
  getEmployees,
  getErrorTypes,
  getFrameTypes,
  getServicePlaces,
} from "../../redux/Apicall";

import {
  addDummyData,
  removeCustomerSignature,
  removeEmployeeSignature,
  userInputTagCustomerDropdownHandle,
  userInputTagEmployeeDropdownHandle,
} from "../../redux/prepareServiceInputSlice";

import {
  openAddEmployeesPrepareServiceModal,
  openCustomerSignaturePadModal,
  openEmployeeSignaturePadModal,
  setUserSelectedImage,
} from "../../redux/modalsAndDataSlice";
import { ImCross } from "react-icons/im";
import AppService from "../../APIServices/AppAPI";

function PrepareService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prepareServiceInputs = useSelector(
    (state) => state.prepareserviceInputs
  );
  const { customers, employees } = useSelector((state) => state.modalsAndData);
  const inputedService = useSelector((state) => state.inputedService);

  // reseting errors
  useEffect(() => {
    if (Object.keys(inputedService.errors).length > 0) {
      setTimeout(() => {
        dispatch(resetError());
      }, 4000);
    }
  }, [inputedService.errors, dispatch]);

  // // get session data
  // useEffect(() => {
  //   // AppService.logout().then((resp) => console.log(resp));

  //   AppService.GetSession().then((resp) => {
  //     console.log("response Data", resp);
  //   });
  // }, []);

  function makeServiceHandle() {
    const formData = new FormData();
    formData.append("user-items", JSON.stringify(prepareServiceInputs));
    AppService.SetUserItems(formData).then((resp) => console.log("gg", resp));
    dispatch(makeService({ data: prepareServiceInputs, navigate }));
  }

  useEffect(() => {
    getFrameTypes(dispatch);
    getErrorTypes(dispatch);
    getCustomer(dispatch);
    getEmployees(dispatch);
    getServicePlaces(dispatch);
  }, [dispatch]);

  function dropdownInputEmployeeLeaderSelectHandle(
    setActiveDropdown,
    userInputPropName,
    data
  ) {
    dispatch(
      userInputTagEmployeeDropdownHandle({
        propName: userInputPropName,
        data,
      })
    );
    setActiveDropdown(false);
  }

  function dropdownInputCustomerSelectHandle(
    setActiveDropdown,
    userInputPropName,
    data
  ) {
    dispatch(
      userInputTagCustomerDropdownHandle({
        data,
        propName: userInputPropName,
      })
    );
    setActiveDropdown(false);
  }

  function filterCustomerHandle(
    searchInput,
    setActiveDropdown,
    userInputPropName
  ) {
    return customers
      ?.filter(
        (customer) =>
          customer.name.includes(searchInput) ||
          customer.name.toLocaleLowerCase().includes(searchInput) ||
          customer.name.toUpperCase().includes(searchInput)
      )
      .map((customer) => (
        <div
          className="dropdownInputValue"
          key={customer.id}
          onClick={() =>
            dropdownInputCustomerSelectHandle(
              setActiveDropdown,
              userInputPropName,
              customer
            )
          }
        >
          <p>{customer.name}</p>
          <p>Phone: {customer.phone}</p>
        </div>
      ));
  }

  function filterEmployeeHandle(
    searchInput,
    setActiveDropdown,
    userInputPropName
  ) {
    return employees
      ?.filter(
        (employee) =>
          employee.name.includes(searchInput) ||
          employee.name.toLocaleLowerCase().includes(searchInput) ||
          employee.name.toUpperCase().includes(searchInput)
      )
      .map((employee) => (
        <div
          className="dropdownInputValue"
          key={employee.id}
          onClick={() =>
            dropdownInputEmployeeLeaderSelectHandle(
              setActiveDropdown,
              userInputPropName,
              employee
            )
          }
        >
          <p>{employee.name}</p>
        </div>
      ));
  }

  function addDummyDataHandle() {
    const { id, name } = prepareServiceInputs.dropdownLists.frameTypes[0];
    const dummyEmpData = employees.filter((emp) => emp.hidden !== null);
    const dummyEmpLeader = dummyEmpData[0];
    const dummyEmployees = dummyEmpData[1];
    dispatch(addDummyData({ id, name, dummyEmpLeader, dummyEmployees }));
  }

  return (
    <div className="prepareService">
      <div className="prepareService_header_wrapper">
        <h2 className="prepaerService_header">Prepare Service</h2>
        <button onClick={addDummyDataHandle}>Add Dummy Data</button>
      </div>
      <form
        className="prepareService_form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="divDivider">
          <InputTag
            userInputPropName="customerName"
            labelName="Customer Name"
            pHolder="Please insert customer name"
            errorMessage={inputedService.errors.customerName}
            haveDropdown
            filterFunction={filterCustomerHandle}
          />
          <InputTag
            userInputPropName="customerPhone"
            labelName="Customer Phone"
            pHolder="Please insert customer phone"
            errorMessage={inputedService.errors.customerPhone}
          />
        </div>
        <div className="divDivider">
          <InputTag
            userInputPropName="customerCarBrand"
            labelName="Customer Car brand"
            pHolder="Please insert car brand"
            errorMessage={inputedService.errors.customerCarBrand}
          />
          <InputTag
            userInputPropName="customerCarNo"
            labelName="Customer Car No"
            pHolder="Please insert car No"
            errorMessage={inputedService.errors.customerCarNo}
          />
          <InputTag
            userInputPropName="customerCarColor"
            labelName="Car Color"
            pHolder="Please insert car Color"
            errorMessage={inputedService.errors.customerCarColor}
          />
        </div>
        <div className="divDivider">
          <InputTag
            userInputPropName="customerCarModel"
            labelName="Car Model"
            pHolder="Please insert customer car model"
            errorMessage={inputedService.errors.customerCarModel}
          />
          <InputTag
            userInputPropName="customerCarYear"
            labelName="Year"
            pHolder="Please insert year"
            errorMessage={inputedService.errors.customerCarYear}
          />
        </div>
        <div className="divDivider">
          <DropdownInputTag
            lableName="Frame Type"
            userInputPropName="frameType"
            ddPropName="frameTypes"
            activePropName="frameTypeActive"
            errorMessage={inputedService.errors.frameType}
            frameType
          />
          <DropdownInputTag
            lableName="Service Place"
            userInputPropName="servicePlace"
            ddPropName="servicePlaces"
            activePropName="servicePlaceActive"
            errorMessage={inputedService.errors.servicePlace}
          />
        </div>
        <div className="divDivider">
          <InputTag
            userInputPropName="employeeLeader"
            labelName="Employee Leader"
            pHolder="Please insert employee leader"
            errorMessage={inputedService.errors.employeeLeader}
            filterFunction={filterEmployeeHandle}
            haveDropdown
          />
        </div>
        <div className="divEmployeesWrapper">
          <label>Employees</label>
          <div className="divEmpInsideWrapper">
            <div className="divOverFlowWrapper">
              <div className="divEmployees vertical-scroll">
                {prepareServiceInputs.employees.map((employee) => (
                  <EmployeeNameTag
                    employeeName={employee.name}
                    key={employee.id}
                    id={employee.id}
                  />
                ))}
              </div>
            </div>

            <div
              className="employee_addIconWrapper"
              onClick={() => dispatch(openAddEmployeesPrepareServiceModal())}
            >
              <AiOutlinePlusCircle className="employee_addIcon" />
            </div>
          </div>
          <p className="error">{inputedService.errors.employees}</p>
        </div>
        <div className="divDivider">
          <DropdownInputTag
            lableName="Component"
            userInputPropName="component"
            ddPropName="components"
            activePropName="componentsActive"
            errorMessage={inputedService.errors.component}
          />
          <DropdownInputTag
            lableName="Error"
            userInputPropName="errorType"
            ddPropName="errorTypes"
            activePropName="errorTypeActive"
            errorMessage={inputedService.errors.errorType}
            Icon
          />
        </div>
        <div className="divSelectedComponent_wrapper">
          <label>Selected Component</label>
          <div className="selectComponentInsideWrapper">
            <div className="divOverFlowWrapper">
              <div className="selectedComponent">
                {prepareServiceInputs.errorImages.map((error, index) => (
                  <ErrorComponentImage
                    key={index}
                    errorImage={error.errorImage}
                    damageType={error.damageType}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="error">{inputedService.errors.errorImages}</p>
        </div>
        <div className="signatureDiv_wrapper">
          <label>Signatures</label>
          <div className="signatureButtonsWrapper">
            {prepareServiceInputs.customerSignature ? (
              <div className="signatureImageWrapper">
                <div
                  className="signatureImage_removeIconWrapper"
                  onClick={() => dispatch(removeCustomerSignature())}
                >
                  <ImCross className="signature_removeIcon" />
                </div>
                <img
                  onClick={(e) =>
                    dispatch(setUserSelectedImage({ data: e.target.src }))
                  }
                  src={prepareServiceInputs.customerSignature}
                  alt="customerSignature"
                />
                <label>Customer Signature</label>
              </div>
            ) : (
              <button onClick={() => dispatch(openCustomerSignaturePadModal())}>
                Add Customer Sign
              </button>
            )}
            {prepareServiceInputs.employeeSignature ? (
              <div className="signatureImageWrapper">
                <div
                  className="signatureImage_removeIconWrapper"
                  onClick={() => dispatch(removeEmployeeSignature())}
                >
                  <ImCross className="signature_removeIcon" />
                </div>
                <img
                  onClick={(e) =>
                    dispatch(setUserSelectedImage({ data: e.target.src }))
                  }
                  src={prepareServiceInputs.employeeSignature}
                  alt="employeeSignature"
                />
                <label>Employee Signature</label>
              </div>
            ) : (
              <button onClick={() => dispatch(openEmployeeSignaturePadModal())}>
                Add Employee Sign
              </button>
            )}
          </div>
          <p className="error">{inputedService.errors.signature}</p>
        </div>
        <button className="prepareService_addBtn" onClick={makeServiceHandle}>
          Make Service
        </button>
      </form>
    </div>
  );
}

export default PrepareService;
