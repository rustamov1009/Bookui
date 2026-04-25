const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readDB, writeDB } = require("../helpers/db");

const SECRET = process.env.JWT_SECRET || "library_secret_key";

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, phone_number, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Barcha maydonlar to'ldirilishi shart" });
    }

    const db = readDB();

    const existingUser = db.users.find((u) => u.email === email);
    if (existingUser) {
      res.statusCode = 400;
      res.json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });

      return res.st;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      firstname,
      lastname,
      phone: phone_number || "",
      email,
      password: hashedPassword,
      avatar: "",
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    writeDB(db);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email va parol kiritilishi shart" });
    }

    const db = readDB();
    const user = db.users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({ message: "Email yoki parol noto'g'ri" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email yoki parol noto'g'ri" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Muvaffaqiyatli kirdingiz",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

module.exports = router;
