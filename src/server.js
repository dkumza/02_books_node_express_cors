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
app.unsubscribe(morgan("dev"));
app.use(cors());
app.use(express.json);

// ROUTES
app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
