# 📚 Book Notes App

A simple full-stack web app to keep track of books you've read, take notes, and rate your recommendations.

## 🚀 Features

- Search for books using the Open Library API
- Add books with cover, author, and reading date
- Edit notes and recommendation scores
- Store everything in PostgreSQL
- Clean and minimal UI

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash git clone https://github.com/YOUR_USERNAME/book-notes-app.git cd book-notes-app```

### 2. Install Dependencies

```bash 
npm install
```
### 3. Create PostgreSQL Database
Make sure PostgreSQL is installed and running, then create the database:
```bash
createdb book_notes
```
### 4. Set Up the Database Schema

```bash
psql -U yourUsername -d book_notes -f db/schema.sql
```
Replace yourUsername with your actual PostgreSQL username.

### 5. Configure Environment Variables
Create a .env file in the root directory:

```bash
DB_USER=yourUsername
DB_HOST=localhost
DB_NAME=book_notes
DB_PASSWORD=yourPassword
DB_PORT=5432
```
Don’t forget to replace the values with your actual DB credentials.

### 6. Start the Server
```bash 
node index.js
```
Then open your browser and go to:
http://localhost:3000

## 🧠 Tech Stack
- Node.js + Express
- PostgreSQL
- EJS for templating
- Open Library API
- HTML, CSS (Vanilla)

## 📁 Project Structure
```pgsql
book-notes-app/
├── db/
│   ├── db.js
│   └── schema.sql
├── public/
│   ├── main.css
│   └── styles/
│       ├── header.css
│       ├── footer.css
│       ├── search.css
│       ├── forms.css
│       ├── book-cards.css
│       ├── reset.css
│       └── layout.css
├── views/
│   ├── add.ejs
│   ├── edit.ejs
│   ├── index.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── .env
├── .gitignore
├── package.json
└── server.js
```
## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

