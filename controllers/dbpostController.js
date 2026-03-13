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
  // preparazione query per il post
  const postSql = "SELECT * FROM posts WHERE id = ?";
  // preparazione query per recupero tags
  const tagsSql = `
SELECT T.*
FROM tags T
JOIN post_tag PT ON T.id = PT.tag_id
WHERE PT.post_id = ?
`;
  // Esecuzione prima query per il post
  connection.query(postSql, [id], (err, postResults) => {
    if (err)
      return res.status(500).json({ error: "Database post query failed" });
    if (postResults.length === 0)
      return res.status(404).json({ error: "Post not found" });
    // Recupero post
    const post = postResults[0];
    // Esecuzione seconda query per i tags
    connection.query(tagsSql, [id], (err, tagsResults) => {
      if (err)
        return res.status(500).json({ error: "Database tags query failed" });
      // Aggiunta tags al post
      post.tags = tagsResults;
      res.json(post);
    });
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
