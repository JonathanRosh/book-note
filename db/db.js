import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book_notes",
  password: "rtarta123",
  port: 5432,
});

db.connect();

export default db;
