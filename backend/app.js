const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./model/post");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://DBadmin:dechu3-cisfyw-hokJud@cluster0.ghst3.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected the database");
  })
  .catch((error) => {
    console.log("Connection failed!" + error);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post sikeres hozzáadva",
      postId: createdPost._id,
    });
  });
  console.log(post);
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Post sikeresen letöltve!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post sikeresen törölve!",
    });
  });
});

module.exports = app;
