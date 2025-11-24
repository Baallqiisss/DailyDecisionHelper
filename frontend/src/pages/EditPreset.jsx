import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

export default function EditPreset(){
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', mood: '', time: '', budget: '' });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    const fetchOne = async ()=>{
      try{
        const res = await API.get(`/presets/${id}`);
        if (!mounted) return;
        setForm({ title: res.data.title || '', mood: res.data.mood || '', time: res.data.time || '', budget: res.data.budget || '' });
      }catch(err){
        alert(err?.response?.data?.message || 'Gagal memuat preset');
        nav('/dashboard');
      }finally{ if (mounted) setLoading(false) }
    }
    fetchOne();
    return ()=> mounted = false;
  },[id, nav]);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const onFilesChange = e => setFiles(Array.from(e.target.files || []));

  const submit = async (e) =>{
    e.preventDefault();
    try{
      if (files && files.length){
        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('mood', form.mood);
        fd.append('time', form.time);
        fd.append('budget', form.budget);
        files.forEach(f => fd.append('files', f));
        await API.put(`/presets/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await API.put(`/presets/${id}`, form);
      }
      try { localStorage.setItem("toast", JSON.stringify({ message: "Preset berhasil diperbarui", type: "success" })); } catch {}
      nav('/dashboard');
    }catch(err){
      alert(err?.response?.data?.message || 'Gagal memperbarui preset');
    }
  }

  if (loading) return <div style={{padding:20}}>Memuat...</div>;

  return (
    <div className="container">
      <h2>Edit Preset</h2>
      <form onSubmit={submit}>
        <input name="title" placeholder="Judul" value={form.title} onChange={onChange} required />
        <input name="mood" placeholder="Mood" value={form.mood} onChange={onChange} required />
        <input name="time" placeholder="Waktu" value={form.time} onChange={onChange} required />
        <input name="budget" placeholder="Budget" value={form.budget} onChange={onChange} required />
        <label>Tambah attachment (opsional)</label>
        <input type="file" multiple onChange={onFilesChange} />
        <div style={{ display:'flex', gap:10, marginTop:10 }}>
          <button className="btn-primary" type="submit">Simpan</button>
          <button type="button" onClick={()=>nav('/dashboard')} style={{ background:'#ddd', color:'#333' }}>Batal</button>
        </div>
      </form>
    </div>
  )
}
