import { Button } from "@mui/material"
import './ChatButton.css';
import { MessageCircle } from "lucide-react"

export function ChatButton({ onClick, isAuthenticated }) {
  return (
    <Button className="chat-button" onClick={onClick} aria-label="Open chat">
      <MessageCircle className="icon" />
    </Button>
  )
}