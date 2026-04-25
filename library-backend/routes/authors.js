const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth");
const { readDB, writeDB } = require("../helpers/db");

// Multer - muallif rasmi yuklash uchun
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `author_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// GET /api/authors — barcha mualliflar
router.get("/", (req, res) => {
  try {
    const db = readDB();
    res.json(db.authors);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// GET /api/authors/:id — bitta muallif
router.get("/:id", (req, res) => {
  try {
    const db = readDB();
    const author = db.authors.find((a) => a.id === req.params.id);

    if (!author) return res.status(404).json({ message: "Muallif topilmadi" });

    res.json(author);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// POST /api/authors — yangi muallif qo'shish
router.post("/", authMiddleware, upload.single("image"), (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, dateOfDeath, country, bio } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "Ism va familiya majburiy" });
    }

    const db = readDB();

    const newAuthor = {
      id: Date.now().toString(),
      firstName,
      lastName,
      dateOfBirth: dateOfBirth || "",
      dateOfDeath: dateOfDeath || "",
      country: country || "",
      bio: bio || "",
      image: req.file ? `/uploads/${req.file.filename}` : "",
      createdAt: new Date().toISOString(),
    };

    db.authors.push(newAuthor);
    writeDB(db);

    res.status(201).json({ message: "Muallif muvaffaqiyatli qo'shildi", author: newAuthor });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// PUT /api/authors/:id — muallifni yangilash
router.put("/:id", authMiddleware, upload.single("image"), (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, dateOfDeath, country, bio } = req.body;
    const db = readDB();

    const authorIndex = db.authors.findIndex((a) => a.id === req.params.id);
    if (authorIndex === -1) return res.status(404).json({ message: "Muallif topilmadi" });

    const updatedAuthor = {
      ...db.authors[authorIndex],
      firstName: firstName || db.authors[authorIndex].firstName,
      lastName: lastName || db.authors[authorIndex].lastName,
      dateOfBirth: dateOfBirth || db.authors[authorIndex].dateOfBirth,
      dateOfDeath: dateOfDeath || db.authors[authorIndex].dateOfDeath,
      country: country || db.authors[authorIndex].country,
      bio: bio || db.authors[authorIndex].bio,
    };

    if (req.file) {
      updatedAuthor.image = `/uploads/${req.file.filename}`;
    }

    db.authors[authorIndex] = updatedAuthor;
    writeDB(db);

    res.json({ message: "Muallif yangilandi", author: updatedAuthor });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// DELETE /api/authors/:id — muallifni o'chirish
router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const authorIndex = db.authors.findIndex((a) => a.id === req.params.id);

    if (authorIndex === -1) return res.status(404).json({ message: "Muallif topilmadi" });

    db.authors.splice(authorIndex, 1);
    writeDB(db);

    res.json({ message: "Muallif o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

module.exports = router;
