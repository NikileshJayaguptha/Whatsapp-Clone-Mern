//!imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = process.env.port || 9000;
import Message from "./models/whatsappmessages.js";
import Pusher from "pusher";
import config from "dotenv/config.js";

const pusher = new Pusher({
  appId: "1193505",
  key: "05c1964e03f7097f767b",
  secret: "7e1ca6a4adb14cc9070e",
  cluster: "ap2",
  useTLS: true,
});

//!middlewares
app.use(cors());
app.use(express.json());
//!dbconfig
const DB = process.env.DBCONNECTION;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgcollection = db.collection("messages");

  const changeStream = msgcollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const msgdtls = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: msgdtls.name,
        message: msgdtls.message,

        receiver: msgdtls.receiver,
      });
    } else {
      console.log("error occured");
    }
  });
});

//!api routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/Messages/all", (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/Messages/new", (req, res) => {
  const newMessage = req.body;
  Message.create(newMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//!listen
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
