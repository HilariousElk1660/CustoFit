import React from "react";
import { Button } from "@mui/material";
import "./ChatButton.css";
import { MessageCircle } from "lucide-react";
import AI from "../../assets/AI.gif";

export function ChatButton({ onClick, isAuthenticated }) {
  return (
    <Button className="chat-button" onClick={onClick} aria-label="Open chat">
      {/* <MessageCircle className="icon" /> */}
      <img src={AI} alt="AI" className="icon" />
    </Button>
  );
}
