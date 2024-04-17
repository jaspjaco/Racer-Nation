
const express = require("express");
const Pool = require('pg').Pool
const app = express();
const path= require("path");
const bodyParser = require("body-parser");
app.use(express.static('public'))

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'Racer Nation',
   password: 'McDonagh272820',
   port: 5432,
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
   next();
 })

// Endpoint to get the product price
app.get('/price', (req, res) => {
 // Simulate fetching the price from a database or some other data source
 const price = 5.99;

 // Respond with JSON containing the price
 res.json({ price });
});

app.get('/price2', (req, res) => {
   // Simulate fetching the price from a database or some other data source
   const price = 6.99;
  
   // Respond with JSON containing the price
   res.json({ price });
  });

app.post("/api/users/create", (req, res) => {

   const firstname = req.body.firstname;
   const lastname = req.body.lastname;

   const sql = "INSERT INTO users (firstname, lastname) VALUES ($1, $2)";

   const data = [firstname, lastname];

   pool.query(sql, data, (error, results) => {

      if (error) throw error

      res.status(200).json(results.rows)
  });

});

app.post("/api/merch/create", (req, res) => {

   const size = req.body.size;
   const quantity = req.body.quantity;

   const sql = "INSERT INTO merch (size, quantity) VALUES ($1, $2)";

   const data = [size, quantity];

   pool.query(sql, data, (error, results) => {

      if (error) throw error

      res.status(200).json(results.rows)
  });
});

app.get("/api/trackcal", (req, res) => {
   const track = req.query.track;

   // SQL query is based on the selected track
   let sql;
   if (track === 'track1') {
       sql = "SELECT * FROM trackevents1";
    } else if (track === 'track2') {
       sql = "SELECT * FROM trackevents2";
    } else if (track === 'track3') {
        sql = "SELECT * FROM trackevents3";
    } else if (track === 'track4') {
        sql = "SELECT * FROM trackevents4";
    } else {
       // If track parameter is missing or bad, return a 400 Bad Request
       return res.status(400).json({ error: 'Invalid track parameter' });
    }

   
   pool.query(sql, (error, results) => {
       if (error) {
           // If there's an error, throw it
           throw error;
       }
       // If successful, return the results as JSON
       res.status(200).json(results.rows);
   });
});

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/index.html'));
});
app.get("/index.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/index.html'));
});
app.get("/news.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/news.html'));
});
app.get("/gallery.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/gallery.html'));
});
app.get("/users.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/users.html'));
});
app.get("/events.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/events.html'));
});
app.get("/merch.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/merch.html'));
});
app.get("/contact.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/contact.html'));
});
app.get("/leaderboard.html", (req, res) => {
   res.sendFile(path.join(__dirname, '/views/leaderboard.html'));
});

app.listen(3000, () => {
   console.log("Listening on port 3000");
});


