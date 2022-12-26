import React, { useEffect, useRef, useState } from "react";
import "./servicesTable.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import {
  closeModal,
  openAddNewServiceModal,
  openDeleteSerivceModal,
  openModalService,
} from "../../redux/modalsAndDataSlice";
import { getServices } from "../../redux/Apicall";

function ServicesTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.modalsAndData);
  const editRef = useRef();
  const [searchInput, setSearchInput] = useState("");

  const headersList = [
    "No",
    "Service Id",
    "Service Type",
    "Service Price",
    "Actions",
  ];

  useEffect(() => {
    getServices(dispatch);
  }, [dispatch]);

  function handleNavigatePage(id) {
    navigate(`/tables/services/${id}`);
  }

  function openModalHandle(e, data) {
    e.stopPropagation();
    dispatch(
      openModalService({
        dataObj: data,
      })
    );
  }

  function handleSearchFunc() {
    return services.filter(
      (service) =>
        service.service_type.includes(searchInput) ||
        service.service_type.toLocaleLowerCase().includes(searchInput) ||
        service.service_type.toLocaleUpperCase().includes(searchInput)
    );
  }

  function openAddNewServiceModalHandle() {
    dispatch(openAddNewServiceModal());
  }

  function handleOpenDeleteServiceModal(e, service) {
    e.stopPropagation();
    console.log("clicked");
    console.log(service);
    dispatch(openDeleteSerivceModal({ id: service.id }));
    // getServices(dispatch);
    // dispatch(closeModal());
  }

  const serviceTableRows = handleSearchFunc().map((service, index) => {
    return (
      <tr
        className="table_row_services"
        key={index}
        onClick={() => handleNavigatePage(service.id)}
      >
        <td>{index + 1}</td>
        <td>{service.id}</td>
        <td>{service.service_type}</td>
        <td>{service.service_price}</td>
        <td>
          <button
            className="table_editBtn"
            ref={editRef}
            onClick={(e) => openModalHandle(e, service)}
          >
            Edit
          </button>
          <button
            className="table_deleteBtn"
            onClick={(e) => handleOpenDeleteServiceModal(e, service)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="services">
      <Table
        tablePageName="Services Table"
        headersList={headersList}
        addButtonName="Add New Service"
        serachPlaceHolder="Search Services"
        dataTableRow={serviceTableRows}
        tableRowSelector="table_row_services"
        addModalOpenHandle={openAddNewServiceModalHandle}
        handleSearchFunc={handleSearchFunc}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default ServicesTable;
