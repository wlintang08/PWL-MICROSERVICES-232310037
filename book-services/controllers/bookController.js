const db = require("../models");
const Book = db.Book;

// GET ALL
exports.getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json({ success: true, data: books });
};

// GET BY ID
exports.getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({ success: true, data: book });
};

// CREATE
exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

// UPDATE
exports.updateBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Not found" });
  }

  await book.update(req.body);
  res.json(book);
};

// DELETE
exports.deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Not found" });
  }

  await book.destroy();
  res.json({ message: "Deleted" });
};