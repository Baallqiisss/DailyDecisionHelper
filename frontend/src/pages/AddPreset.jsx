import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddPreset() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    mood: "",
    time: "",
    budget: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/presets", form);
      // set a one-time toast for dashboard to read
      try { localStorage.setItem("toast", JSON.stringify({ message: "Preset berhasil dibuat", type: "success" })); } catch {}
      nav("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Gagal menambah preset";
      alert(msg);
    }
  };

  return (
    <div className="container">
      <h2>✨ Tambah Preset Keputusan</h2>

      <form onSubmit={submit} className="card-form">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={onChange}
          required
        />

        <input
          type="text"
          name="mood"
          placeholder="Mood (happy, tired, dll)"
          value={form.mood}
          onChange={onChange}
          required
        />

        <input
          type="text"
          name="time"
          placeholder="Waktu (cepat, santai, lama)"
          value={form.time}
          onChange={onChange}
          required
        />

        <input
          type="text"
          name="budget"
          placeholder="Budget (hemat, sedang, bebas)"
          value={form.budget}
          onChange={onChange}
          required
        />

        <button type="submit" className="btn-primary">
          Simpan Preset
        </button>
      </form>

      <p className="back-link" onClick={() => nav("/dashboard")}>
        ← Kembali
      </p>
    </div>
  );
}
