import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../APIServices/NotificationAPI";
import "./noti.scss";

function Noti({ noti, setOpenNoti, setNotificatoins }) {
  const navigate = useNavigate();
  async function notiAndNavigateHandle() {
    const changedResult = await NotificationService.UpdatetNotifications(
      noti.id
    );
    if (noti.cusomter_id !== null) {
      navigate(`/tables/customersTable/${noti.customer_id}`);
      setOpenNoti(false);
      setNotificatoins((prev) =>
        prev.map((res) => (res.id !== changedResult.id ? res : changedResult))
      );
      return;
    }
    if (noti.item_id) {
      navigate(`/tables/itemsTable`);
      setOpenNoti(false);
      return;
    }
  }
  return (
    <div
      className={noti.seen ? "notiRow_wrapper active" : "notiRow_wrapper"}
      onClick={notiAndNavigateHandle}
    >
      <p>{noti.description}</p>
    </div>
  );
}

export default Noti;
