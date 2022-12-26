import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/addedServicesSlice";
import { decreaseItemQty } from "../../redux/modalsAndDataSlice";
import "./serviceRelatedItem.scss";

function ServiceRelatedItem({
  imageName,
  itemName,
  itemPrice,
  quantity,
  serviceId,
  id,
}) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.modalsAndData);
  const { addedServices } = useSelector((state) => state.addedService);

  async function handleAddItem() {
    const toCheckItemQtyIndex = items.findIndex((item) => item.id === id);
    if (addedServices.length > 0) {
      const checkServiceIsOnList = addedServices.findIndex(
        (service) => service.id === serviceId
      );
      if (checkServiceIsOnList === -1) {
        alert("You have to add service first to add items on that service");
        return;
      }
      if (checkServiceIsOnList !== -1) {
        async function handleSomething() {
          await dispatch(decreaseItemQty({ id }));
        }
        handleSomething();
      }
    }

    dispatch(
      addItems({
        id: serviceId,
        data: { id, name: itemName, price: itemPrice, qty: 1 },
        remainItems: items,
        toCheckItemQtyIndex,
      })
    );
  }

  return (
    <div className="serviceRelatedItem" onClick={handleAddItem}>
      <img
        src={`https://drive.google.com/uc?export=view&id=${imageName}`}
        alt="No image"
      />
      <div className="overlay"></div>
      <div className="serviceRealtedItem_itemDetail">
        <h4>{itemName}</h4>
        <p>Price : {itemPrice}</p>
      </div>
      <div className="serviceRelatedItem_inStock">{quantity}</div>
    </div>
  );
}

export default ServiceRelatedItem;
