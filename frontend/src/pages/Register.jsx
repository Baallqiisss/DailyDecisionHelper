import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      // auto-login after successful registration
      try {
        const loginRes = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        if (loginRes.data && loginRes.data.token) {
          localStorage.setItem("token", loginRes.data.token);
        }
      } catch (loginErr) {
        console.warn("Auto-login failed", loginErr);
      }
      nav("/dashboard");
    } catch {
      alert("Registrasi gagal");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #a18cd1, #fbc2eb)"
    }}>
      <div style={cardStyle}>
        <h2>✨ Daftar Akun Baru</h2>

        <form onSubmit={submit}>
          <input type="text" name="name" placeholder="Nama" onChange={handleChange} style={inputStyle} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} style={inputStyle} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
          <button style={buttonStyle}>Daftar</button>
        </form>

        <p style={{ cursor: "pointer" }} onClick={() => nav("/")}>
          Sudah punya akun? Login
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 30,
  borderRadius: 20,
  width: 360,
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

const inputStyle = {
  width: "100%",
  padding: 12,
  margin: "10px 0",
  borderRadius: 10,
  border: "1px solid #ddd"
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 20,
  background: "linear-gradient(to right, #6a11cb, #2575fc)",
  color: "white",
  fontWeight: "bold",
  border: "none"
};
