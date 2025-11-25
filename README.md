# Daily Decision Helper

## 📌 Judul Proyek & Deskripsi Singkat

**Daily Decision Helper** adalah aplikasi web yang membantu pengguna mengambil keputusan kecil sehari-hari dengan cepat dan praktis, seperti menentukan mau makan apa, aktivitas apa yang dikerjakan lebih dulu, atau memilih outfit harian. Aplikasi ini dirancang untuk mengurangi kebingungan dan overthinking dalam pengambilan keputusan sederhana.


## ❗ Masalah yang Diselesaikan (Problem Statement)

Banyak orang mengalami kesulitan dalam membuat keputusan kecil yang sebenarnya bersifat sepele, namun sering memakan waktu dan energi mental, seperti:

* Bingung menentukan pilihan makanan
* Ragu memilih outfit atau aktivitas harian

Kondisi ini dapat menyebabkan penundaan (prokrastinasi), stres ringan, dan menurunnya produktivitas.

## ✅ Solusi yang Dibuat (Solution Overview)

Daily Decision Helper menyediakan solusi berupa aplikasi yang memungkinkan pengguna:

* Memasukkan beberapa pilihan keputusan
* Menggunakan sistem random picker untuk memilih secara otomatis
* Mendapat rekomendasi keputusan secara cepat dan objektif

Dengan pendekatan ini, pengguna dapat menghemat waktu dan fokus pada aktivitas utama tanpa terlalu lama mempertimbangkan pilihan sederhana.

## 🛠️ Tech Stack & Fitur Utama

### Tech Stack:

* Frontend: React.js
* Backend: Node.js & Express.js
* Database: MongoDB
* Authentication: JWT & Bcrypt
* Styling: CSS 

### Fitur Utama:

* ✅ Random Decision Generator
* ✅ Input pilihan keputusan custom
* ✅ Sistem Login & Register
* ✅ Penyimpanan riwayat keputusan
* ✅ Dashboard pengguna
* ✅ Responsive design

## 🚀 Cara Menjalankan Project (Setup Instructions)

### 1. Clone Repository

```bash
git clone https://github.com/username/daily-decision-helper.git
cd daily-decision-helper
```

### 2. Install Dependencies Backend

```bash
cd backend
npm install
```

### 3. Install Dependencies Frontend

```bash
cd ../frontend
npm install
```

### 4. Konfigurasi Environment

Buat file `.env` di folder backend:

```
MONGO_URI=mongodb://127.0.0.1:27017/daily_decision
JWT_SECRET=your_secret_key
PORT=5000
```

### 5. Jalankan Backend

```bash
cd backend
npm start
```

### 6. Jalankan Frontend

```bash
cd frontend
npm start
```

Akses aplikasi di browser melalui:

```
http://localhost:3000
```

## 👤 Target Pengguna

* Mahasiswa
* Pekerja
* Siapapun yang sering bingung mengambil keputusan kecil

✨ Daily Decision Helper hadir untuk membuat keputusan kecil menjadi lebih mudah dan menyenangkan!

## DOKUMENTASI 

1. Authentication
- Register dan Login user (JWT).
<img width="1442" height="824" alt="image" src="https://github.com/user-attachments/assets/1a688c5f-7778-40a0-9629-24ef000e5753" />
<img width="1442" height="863" alt="image" src="https://github.com/user-attachments/assets/f8f45266-5254-46a2-9037-19d20fb64a2c" />  

- Password di-hash (bcrypt).
<img width="750" height="553" alt="image" src="https://github.com/user-attachments/assets/795c51f5-319c-4841-aa8e-53f67584f238" />  

- Simpan token di localStorage / session.
<img width="1919" height="1095" alt="Screenshot 2025-11-25 210431" src="https://github.com/user-attachments/assets/e7e53107-d499-4b6a-9213-a6182d8c64d6" />

3. CRUD Data Utama
- Minimal 1 entitas utama (contoh: Task, Product, Report, Event, Book, dll).
- Fitur: Create, Read, Update, Delete.
- CREATE
  <img width="1438" height="904" alt="Screenshot 2025-11-25 210237" src="https://github.com/user-attachments/assets/c938c630-52a4-4a16-af76-b633a7ae520c" />
- READ
  <img width="1443" height="972" alt="image" src="https://github.com/user-attachments/assets/c8a5f112-5537-4e56-8f17-5f4c9789aa64" />
  
- UPDATE
  (Before)  
  <img width="441" height="235" alt="Screenshot 2025-11-25 213020" src="https://github.com/user-attachments/assets/a10e1a90-6633-4d9a-ae1e-083f91574043" />

  (After)  
  <img width="1343" height="763" alt="image" src="https://github.com/user-attachments/assets/e313d7b1-795b-4c0f-807b-a61c1dc0c340" />

- DELETE
  <img width="1374" height="637" alt="image" src="https://github.com/user-attachments/assets/a10b90a1-9450-4671-aeba-a19af7e099cd" />

- Data tersimpan di MongoDB.
<img width="734" height="738" alt="image" src="https://github.com/user-attachments/assets/b7d3f2f2-9953-49da-8559-4923e4371cf2" />  
  
```
mongosh
use dailydecision
show collections
db.presets.find().pretty()
```


5. Upload File / Gambar
- Upload file (foto, dokumen, dsb) dari frontend ke backend.

<img width="1837" height="1032" alt="Screenshot 2025-11-25 202316" src="https://github.com/user-attachments/assets/8857fba6-00fe-4fe8-911d-4192163b17bf" />

<img width="1858" height="955" alt="image" src="https://github.com/user-attachments/assets/0602648c-8f38-45aa-8a4a-12b329845dd4" />

Tampilkan hasil upload di UI.
- Tampilkan hasil upload di UI.
   <img width="1834" height="1050" alt="Screenshot 2025-11-25 202338" src="https://github.com/user-attachments/assets/1e66a482-5aec-4504-9f04-ef6ed0494d94" />
   
5. Frontend React
   - Minimal 3 halaman:
1. Login/Register
<img width="1860" height="1045" alt="Screenshot 2025-11-25 191715" src="https://github.com/user-attachments/assets/2677402d-8c4a-40eb-9fe9-43dd5853e2ac" />
<img width="1847" height="1042" alt="Screenshot 2025-11-25 191651" src="https://github.com/user-attachments/assets/d988c581-1389-496a-b3b2-41fe3f9b437a" />

3. Dashboard/List Data
<img width="1840" height="1051" alt="Screenshot 2025-11-25 191758" src="https://github.com/user-attachments/assets/ce164c36-561b-4bd5-a608-7e4960e4e5d6" />

5. Form Tambah/Edit / Detail Data
<img width="1851" height="1053" alt="image" src="https://github.com/user-attachments/assets/50cbb9a1-f087-428a-bc52-34535a8e6454" />

- Gunakan React Router & Axios/Fetch untuk API.
<img width="1541" height="784" alt="image" src="https://github.com/user-attachments/assets/e22c2c0c-11f2-49d7-89bb-df6b9411512b" />

- Responsif (mobile & desktop).
<img width="996" height="1144" alt="image" src="https://github.com/user-attachments/assets/3e879819-5608-4268-a380-9c0c67ea7c22" />
<img width="1919" height="1135" alt="image" src="https://github.com/user-attachments/assets/3826454f-99b7-459c-9790-59799d7a015f" />

