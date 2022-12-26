import Cookies from "js-cookie";
import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function WebsocketTest() {
  const [socketInstance, setSocketInstance] = useState("");
  const [frontendData, setFrontendData] = useState("");
  const [messages, setMessages] = useState([]);
  // const socket = io("http://127.0.0.1:5000");
  // useEffect(() => {
  //   socket.emit("item_event", Cookies.get("items"));

  //   socket.on("receive_items", function (data) {
  //     console.log("sdfsdfsdf", data);
  //   });
  // }, []);

  return <div>WebsocketTest</div>;
}

export default WebsocketTest;
