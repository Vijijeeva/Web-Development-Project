import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [theme, setTheme] = useState("light");
  const [password, setPassword] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Settings updated successfully!");
    // 👉 Here you can call API to update settings in database
  };

  return (
    <div className="settings-container">
      <h1>⚙️ Settings</h1>
      <form onSubmit={handleSave}>
        {/* Profile Info */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Change */}
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Theme Selection */}
        <div className="form-group">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
