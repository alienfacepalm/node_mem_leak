const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("public"));

app.get("/data", (req, res) => {
  fs.readFile("stats.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
