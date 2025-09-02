import { useEffect, useState } from "react";
import React from "react";
import Modal from "../../components/ui/Modal/Modal.jsx";
import "./Settings.css";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));
    if (saved) {
      setName(saved.name || "");
      setEmail(saved.email || "");
      setNotifications(saved.notifications ?? true);
      setTheme(saved.theme || "light");
      setAvatar(saved.avatar || null);
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const settings = {
      name,
      email,
      notifications,
      theme,
      avatar,
    };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    setShowModal(true);
  };

  return (
    <div className={`settings-container ${theme}`}>
      <h1 className="settings-heading">Settings</h1>

      <div className="settings-group">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="settings-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="settings-group">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </div>

      <div className="settings-group">
        <label>Avatar</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        {avatar && (
          <img src={avatar} alt="Avatar Preview" className="avatar-preview" />
        )}
      </div>

      <div className="settings-group">
        <label>Change Password</label>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
      {showModal && (
        <Modal
          message="Settings saved successfully!"
          onClose={() => {
            setShowModal(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
