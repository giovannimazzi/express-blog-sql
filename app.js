const express = require("express");
const app = express();
const { port, apiUrl } = require("./config");
const notFound = require("./middlewares/NotFound");
const errorsHandler = require("./middlewares/ErrorsHandler");

// imports
const postsRouter = require("./routers/posts");

// middlewares
app.use(express.static("public"));
app.use(express.json());

// routers
app.use("/posts", postsRouter);

// middlewares errori
app.use(notFound);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Server listening on ${apiUrl}`);
});
