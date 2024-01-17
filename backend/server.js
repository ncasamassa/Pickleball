const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");

const objectId = mongodb.ObjectId;

const server = express();

server.use(cors());

const DB_URL =
  "mongodb+srv://nickabodcrane:dA1mYPtsZMJiDODt@cluster0.pu1nad0.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "MERN";

MongoClient.connect(DB_URL).then((client) => {
  console.log("connected to database");

  const db = client.db(DB_NAME);
  const mernBlogCollection = db.collection("mern-blog");

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.get("/api/get-all-blogs", (req, res) => {
    mernBlogCollection
      .find()
      .toArray()
      .then((result) => {
        res.send(result);
      });
  });

  server.post("/api/create-blog", (req, res) => {
    mernBlogCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  server.delete("/api/delete/:id", (req, res) => {
    let id = req.params.id;
    console.log("Delete request received");

    console.log("ID:", id);

    mernBlogCollection.deleteOne({ _id: new objectId(id) }).then((result) => {
      res.send(result);
    });
  });

  server.post("/api/update/:id", (req, res) => {
    let id = req.params.id;
    let updatedTitle = req.body.title;

    mernBlogCollection
      .updateOne(
        { _id: new objectId(id) },
        { $set: { title: updatedTitle } },
        { returnDocument: "after" }
      )
      .then((updatedBlog) => {
        res.send(updatedBlog);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        res.status(500).send("Internal Server Error");
      });
  });

  const PORT = 3003;
  server.listen(PORT, () => {
    console.log("listening...");
  });
});