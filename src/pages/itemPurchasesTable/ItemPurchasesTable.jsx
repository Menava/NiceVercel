import { useState, useEffect } from "react";
import ItemPurchaseService from "../../APIServices/ItemPurchasesAPI";
import ItemPaymentService from "../../APIServices/ItemPaymentAPI";
import "./itemPurchasesTable.scss";
import Table from "../../components/table/Table";

function ItemPurchasesTable() {
  const [itemPurchasesLists, setItemPurchasesLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchItemPurchases() {
      const data = await ItemPurchaseService.GetItemPurchases();
      console.log(data);
      setItemPurchasesLists(data);
    }

    // async function fetchItemPayment() {
    //   const data = await ItemPaymentService.GetItemPayment();
    //   console.log("item payment", data);
    // }
    fetchItemPurchases();
  }, []);

  const headersList = [
    "No",
    "Item Name",
    "Buy Price",
    "Quantity Received",
    "Refund Quantity",
    "Paid Amount",
    "Purchase Date",
  ];
  const itemsTableRow = itemPurchasesLists.map((item, index) => {
    return (
      <tr className="table_row_items" key={index}>
        <td>{index + 1}</td>
        <td>{item.item_id.name}</td>
        <td>{item.unit_price}</td>
        <td>{item.quantity_received}</td>
        <td>{item.refund_quantity}</td>
        <td>{item.item_payment.paid_amount}</td>
        <td>{item.purchase_date}</td>
      </tr>
    );
  });

  return (
    <div className="itemPurchasesTable__wrapper">
      <Table
        tablePageName="Items Purchases"
        headersList={headersList}
        serachPlaceHolder="Search purchases"
        dataTableRow={itemsTableRow}
        tableRowSelector="table_row_items"
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default ItemPurchasesTable;
