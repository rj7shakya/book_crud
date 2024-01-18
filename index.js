const express = require("express");
const app = express();

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "inspiron",
  port: "5432",
});

client.connect((err) => {
  if (err) {
    console.error("Connection error:", err.stack);
  } else {
    console.log("Connected to PostgreSQL database!");
  }
});

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
  // res.render("books", { books: books });
  client
    .query("SELECT * FROM books")
    .then((resp) => res.render("books", { books: resp.rows }))
    .catch((err) => console.log(err));
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/books", (req, res) => {
  client
    .query(`INSERT INTO books (title, author) VALUES ($1, $2)`, [
      req.body.title,
      req.body.author,
    ])
    .then((resp) => res.redirect("/books"))
    .catch((err) => console.log(err));
  // books.push(req.body);
  // res.redirect("/books");
});

app.listen(3000, () => {
  console.log("listening");
});
