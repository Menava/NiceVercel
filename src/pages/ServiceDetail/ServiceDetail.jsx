import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceRelatedItem from "../../components/serviceRelatedItem/ServiceRelatedItem";
import "./serviceDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../redux/addedServicesSlice";
import { getItems, getServiceDetail } from "../../redux/Apicall";
import { BsSearch } from "react-icons/bs";

function ServiceDetail() {
  const { serviceId } = useParams();
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { addedServices } = useSelector((state) => state.addedService);
  const { service } = useSelector((state) => state.serviceDetail);
  const { items } = useSelector((state) => state.modalsAndData);
  const { makeService } = useSelector((state) => state.inputedService);
  const { socket } = useSelector((state) => state.socket);

  const navigate = useNavigate();

  useEffect(() => {
    getItems(dispatch);
  }, []);

  useEffect(() => {
    function fetchServiceDetail() {
      getServiceDetail(dispatch, serviceId);
    }
    fetchServiceDetail();
  }, [serviceId]);

  function handleAddToServiceList() {
    // handling already added service or not
    const index = addedServices.findIndex(
      (addedService) => addedService.id === service.id
    );
    if (index === -1) {
      const SERVICE = {
        id: service.id,
        serviceName: service.service_type,
        serviceFee: service.service_price,
        items: [],
        subtotals: service.service_price,
      };
      dispatch(addService(SERVICE));
    } else {
      alert("You can't add same service more than once");
    }
  }

  function handleSearchFunc() {
    return items.filter(
      (item) =>
        item.name.includes(searchInput) ||
        item.name.toLocaleLowerCase().includes(searchInput)
    );
  }

  return (
    <div className="serviceDetail_wrapper">
      <h2>Service Detail</h2>
      <div className="service_wrapper">
        <div className="service_left">
          {service?.service_imageName && (
            <img
              src={`https://drive.google.com/uc?export=view&id=${service?.service_imagePath}`}
              alt="No image"
            />
          )}
        </div>
        <div className="service_right">
          <h3 className="service_detail_header">
            {service?.service_type}: {service?.service_price}MMK
          </h3>
          <p className="service_detail">{service?.service_detail}</p>
          <button onClick={handleAddToServiceList}>Add To service List</button>
        </div>
      </div>
      <div className="relatedItems_wrapper">
        <div className="relatedItems_header_wrapper">
          <h2>Related Items</h2>
          <div className="table_searchInput">
            <BsSearch className="table_searchInputIcon" />
            <input
              type="text"
              placeholder="Search Item..."
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="serviceRelatedItem_wrapper">
          {handleSearchFunc().map((item) => (
            <ServiceRelatedItem
              key={item.id}
              id={item.id}
              serviceId={service.id}
              imageName={item.item_imagePath}
              itemName={item.name}
              itemPrice={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
