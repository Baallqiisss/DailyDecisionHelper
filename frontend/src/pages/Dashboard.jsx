import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

// fetch recommendations for preset id
async function fetchRecommendationsApi(id) {
  const res = await API.get(`/presets/${id}/recommend`);
  return res.data.recommendations;
}

export default function Dashboard() {
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recs, setRecs] = useState({}); // recommendations keyed by preset id
  const [recsLoading, setRecsLoading] = useState({});
  const [toast, setToast] = useState({ message: "", type: "info" });
  const nav = useNavigate();
  const apiBase = API.defaults.baseURL ? API.defaults.baseURL.replace(/\/?api\/?$/, '') : '';
  const getFileUrl = (u) => {
    if (!u) return u;
    if (/^https?:\/\//i.test(u)) return u;
    // ensure leading slash
    const path = u.startsWith('/') ? u : `/${u}`;
    return apiBase + path;
  };

  useEffect(() => {
    let mounted = true;
    const fetchPresets = async () => {
      setLoading(true);
      try {
        const res = await API.get("/presets");
        if (mounted) setPresets(res.data || []);
        // read one-time toast from localStorage (e.g., after creating a preset)
        try {
          const one = localStorage.getItem("toast");
          if (one) {
            const data = JSON.parse(one);
            if (data?.message) setToast({ message: data.message, type: data.type || "info" });
            localStorage.removeItem("toast");
          }
        } catch (e) {
          // ignore
        }
      } catch (err) {
        // if unauthorized, send user to login
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          nav("/");
        } else {
          console.error(err);
          if (mounted) setPresets([]);
          setToast({ message: "Gagal memuat presets", type: "error" });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPresets();
    return () => { mounted = false };
  }, [nav]);

  // fetch and store recommendations for a preset
  const fetchRecommendations = async (id) => {
    if (!id) return;
    // toggle: if recommendations already present, hide them
    if (recs[id]) {
      setRecs(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      return;
    }

    setRecsLoading(prev => ({ ...prev, [id]: true }));
    try {
      const data = await fetchRecommendationsApi(id);
      setRecs(prev => ({ ...prev, [id]: data }));
    } catch (err) {
      const msg = err?.response?.data?.message || "Gagal memuat rekomendasi";
      setToast({ message: msg, type: "error" });
    } finally {
      setRecsLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("Yakin ingin menghapus preset ini?");
    if (!ok) return;
    try {
      await API.delete(`/presets/${id}`);
      // remove from UI
      setPresets(prev => prev.filter(p => (p._id || p.id) !== id));
      // clean recs if any
      setRecs(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setToast({ message: "Preset berhasil dihapus", type: "success" });
    } catch (err) {
      const msg = err?.response?.data?.message || "Gagal menghapus preset";
      setToast({ message: msg, type: "error" });
    }
  };

  return (
    <>
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #74ebd5, #acb6e5)",
      padding: 30
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1>🎯 Dashboard Keputusan</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={secondaryButton} onClick={() => { localStorage.removeItem('token'); nav('/'); }}>
            Logout
          </button>
          <button style={buttonStyle} onClick={() => nav("/add-preset")}>
            + Tambah Preset
          </button>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20,
        marginTop: 20
      }}>
        {presets.length === 0 && !loading && (
          <div className="card" style={{ textAlign: 'center' }}>
            <h3>Belum ada preset</h3>
            <p>Buat preset pertamamu untuk mendapatkan rekomendasi harian.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button style={buttonStyle} onClick={() => nav('/add-preset')}>Buat Preset</button>
            </div>
          </div>
        )}

        {presets.map((p, i) => (
          <div key={p._id || i} style={{
            background: "#fff",
            padding: 15,
            borderRadius: 15,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
          }}>
            <h3>{p.title}</h3>
            <p>Mood: {p.mood}</p>
            <p>Waktu: {p.time}</p>
            <p>Budget: {p.budget}</p>
            {p.attachments && p.attachments.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>Attachments:</strong>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                  {p.attachments.map((a, idx) => (
                    <div key={idx} style={{ maxWidth: 120, textAlign: 'center' }}>
                      {a.mimetype && a.mimetype.startsWith('image') ? (
                        <img src={getFileUrl(a.url)} alt={a.originalname} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                      ) : (
                        <a href={getFileUrl(a.url)} target="_blank" rel="noreferrer">{a.originalname}</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button style={smallButton} onClick={() => fetchRecommendations(p._id)}>
                Rekomendasi
              </button>
              <button style={smallButton} onClick={() => nav(`/edit/${p._id}`)}>
                Edit
              </button>
              <button style={deleteButton} onClick={() => handleDelete(p._id)}>
                Hapus
              </button>
            </div>
            {recsLoading[p._id] && <div style={{ marginTop:10 }}><div className="spinner"/></div>}

            {recs[p._id] && (
              <div className="rec-panel">
                <strong>Food:</strong>
                <ul>
                  {recs[p._id].food.map((f, idx) => <li key={idx}>{f}</li>)}
                </ul>
                <strong>Outfit:</strong>
                <ul>
                  {recs[p._id].outfit.map((o, idx) => <li key={idx}>{o}</li>)}
                </ul>
                <strong>Activity:</strong>
                <ul>
                  {recs[p._id].activity.map((a, idx) => <li key={idx}>{a}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <div className="toast">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "" })} />
    </div>
    </>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: 20,
  border: "none",
  background: "#ff7eb3",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const smallButton = {
  padding: "6px 10px",
  borderRadius: 12,
  border: "none",
  background: "#6a11cb",
  color: "#fff",
  cursor: "pointer",
  fontSize: 12
};

const deleteButton = {
  padding: "6px 10px",
  borderRadius: 12,
  border: "none",
  background: "#ff4d4f",
  color: "#fff",
  cursor: "pointer",
  fontSize: 12
};

const secondaryButton = {
  padding: "8px 12px",
  borderRadius: 12,
  border: "none",
  background: "#ffffffaa",
  color: "#333",
  cursor: "pointer",
  fontSize: 14
};


// We attach fetchRecommendations here to avoid redefining inside render
// placeholder removed (implementation now inside component)
