const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, "../frontend")));
console.log("Serving static files from:", path.join(__dirname, '../frontend'));


const BLOBS_DIR = path.join(__dirname, "data");
if (!fs.existsSync(BLOBS_DIR)) {
  fs.mkdirSync(BLOBS_DIR);
}


function getBlobPath(id) {
  return path.join(BLOBS_DIR, `${id}.json`);
}


app.post("/api/jsonBlob", (req, res) => {
  const id = uuidv4();
  const filePath = getBlobPath(id);
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
  res.status(201).location(`/api/jsonBlob/${id}`).json({ id });
});


app.get("/api/jsonBlob/:id", (req, res) => {
  const filePath = getBlobPath(req.params.id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Not found");
  }
  const data = fs.readFileSync(filePath, "utf-8");
  res.status(200).json(JSON.parse(data));
});


app.put("/api/jsonBlob/:id", (req, res) => {
  const filePath = getBlobPath(req.params.id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Not found");
  }
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
  res.status(200).send("Updated");
});


app.delete("/api/jsonBlob/:id", (req, res) => {
  const filePath = getBlobPath(req.params.id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Not found");
  }
  fs.unlinkSync(filePath);
  res.status(204).send();
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

