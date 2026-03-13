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

function show(req, res) {}

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
