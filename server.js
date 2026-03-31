const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// 🔥 IMPORTANT: show your frontend (index.html)
app.use(express.static(__dirname));


// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "25bcad16",
  database: "portfolio"
});

db.connect(err => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("MySQL connected...");
  }
});


// POST API
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error saving data");
    } else {
      res.send("Message saved successfully!");
    }
  });
});


// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});