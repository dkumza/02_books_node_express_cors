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

// get all books
app.get("/api/books", (req, res) => {
   res.status(200).json(books);
});

//get 1 book by ID
app.get("/api/books/:title", (req, res) => {
   console.log(req.params.title);
   const bookTitle = req.params.title;
   const found = books.find((book) => bookTitle === book.title);
   if (found) res.status(200).json(found);
   if (!found)
      res.status(404).json({
         msg: `book with title - ${bookTitle} not found`,
      });
});

//delete 1 book by title

//create 1 book by ID

// edit 1 book by ID

app.listen(port, () => {
   console.log(`server is running http://localhost:${port}`);
});
