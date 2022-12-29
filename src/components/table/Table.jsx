import React, { useEffect, useState } from "react";
import "./table.scss";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

function Table({
  addButtonName,
  headersList,
  serachPlaceHolder,
  tablePageName,
  dataTableRow,
  noSearchBar,
  tableRowSelector,
  addModalOpenHandle,
  setSearchInput,
  searchByMonth,
  searchByMonthHandle,
}) {
  const [clicked, setClicked] = useState(false);

  const MONTHS = [
    { name: "January", no: "1" },
    { name: "Febuary", no: "2" },
    { name: "March", no: "3" },
    { name: "Apirl", no: "4" },
    { name: "May", no: "5" },
    { name: "June", no: "6" },
    { name: "July", no: "7" },
    { name: "August", no: "8" },
    { name: "September", no: "9" },
    { name: "October", no: "10" },
    { name: "November", no: "11" },
    { name: "December", no: "12" },
  ];

  useEffect(() => {
    const tableRow = document.querySelectorAll(`.${tableRowSelector}`);
    tableRow.forEach((TR) => {
      [...TR.children].forEach((tdd, index) =>
        tdd.setAttribute("data-label", `${headersList[index]}`)
      );
    });
  }, [headersList]);

  return (
    <div className="table" style={tablePageName ? { padding: "1rem" } : null}>
      {addButtonName && (
        <div className="popup_addBtn" onClick={addModalOpenHandle}>
          <AiOutlinePlus className="popup_addIcon" />
        </div>
      )}

      <h2
        className="table_name"
        style={tablePageName ? null : { display: "none" }}
      >
        {tablePageName}
      </h2>

      <div className="table_searchWrapper">
        {addButtonName && (
          <>
            <button onClick={addModalOpenHandle}>{addButtonName}</button>
            {searchByMonth && (
              <button
                onClick={() => {
                  searchByMonthHandle();
                  setClicked((prev) => !prev);
                }}
              >
                {searchByMonth}
              </button>
            )}
          </>
        )}
        <div
          className="table_searchInput"
          style={noSearchBar ? { display: "none" } : null}
        >
          <BsSearch className="table_searchInputIcon" />
          <input
            type="text"
            placeholder={serachPlaceHolder}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div
        className="scroll_container"
        style={noSearchBar ? { height: "100%" } : null}
      >
        <table style={noSearchBar ? { margin: "0px" } : null}>
          <thead>
            <tr>
              {headersList.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{dataTableRow}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
