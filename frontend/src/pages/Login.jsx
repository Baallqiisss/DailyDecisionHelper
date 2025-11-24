import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      // save token for authenticated requests
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      nav("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login gagal";
      alert(msg);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ff9a9e, #fad0c4)"
    }}>
      <div style={{
        background: "#fff",
        padding: 30,
        borderRadius: 20,
        width: 360,
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}>
        <h2>🌈 Daily Decision Helper</h2>
        <p>Login ke akunmu</p>

        <form onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <button style={buttonStyle}>Login</button>
        </form>

        <p style={{ cursor: "pointer" }} onClick={() => nav("/register")}>
          Belum punya akun? Daftar
        </p>
      </div>
    </div>
  );
}

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
  border: "none",
  background: "linear-gradient(to right, #ff758c, #ff7eb3)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};
