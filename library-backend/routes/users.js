const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth");
const { readDB, writeDB } = require("../helpers/db");

// Multer - avatar yuklash uchun
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// GET /api/users/me — o'z profilini ko'rish
router.get("/me", authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const user = db.users.find((u) => u.id === req.user.id);

    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// PUT /api/users/me — profilni yangilash (My account sahifasi)
router.put("/me", authMiddleware, upload.single("avatar"), (req, res) => {
  try {
    const { firstName, lastName, phone, email } = req.body;
    const db = readDB();

    const userIndex = db.users.findIndex((u) => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    // Email boshqa foydalanuvchida bormi tekshirish
    if (email && email !== db.users[userIndex].email) {
      const emailExists = db.users.find((u) => u.email === email && u.id !== req.user.id);
      if (emailExists) {
        return res.status(400).json({ message: "Bu email boshqa foydalanuvchida mavjud" });
      }
    }

    const updatedUser = {
      ...db.users[userIndex],
      firstName: firstName || db.users[userIndex].firstName,
      lastName: lastName || db.users[userIndex].lastName,
      phone: phone || db.users[userIndex].phone,
      email: email || db.users[userIndex].email,
    };

    // Agar avatar yuklangan bo'lsa
    if (req.file) {
      updatedUser.avatar = `/uploads/${req.file.filename}`;
    }

    db.users[userIndex] = updatedUser;
    writeDB(db);

    const { password: _, ...userWithoutPassword } = updatedUser;
    res.json({ message: "Profil yangilandi", user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// PUT /api/users/me/password — parolni o'zgartirish (Security sahifasi)
router.put("/me/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Barcha parol maydonlari to'ldirilishi shart" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Yangi parol va tasdiqlash paroli mos emas" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Yangi parol kamida 6 ta belgi bo'lishi kerak" });
    }

    const db = readDB();
    const userIndex = db.users.findIndex((u) => u.id === req.user.id);

    if (userIndex === -1) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    const isMatch = await bcrypt.compare(currentPassword, db.users[userIndex].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Joriy parol noto'g'ri" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    db.users[userIndex].password = hashedNewPassword;
    writeDB(db);

    res.json({ message: "Parol muvaffaqiyatli o'zgartirildi" });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

module.exports = router;
