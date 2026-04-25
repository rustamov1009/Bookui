const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth");
const { readDB, writeDB } = require("../helpers/db");

// Multer - kitob muqovasi yuklash uchun
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `book_cover_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// GET /api/books — barcha kitoblar
router.get("/", (req, res) => {
  try {
    const db = readDB();
    res.json(db.books);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// GET /api/books/:id — bitta kitob
router.get("/:id", (req, res) => {
  try {
    const db = readDB();
    const book = db.books.find((b) => b.id === req.params.id);

    if (!book) return res.status(404).json({ message: "Kitob topilmadi" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// POST /api/books — yangi kitob qo'shish
router.post("/", authMiddleware, upload.single("cover"), (req, res) => {
  try {
    const { title, pages, year, price, country, author, description } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Kitob nomi va muallif majburiy" });
    }

    const db = readDB();

    const newBook = {
      id: Date.now().toString(),
      title,
      pages: pages ? parseInt(pages) : null,
      year: year ? parseInt(year) : null,
      price: price ? parseFloat(price) : null,
      country: country || "",
      author,
      description: description || "",
      cover: req.file ? `/uploads/${req.file.filename}` : "",
      createdAt: new Date().toISOString(),
    };

    db.books.push(newBook);
    writeDB(db);

    res.status(201).json({ message: "Kitob muvaffaqiyatli qo'shildi", book: newBook });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// PUT /api/books/:id — kitobni yangilash
router.put("/:id", authMiddleware, upload.single("cover"), (req, res) => {
  try {
    const { title, pages, year, price, country, author, description } = req.body;
    const db = readDB();

    const bookIndex = db.books.findIndex((b) => b.id === req.params.id);
    if (bookIndex === -1) return res.status(404).json({ message: "Kitob topilmadi" });

    const updatedBook = {
      ...db.books[bookIndex],
      title: title || db.books[bookIndex].title,
      pages: pages ? parseInt(pages) : db.books[bookIndex].pages,
      year: year ? parseInt(year) : db.books[bookIndex].year,
      price: price ? parseFloat(price) : db.books[bookIndex].price,
      country: country || db.books[bookIndex].country,
      author: author || db.books[bookIndex].author,
      description: description || db.books[bookIndex].description,
    };

    if (req.file) {
      updatedBook.cover = `/uploads/${req.file.filename}`;
    }

    db.books[bookIndex] = updatedBook;
    writeDB(db);

    res.json({ message: "Kitob yangilandi", book: updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

// DELETE /api/books/:id — kitobni o'chirish
router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const db = readDB();
    const bookIndex = db.books.findIndex((b) => b.id === req.params.id);

    if (bookIndex === -1) return res.status(404).json({ message: "Kitob topilmadi" });

    db.books.splice(bookIndex, 1);
    writeDB(db);

    res.json({ message: "Kitob o'chirildi" });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
});

module.exports = router;
