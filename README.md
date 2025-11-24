# DailyDecisionHelper

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
