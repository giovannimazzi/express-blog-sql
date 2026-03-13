const postsData = require("../data/posts");
const { apiUrl } = require("../config");

const normalizeImagePath = (post) => (post.image = apiUrl + post.image);

postsData.forEach((post) => normalizeImagePath(post));

function index(req, res) {
  /* throw new Error("Errore generato apposta!"); */

  let filteredPosts = postsData;

  if (req.query.tag) {
    filteredPosts = postsData.filter((post) =>
      post.tags.includes(req.query.tag),
    );
  }

  res.json({
    message: "Lista dei post",
    result: filteredPosts,
  });
}

function show(req, res) {
  const post = postsData.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  res.json({
    message: "Dettagli del post " + req.params.id,
    result: post,
  });
}

function store(req, res) {
  const newId = postsData[postsData.length - 1].id + 1;

  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  normalizeImagePath(newPost);

  postsData.push(newPost);
  console.log(postsData);

  res.status(201);
  res.json(newPost);
}

function update(req, res) {
  const post = postsData.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  normalizeImagePath(post);

  console.log(postsData);

  res.json(post);
}

function modify(req, res) {
  const post = postsData.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.image) post.image = req.body.image;
  if (req.body.tags) post.tags = req.body.tags;

  if (req.body.image) normalizeImagePath(post);

  console.log(postsData);

  res.json(post);
}

function destroy(req, res) {
  const post = postsData.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  const index = postsData.indexOf(post);

  index !== -1 && postsData.splice(postsData.indexOf(post), 1);

  console.log(`Lista aggiornata:`);
  console.log(postsData);

  res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
