const connection = require("../data/db");

function index(req, res) {
  // preparazione query
  const sql = "SELECT * FROM posts";
  // esecuzione query
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

function show(req, res) {
  // recupero id da URL
  const id = req.params.id;
  const sql = "SELECT * FROM posts WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });
    res.json(results[0]);
  });
}

function store(req, res) {}

function update(req, res) {}

function modify(req, res) {}

function destroy(req, res) {
  // recupero id da URL
  const { id } = req.params;
  //Eliminazione dell'item
  connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete post" });
    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
