import React, { useRef } from "react";
import "./openAddItemService.scss";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalsAndDataSlice";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import Cookies from "js-cookie";
import { useState } from "react";

function OpenAddItemService() {
  const modalsAndData = useSelector((state) => state.modalsAndData);
  const dispatch = useDispatch();
  const addItemWrapperRef = useRef();
  const [searchItemInput, setSearchItemInput] = useState([]);
  async function addItemServiceStatusHandle(item) {
    await ServicePlaceServiceItemService.AppendItem({
      servicePlace_id: modalsAndData.servicePlaceId,
      service_id: modalsAndData.serviceId,
      item_id: item.id,
      item_name: "None",
      item_price: item.price,
      customer_id: "None",
    });

    await ServicePlaceServiceItemService.GetTestMethod(
      modalsAndData.servicePlaceId
    ).then((resp) => {
      modalsAndData.setServices(resp);
    });

    dispatch(closeModal());
    Cookies.remove("items", { path: "/" });
  }

  function closeAddItemWrapperHandle(e) {
    e.target === addItemWrapperRef.current && dispatch(closeModal());
  }

  function handleItemCheck() {
    const itemsAry = [...modalsAndData.items].filter(
      (item) => item.quantity !== 0 && item.quantity > 0
    );

    const filterdItemAryWihoutCusId = modalsAndData.specificServiceItems
      .filter(
        (servicePlaceItem) => !servicePlaceItem.hasOwnProperty("customer_id")
      )
      .map((servPlcItem) => servPlcItem.id);

    filterdItemAryWihoutCusId.forEach((itemId) => {
      itemsAry.forEach((itemAryId, index) => {
        if (itemAryId.id === itemId) {
          itemsAry.splice(index, 1);
        }
      });
    });
    return itemsAry.filter(
      (itm) =>
        itm.name.includes(searchItemInput) ||
        itm.name.toLocaleUpperCase().includes(searchItemInput) ||
        itm.name.toLocaleLowerCase().includes(searchItemInput)
    );
  }

  return (
    <div
      className="addItemWrapper"
      ref={addItemWrapperRef}
      onClick={closeAddItemWrapperHandle}
    >
      <div className="addItemModal">
        <div className="addItemModal_searchWrapper">
          <BsSearch className="addItemModal_searchIcon" />
          <input
            type="text"
            placeholder="Search Item"
            onChange={(e) => setSearchItemInput(e.target.value)}
          />
        </div>
        {handleItemCheck().map((item) => {
          return (
            <div
              className="addItemModal_itemWrapper"
              key={item.id}
              onClick={() => addItemServiceStatusHandle(item)}
            >
              <div className="addItemModal_ItemLeft">
                <img
                  src={`https://drive.google.com/uc?export=view&id=${item?.item_imageName}`}
                  alt="addItemModalImage"
                />
                <p>{item.name}</p>
              </div>
              <p>( {item.quantity} )</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OpenAddItemService;
