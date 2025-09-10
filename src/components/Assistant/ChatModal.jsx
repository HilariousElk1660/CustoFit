import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef, useEffect, useState } from "react";
import "./ChatModal.css";
import { SparklesIcon } from "../../assets/Icons";
import AI2 from "../../assets/AI2.gif";

export function ChatModal({ isOpen, onClose, user, isAuthenticated }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const suggestedQuestions = [
    "What are your most popular products?",
    "Do you have items for women?",
    "How can I track my order?",
    "What is your return policy?",
    "Do you offer international shipping?",
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));
    if (saved) {
      setAvatar(saved.avatar || "");
      setName(saved.name || "");
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("userSettings"));
      if (updated) {
        setAvatar(updated.avatar || "");
        setName(updated.name || "");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: formatTimestamp(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "", isTyping: true },
    ]);

    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          {
            role: "ai",
            content: "CustoFit's AI Response.",
            timestamp: formatTimestamp(),
          },
        ];
      });
    }, 3000);
  };

  const handleSuggestionClick = (text) => setInput(text);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className="chat-modal"
    >
      <DialogTitle className="chat-modal-header">
        CustoFit AI Assistant <SparklesIcon />
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          className="chat-intro-text"
        >
          Ask me anything about our products or your order!
        </Typography>
      </DialogTitle>
      <DialogContent className="chat-modal-content">
        <Box className="chat-messages-box">
          {messages.length === 0 ? (
            <Stack spacing={1} className="chat-suggestions-container">
              <Typography
                variant="body2"
                color="text.secondary"
                id="clear"
                className="chat-suggestion-text"
              >
                Here are some frequently asked questions:
              </Typography>
              {suggestedQuestions.map((q, idx) => (
                <Button
                  key={idx}
                  variant="outlined"
                  onClick={() => handleSuggestionClick(q)}
                  className="chat-suggestion-button"
                >
                  {q}
                </Button>
              ))}
            </Stack>
          ) : (
            messages.map((m, i) => (
              <Box
                key={i}
                className={`chat-message-row ${m.role}`}
                sx={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                {m.role === "ai" && (
                  <Avatar
                    sx={{
                      bgcolor: "white",
                      width: 40,
                      height: 40,
                      textAlign: "center",
                      objectFit: "cover",
                      color: "transparent",
                    }}
                  >
                    <img
                      style={{ height: "100%", filter: "hue-rotate(45deg)" }}
                      src={AI2}
                      alt=""
                    />
                  </Avatar>
                )}

                <Box sx={{ position: "relative", maxWidth: "75%" }}>
                  <Box
                    className={`chat-message-bubble ${m.role}`}
                    sx={{
                      backgroundColor:
                        m.role === "user" ? "#dcf8c6" : "#ffffff",
                      padding: "10px 14px",
                      borderRadius: "18px",
                      borderTopLeftRadius: m.role === "ai" ? 0 : "18px",
                      borderTopRightRadius: m.role === "user" ? 0 : "18px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    {m.isTyping ? (
                      <Box className="typing-indicator">
                        <span
                          className="dot"
                          style={{ backgroundColor: "lightcoral" }}
                        ></span>
                        <span
                          className="dot"
                          style={{ backgroundColor: "lightblue" }}
                        ></span>
                        <span
                          className="dot"
                          style={{ backgroundColor: "lightgreen" }}
                        ></span>
                      </Box>
                    ) : (
                      <>
                        <Typography variant="body2">{m.content}</Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textAlign: m.role === "user" ? "right" : "left",
                            marginTop: "4px",
                            fontSize: "10px",
                            color: "#777",
                          }}
                        >
                          {m.timestamp}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>

                {m.role === "user" && (
                  <Avatar alt={name || "User"} src={avatar || ""} />
                )}
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Divider className="chat-divider" />

        <Box component="form" onSubmit={handleSend} className="chat-input-form">
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            fullWidth
            size="small"
            className="chat-input-field"
          />
          <IconButton type="submit" className="chat-send-button">
            <SendIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
