import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./JoinRoom.css";

export const JoinRoom = () => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join Room</h1>
        <div>
          <input
            className="joinInput"
            placeholder="Enter Name"
            type="text"
            onChange={(event) => setUser(event.target.value)}
          />
        </div>
        <div>
          <input
            className="joinInput mt-20"
            placeholder="Enter Room"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!user || !room ? event.preventDefault() : null)}
          to={`/chat?username=${user}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};
