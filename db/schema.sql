CREATE TABLE IF NOT EXISTS books_read (
  id SERIAL PRIMARY KEY,
  book_name TEXT NOT NULL,
  author TEXT,
  cover_url TEXT,
  date_read TEXT,
  notes TEXT,
  recommendation_rate SMALLINT
);