import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./waitingModal.scss";
import ServicePlaceService from "../../APIServices/ServicePlaceAPI";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalsAndDataSlice";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import ServicePlaceEmployeeService from "../../APIServices/ServicePlaceEmployeeAPI";
import { getWaitingLists } from "../../redux/Apicall";

function WaitingModal() {
  const [serivcePlaces, setServicesPlaces] = useState([]);
  const backgroundRef = useRef();
  const dispatch = useDispatch();
  const { waitingCurrentList } = useSelector((state) => state.modalsAndData);
  useEffect(() => {
    async function fetchFreeServicePlaces() {
      const data = await ServicePlaceService.GetServicePlaces();
      setServicesPlaces(data.filter((res) => res.status === "Free"));
    }

    fetchFreeServicePlaces();
  }, []);

  async function addWaitingListToServicePlace(place) {
    const currentID = waitingCurrentList.id;
    console.log(waitingCurrentList);

    await ServicePlaceServiceItemService.UpdateServicePlaceServiceItemV2(
      currentID,
      place.id
    );
    await ServicePlaceEmployeeService.UpdateServicePlaceEmployeeV2(
      currentID,
      place.id
    );
    await ServicePlaceService.UpdateServicePlaceV2(currentID, place.id);
    await ServicePlaceService.RealDeleteServicePlace(currentID);
    dispatch(closeModal());
    getWaitingLists(dispatch);
  }
  return (
    <div
      className="waitingModal_wrapper"
      ref={backgroundRef}
      onClick={(e) => {
        if (e.target === backgroundRef.current) {
          dispatch(closeModal());
        }
      }}
    >
      <div className="waitingModal_formWrapper">
        <h3>Free Serivce Places</h3>
        {serivcePlaces.map((place, index) => (
          <div
            key={index}
            className="waitingModal_freeServicePlace"
            onClick={() => addWaitingListToServicePlace(place)}
          >
            Serivce Place {place.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaitingModal;
