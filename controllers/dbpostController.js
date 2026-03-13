const connection = require("../data/db");
const { apiUrl } = require("../config");

const normalizeImagePath = (post) => (post.image = apiUrl + post.image);

function index(req, res) {}

function show(req, res) {}

function store(req, res) {}

function update(req, res) {}

function modify(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, modify, destroy };
