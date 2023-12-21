require("dotenv").config;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

let books = [
   {
      title: "Book 1",
      author: "Author 1",
      isPublished: true,
      year: 2021,
   },
   {
      title: "Book 2",
      author: "Author 2",
      isPublished: false,
      year: 2022,
   },
   {
      title: "Book 3",
      author: "Author 3",
      isPublished: true,
      year: 2023,
   },
   {
      title: "Book 4",
      author: "Author 4",
      isPublished: false,
      year: 2024,
   },
   {
      title: "Book 5",
      author: "Author 5",
      isPublished: true,
      year: 2025,
   },
];

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// ROUTES

app.get("/", (req, res) => {
   res.send("Hello World!");
});

// GET - get all books
app.get("/api/books", (req, res) => {
   res.status(200).json(books);
});

// GET - get 1 book by ID
app.get("/api/books/:title", (req, res) => {
   console.log(req.params.title);
   const bookTitle = req.params.title;
   const found = books.find((book) => bookTitle === book.title);
   if (found) res.status(200).json(found);
   if (!found)
      res.status(404).json({
         msg: `book with title - ${bookTitle} - not found`,
      });
});

// DELETE - delete 1 book by title
app.delete("/api/books/:title", (req, res) => {
   const bookTitle = req.params.title;
   console.log(bookTitle);
   const bookExists = books.find((book) => book.title === bookTitle); // finds book in array
   if (bookExists) {
      books = books.filter((book) => book.title !== bookTitle);
      res.status(200).json(books);
   }
   if (!bookExists)
      res.status(404).json({
         msg: `Delete FAILED. Book with title - ${bookTitle} - not found`,
      });
});

// POST - create 1 book
app.post("/api/books", (req, res) => {
   // mini validation
   if (req.body.title.trim().length === 0) {
      res.status(400).json({
         field: "title",
         error: "Title is required",
      });
      return;
   }
   const newBook = {
      title: req.body.title,
      author: req.body.author,
      isPublished: req.body.isPublished,
      year: req.body.year,
   };
   books.push(newBook);

   res.status(200).json({
      msg: `book with title - ${newBook.title} - was created`,
   });
});
// PUT - edit 1 book by title
app.put("/api/books/:title", (req, res) => {
   const bookTitle = req.params.title;
   console.log(bookTitle);
   const bookExists = books.find((book) => book.title === bookTitle); // for validation, check if title exists before editing
   const foundIdx = books.findIndex((book) => book.title === bookTitle); // finds book by index to edit

   if (bookExists) {
      books[foundIdx] = {
         ...req.body,
      };
      res.status(200).json({
         message: "Book updated successfully",
         books,
      });
   }
   if (!bookExists)
      res.status(404).json({
         msg: `Edit FAILED. Book with title - ${bookTitle} - not found`,
      });
});

app.listen(port, () => {
   console.log(`server is running http://localhost:${port}`);
});
