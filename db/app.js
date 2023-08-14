const express = require("express");
const app = express();
const { getTopics } = require("../controllers/topics.controllers");
const { getEndPoints } = require("../controllers/endpoint.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndPoints);

module.exports = app;
