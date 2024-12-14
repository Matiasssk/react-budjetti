// src/components/CreateUser.js
import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Käsittelee lomakkeen lähetyksen
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lähetetään käyttäjän tiedot backendille
      const response = await axios.post("api/login", {
        username,
        password,
      });

      // Jos käyttäjä luotiin onnistuneesti, näytetään viesti
      setMessage(response.data.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(
        "Virhe käyttäjän luomisessa: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div>
      <h2>Luo uusi käyttäjä</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Käyttäjätunnus:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Salasasna:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Luo käyttäjä</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
