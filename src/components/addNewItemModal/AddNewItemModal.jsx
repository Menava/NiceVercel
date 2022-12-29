import React, { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, fetchItems } from "../../redux/modalsAndDataSlice";
import { ImCross } from "react-icons/im";
import Cookies from "js-cookie";
import "./addNewItemModal.scss";
import { useEffect } from "react";
import SupplierService from "../../APIServices/SupplierAPI";
import ItemService from "../../APIServices/ItemAPI";
import ItemPurchaseService from "../../APIServices/ItemPurchasesAPI";
import ItemPaymentService from "../../APIServices/ItemPaymentAPI";
import { getItems } from "../../redux/Apicall";
import { useNavigate } from "react-router-dom";
import { finishLoading, startLoading } from "../../redux/loadingSlice";

function AddNewItemModal() {
  const [itemValues, setItemsValues] = useState({
    "Item Name": "",
    Qty: "",
    "Buy Price": "",
    "Sale Price": "",
  });
  const { loading } = useSelector((state) => state.loading);
  const [supplier, setSupplier] = useState({ name: "", id: "" });
  const [image, setImage] = useState("");
  const [supplierSearchInput, setSupplierSearchInput] = useState("");
  const [refundable, setRefundable] = useState(false);
  const [radioState, setRadioState] = useState({ yes: false, no: false });
  const [suppliers, setSuppliers] = useState([]);
  const dispatch = useDispatch();
  const addImageRef = useRef();
  const backgroundRef = useRef();
  const navigate = useNavigate();

  function onChangeHandle(e, toChangeProperty) {
    const inputValue = e.target.value;
    setItemsValues({ ...itemValues, [toChangeProperty]: inputValue });
  }

  function openImageSelectHandle() {
    addImageRef.current.click();
  }

  function addImageHandle(e) {
    setImage(e.target.files[0]);
  }

  function closeModalHandle(e) {
    if (loading) {
      return;
    }
    if (e.target === backgroundRef.current) {
      dispatch(closeModal());
    }
  }

  function selectSupplierHandle(name, id) {
    setSupplier({ name, id });
  }

  function unSelectSupplierHandle() {
    setSupplier({ name: "", id: "" });
  }

  function filterSupplierHandle() {
    const copiedSuppliers = [...suppliers];

    return copiedSuppliers.filter(
      (sup) =>
        sup.name.includes(supplierSearchInput) ||
        sup.name.toLocaleLowerCase().includes(supplierSearchInput) ||
        sup.name.toLocaleUpperCase().includes(supplierSearchInput)
    );
  }

  async function buyNewItemHandle() {
    dispatch(startLoading());
    const [day, month, year] = [30, 9, 2022];
    const total = itemValues["Buy Price"] * itemValues.Qty;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", itemValues["Item Name"]);
    formData.append("quantity", itemValues.Qty);
    formData.append("price", itemValues["Sale Price"]);
    formData.append("refundable", refundable);
    formData.append("supplier_id", supplier.id);
    const item_resp = await ItemService.InsertItem(formData);
    console.log(item_resp);
    if (item_resp === 500) {
      alert("Something went wrong");
      dispatch(finishLoading());
      return;
    }
    const purchase_resp = await ItemPurchaseService.InsertItemPurchase({
      quantity_received: itemValues.Qty,
      refund_quantity: 0,
      unit_price: itemValues["Buy Price"],
      sell_price: itemValues["Sale Price"],
      item_id: item_resp.id,
      status: false,
    });

    ItemPaymentService.InsertItemPayment({
      paid_amount: total,
      purchase_id: purchase_resp.id,
    });
    dispatch(finishLoading());
    getItems(dispatch);
    if (item_resp !== 500) {
      dispatch(closeModal());
    }
  }

  function addNewSupplierBtnHandle() {
    navigate("/tables/suppliersTable");
    dispatch(closeModal());
  }

  useEffect(() => {
    async function fetchSuppliers() {
      const data = await SupplierService.GetSuppliers();
      setSuppliers(data);
    }
    fetchSuppliers();
  }, []);

  return (
    <div
      className="addNewItemModal_wrapper"
      ref={backgroundRef}
      onClick={closeModalHandle}
    >
      <div className="addNewItemModal">
        <h2>Buy New Item</h2>
        {supplier.name !== "" ? (
          <div className="supplierInput_wrapper">
            <label>Supplier</label>
            <input type="text" value={supplier.name} disabled />
            <div
              className="supplierInput_remvoeIconWrapper"
              onClick={unSelectSupplierHandle}
            >
              <ImCross className="supplierInput_remvoeIcon" />
            </div>
          </div>
        ) : (
          <div className="supplier_wrapper">
            <div className="suppiler_searchBarWrapper">
              <div className="search_wrapper">
                <BsSearch className="supplier_searchIcon" />
                <input
                  disabled={loading}
                  type="text"
                  alt="supplierInput"
                  placeholder="Search Supplier.."
                  value={supplierSearchInput}
                  onChange={(e) => setSupplierSearchInput(e.target.value)}
                />
              </div>
              <button onClick={addNewSupplierBtnHandle} disabled={loading}>
                Add New Suppiler
              </button>
            </div>
            <div className="suppliers">
              {filterSupplierHandle().map((sup) => (
                <div
                  key={sup.id}
                  className="supplier"
                  onClick={() => selectSupplierHandle(sup.name, sup.id)}
                >
                  <p>{sup.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="input_wrapper">
          {Object.keys(itemValues).map((item, index) => (
            <div className="item_input" key={index}>
              <label>{item}</label>
              <input
                disabled={loading}
                type={
                  ["Qty", "Sale Price", "Buy Price"].some(
                    (element) => element === item
                  )
                    ? "number"
                    : "text"
                }
                value={itemValues[item]}
                onChange={(e) => onChangeHandle(e, item)}
              />
            </div>
          ))}
          <div className="inputImage_wrapper">
            <label>Image</label>
            <div className="image_wrapper">
              <div className="addImage_iconWrapper" disabled={loading}>
                <BiImageAdd
                  className="addImage_icon"
                  onClick={openImageSelectHandle}
                />
              </div>
              <img
                className="fileImage"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                }
                alt="itemImage"
              />
              <input
                disabled={loading}
                type="file"
                style={{ display: "none" }}
                ref={addImageRef}
                onChange={addImageHandle}
              />
            </div>
          </div>
          <label>Refundable</label>
          <div className="radioButtons_wrapper">
            <div className="radioButton_wrapper">
              <input
                disabled={loading}
                type="radio"
                checked={radioState.yes}
                onChange={() => {
                  setRefundable(true);
                  setRadioState({ yes: true, no: false });
                }}
              />
              <p>Yes</p>
            </div>
            <div className="radioButton_wrapper">
              <input
                disabled={loading}
                type="radio"
                value="No"
                checked={radioState.no}
                onChange={() => {
                  setRefundable(false);
                  setRadioState({ yes: false, no: true });
                }}
              />
              <p>No</p>
            </div>
          </div>
        </div>
        <button
          className="buyItem_btn"
          onClick={buyNewItemHandle}
          disabled={loading}
        >
          {loading ? "Loading" : "Buy item"}
        </button>
      </div>
    </div>
  );
}

export default AddNewItemModal;
