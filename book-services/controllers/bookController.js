const db = require("../models");
const Book = db.Book;
const rabbitmq = require("../config/rabbitmq");

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

// CREATE (🔥 SUDAH TERINTEGRASI RABBITMQ)
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    // kirim event ke RabbitMQ
    await rabbitmq.sendToQueue("book_created", {
      event: "book.created",
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
      },
    });

    res.status(201).json({
      success: true,
      message: "Book created",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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