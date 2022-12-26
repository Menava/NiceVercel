import React from "react";
import CheckListSign from "../checkListSign/CheckListSign";
import Table from "../table/Table";
import "./initialFinalCheckList.scss";

function InitialFinalCheckList({ dataTableRow }) {
  const headersListCheckLists = ["ID", "Image", "Damage part", "Damage Type"];
  return (
    <div className="initialFinalCheckList">
      <Table
        headersList={headersListCheckLists}
        dataTableRow={dataTableRow}
        noSearchBar
        tableRowSelector="table_row_initialFinalCheckList"
      />
      <div className="checkList">
        <div className="checkList_signArea">
          <p className="checkList_signHeader">Signs</p>
          <div className="checkList_signBottom">
            <CheckListSign
              signImg="https://images.hdqwalls.com/wallpapers/lisa-blackpink-4k-mg.jpg"
              signOwner="Employees"
            />
            <CheckListSign
              signImg="https://images.hdqwalls.com/wallpapers/lisa-blackpink-4k-mg.jpg"
              signOwner="Customer"
            />
          </div>
        </div>
        <div className="checkList_notes">
          <p className="checkList_notesHeader">Notes</p>
          <p className="notes">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quasi
            amet assumenda maiores reiciendis quis quia vero omnis error?
            Impedit, voluptatum repellat non laborum nostrum explicabo veritatis
            nihil molestiae quae provident exercitationem? Earum quibusdam amet,
            possimus pariatur exercitationem, assumenda hic deserunt odit animi,
            minus quae explicabo beatae officiis veniam dolore. Dicta vero quae
            dolor, fuga eos iusto illum mollitia? Libero, iste? Facere officiis
            aut pariatur cupiditate voluptates cumque dolor laborum, unde eum
            placeat, ex praesentium fugit
          </p>
        </div>
      </div>
    </div>
  );
}

export default InitialFinalCheckList;
