const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.set("view engine", "ejs");

const books = [
  { title: "A", author: "B" },
  { title: "C", author: "D" },
  // ... more books
];

app.get("/books", (req, res) => {
  res.render("books", { books: books });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.redirect("/books");
});

app.listen(3000, () => {
  console.log("listening");
});
