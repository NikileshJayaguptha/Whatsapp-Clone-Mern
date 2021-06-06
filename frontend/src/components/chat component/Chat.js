import React, { useState } from "react";
import "./chat.css";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "axios";
function Chat({ messages }) {
  const [msg, setmsg] = useState("");
  const msgupload = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/Messages/new", {
      message: msg,
      name: "Nikilesh",
      timestamp: new Date().toUTCString(),
      receiver: true,
    });
    setmsg("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar className="avpic" />
        <div className="chat__header_info">
          <p>Name</p>
          <p1>Last seen....</p1>
        </div>
        <div className="chat__icons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((messages) => (
          <p className={`chat__message ${messages.receiver && "receiver"}`}>
            <div className="chat__name">{messages.name}</div>
            {messages.message}
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={msg}
            onChange={(e) => {
              setmsg(e.target.value);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={msgupload} type="submit">
            send message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
