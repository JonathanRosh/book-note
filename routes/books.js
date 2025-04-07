import express from "express";
import axios from "axios";
import db from "../db/db.js";
import { getFormattedDate } from "../utils/utils.js";

const router = express.Router();
const API_URL = "https://openlibrary.org/search.json";

const cache = {};

router.get("/", async (req, res) => {
  const books_read = await db.query("SELECT * FROM books_read ORDER BY id ASC");
  res.render("index.ejs", { books: books_read.rows });
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  await db.query("DELETE FROM books_read WHERE id = $1", [id]);
  res.redirect("/");
});

router.get("/edit", async (req, res) => {
  const { id } = req.query;
  const result = await db.query("SELECT * FROM books_read WHERE id = $1", [id]);
  res.render("edit.ejs", { book: result.rows[0] });
});

router.post("/edit", async (req, res) => {
  const { id, notes, date_read, recommendation_rate } = req.body;
  await db.query(
    "UPDATE books_read SET notes = $1, date_read = $2, recommendation_rate = $3  WHERE id = $4",
    [notes, date_read.split("-").reverse().join("-"), recommendation_rate, id]
  );
  res.redirect("/");
});

router.get("/add", (req, res) => {
  res.render("add.ejs");
});

router.post("/add", async (req, res) => {
  const bookName = req.body.bookName.trim().toLowerCase().split(" ").join("+");
  if (cache[bookName]) {
    return res.render("add.ejs", {
      booksList: cache[bookName],
      placeHolder: bookName,
    });
  }

  try {
    const result = await axios.get(API_URL + `?q=${bookName}`);
    const n = result.data.docs.length <= 10 ? result.data.docs.length : 10;
    const booksList = result.data.docs.slice(0, n);
    cache[bookName] = booksList;
    res.render("add.ejs", { booksList: booksList, placeHolder: bookName });
  } catch (e) {
    console.error("ERROR USING API: " + e.message);
    res.render("add.ejs");
  }
});

router.post("/confirm-add", async (req, res) => {
  const { title, author, cover_url } = req.body;
  const date = getFormattedDate(new Date());
  const existingBook = await db.query(
    "SELECT * FROM books_read WHERE book_name = $1",
    [title]
  );

  if (existingBook.rows.length > 0) {
    return res.render("edit.ejs", { book: existingBook.rows[0] });
  }

  const newBook = await db.query(
    "INSERT INTO books_read (book_name, author, cover_url, date_read) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, author, cover_url, date]
  );
  res.render("edit.ejs", { book: newBook.rows[0] });
});

export default router;
