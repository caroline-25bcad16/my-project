const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "25bcad16",
    database: "portfolio"
});

db.connect(function(err) {
    if (err) {
        console.log("Database error:", err);
    } else {
        console.log("MySQL Connected...");
    }
});

app.post("/contact", function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], function(err, result) {
        if (err) {
            res.send("Error saving message");
        } else {
            res.send("Message Saved!");
        }
    });
});

app.listen(3000, function() {
    console.log("Server running on http://localhost:3000");
});