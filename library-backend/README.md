# 📚 Library Backend API

Node.js + Express + JSON file asosidagi kutubxona backend'i.

## 🚀 Ishga tushirish

```bash
npm install
npm run dev     # development
npm start       # production
```

Server: `http://localhost:3000`

---

## 📁 Fayl strukturasi

```
library-backend/
├── server.js          # Asosiy server fayli
├── db.json            # JSON "database"
├── package.json
├── routes/
│   ├── auth.js        # Ro'yxatdan o'tish / kirish
│   ├── users.js       # Profil boshqaruvi
│   ├── books.js       # Kitoblar CRUD
│   └── authors.js     # Mualliflar CRUD
├── middleware/
│   └── auth.js        # JWT tekshirish
├── helpers/
│   └── db.js          # JSON o'qish/yozish
└── uploads/           # Yuklangan rasmlar
```

---

## 🔐 AUTH ENDPOINTLAR

### POST `/api/auth/register` — Ro'yxatdan o'tish
**Body:**
```json
{
  "firstName": "Ali",
  "lastName": "Valiyev",
  "phone": "+998901234567",
  "email": "ali@mail.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "message": "Muvaffaqiyatli ro'yxatdan o'tdingiz",
  "token": "eyJ...",
  "user": { "id": "...", "firstName": "Ali", ... }
}
```

---

### POST `/api/auth/login` — Kirish
**Body:**
```json
{
  "email": "ali@mail.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "message": "Muvaffaqiyatli kirdingiz",
  "token": "eyJ...",
  "user": { ... }
}
```

---

## 👤 USER ENDPOINTLAR
> Barcha user endpointlar uchun `Authorization: Bearer <token>` header kerak

### GET `/api/users/me` — Profilni ko'rish

### PUT `/api/users/me` — Profilni yangilash (My account sahifasi)
**Body (form-data):**
| Key | Type |
|-----|------|
| firstName | text |
| lastName | text |
| phone | text |
| email | text |
| avatar | file (ixtiyoriy) |

### PUT `/api/users/me/password` — Parol o'zgartirish (Security sahifasi)
**Body:**
```json
{
  "currentPassword": "123456",
  "newPassword": "newpass123",
  "confirmPassword": "newpass123"
}
```

---

## 📖 BOOKS ENDPOINTLAR

### GET `/api/books` — Barcha kitoblar (token shart emas)
### GET `/api/books/:id` — Bitta kitob (token shart emas)

### POST `/api/books` — Kitob qo'shish 🔒
**Body (form-data):**
| Key | Type |
|-----|------|
| title | text ✅ majburiy |
| pages | text |
| year | text |
| price | text |
| country | text |
| author | text ✅ majburiy |
| description | text |
| cover | file (ixtiyoriy) |

### PUT `/api/books/:id` — Kitobni yangilash 🔒
**Body:** (POST bilan bir xil, barchasi ixtiyoriy)

### DELETE `/api/books/:id` — Kitobni o'chirish 🔒

---

## ✍️ AUTHORS ENDPOINTLAR

### GET `/api/authors` — Barcha mualliflar (token shart emas)
### GET `/api/authors/:id` — Bitta muallif (token shart emas)

### POST `/api/authors` — Muallif qo'shish 🔒
**Body (form-data):**
| Key | Type |
|-----|------|
| firstName | text ✅ majburiy |
| lastName | text ✅ majburiy |
| dateOfBirth | text |
| dateOfDeath | text |
| country | text |
| bio | text |
| image | file (ixtiyoriy) |

### PUT `/api/authors/:id` — Muallifni yangilash 🔒
### DELETE `/api/authors/:id` — Muallifni o'chirish 🔒

---

## 🖼️ Rasmlarni ko'rish

Yuklangan rasmlar `uploads/` papkasida saqlanadi.
Rasm URL: `http://localhost:3000/uploads/fayl_nomi.jpg`

---

## 🔒 Token ishlatish

Login/Register dan olingan token'ni har so'rovga qo'shing:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
