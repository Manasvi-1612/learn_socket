import { useEffect, useState } from "react";
import io from "socket.io-client";
import qs from "query-string";

let socket;
const host = "localhost:8000";

export const Chat = () => {
  const [details, setDetails] = useState({
    username: "",
    room: "",
    message: "",
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { username, room } = qs.parse(window.location.search);
    socket = io(host);

    //the 3rd parameter is a callback function that will be executed after the server triggers the join event callback
    socket.emit("join", { username, room }, () => {});
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          type="text"
          value={details.message}
          onChange={(e) => setDetails({ ...details, message: e.target.value })}
        />
      </div>
    </div>
  );
};
