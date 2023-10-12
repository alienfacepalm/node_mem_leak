import express from "express";
import open from "open";
import fs from "fs";
const app = express();

const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
