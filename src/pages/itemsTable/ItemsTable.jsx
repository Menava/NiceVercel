import React, { useEffect, useRef, useState } from "react";

import "./itemsTable.scss";
import { getItems } from "../../redux/Apicall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  openAddItemModal,
  openDeleteItemModal,
  openModalItems,
  openRefundItemModal,
  openRestockItemModal,
} from "../../redux/modalsAndDataSlice";
import Table from "../../components/table/Table";

function ItemsTable() {
  const { items } = useSelector((state) => state.modalsAndData);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const headersList = [
    "No",
    "Item Id",
    "Name",
    "Qty",
    "Price",
    "Supplier",
    "Actions",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    getItems(dispatch);
  }, [dispatch]);

  function handleNavigatePage(id) {
    navigate(`/tables/itemsTable/${id}`);
  }

  function handleSearchFunc() {
    return items.filter(
      (item) =>
        item.name.includes(searchInput) ||
        item.name.toLocaleLowerCase().includes(searchInput)
    );
  }

  function openEditModalHandle(e, data) {
    e.stopPropagation();
    dispatch(
      openModalItems({
        dataObj: data,
      })
    );
  }

  function openAddNewItemModelHandle() {
    dispatch(openAddItemModal());
  }

  function openRestockModalHandle(e, data) {
    e.stopPropagation();
    dispatch(
      openRestockItemModal({
        data,
      })
    );
  }

  function openRefundItemModalHandle(e, data) {
    e.stopPropagation();
    dispatch(openRefundItemModal({ data }));
  }

  function openDeleteModalHandle(e, item) {
    e.stopPropagation();
    dispatch(openDeleteItemModal({ id: item.id }));
  }

  const itemsTableRow = handleSearchFunc().map((item, index) => {
    return (
      <tr
        className="table_row_items"
        key={index}
        onClick={() => handleNavigatePage(item.id)}
      >
        <td>{index + 1}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td>{item.supplier.name}</td>
        <td>
          {
            <button
              className="refund_btn"
              onClick={(e) => openRefundItemModalHandle(e, item)}
            >
              Refund
            </button>
          }
          <button
            className="refill_btn"
            onClick={(e) => openRestockModalHandle(e, item)}
          >
            Restock
          </button>
          <button
            className="table_editBtn"
            onClick={(e) => openEditModalHandle(e, item)}
          >
            Edit
          </button>
          <button
            className="table_deleteBtn"
            onClick={(e) => openDeleteModalHandle(e, item)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="items">
      <Table
        tablePageName="Items Table"
        headersList={headersList}
        addButtonName="Add New Item"
        serachPlaceHolder="Search Items"
        dataTableRow={itemsTableRow}
        tableRowSelector="table_row_items"
        addModalOpenHandle={openAddNewItemModelHandle}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default ItemsTable;
