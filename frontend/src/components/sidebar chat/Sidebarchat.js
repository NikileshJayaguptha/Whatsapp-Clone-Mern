import { Avatar } from "@material-ui/core";
import React from "react";
import "./sidebarchat.css";
function SidebarChat() {
  return (
    <div className="sidebarchat">
      <Avatar />
      <div className="sidebarchat__info">
        <p>Name</p >
        <span>This is the last message</span>
      </div>
    </div>
  );
}

export default SidebarChat;
