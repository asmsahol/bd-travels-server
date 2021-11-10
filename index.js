/** @format */

const express = require("express");
const { MongoClient, Collection } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.apmnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("bd_travel");
    const servicesCollection = database.collection("services");
    const moreCollection = database.collection("more");
    const recentCollection = database.collection("recent");
    const travelsWayCollection = database.collection("travels_way");
    const sliderCollection = database.collection("slider");
    const bookingCollection = database.collection("booking");

    // Post Products API
    app.post("/services", async (req, res) => {
      const result = await servicesCollection.insertOne(req.body);
      res.send(result);
    });

    app.post("/booking", async (req, res) => {
      const result = await bookingCollection.insertOne(req.body);
      res.send(result);
    });

    // Get Products API
    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/more", async (req, res) => {
      const cursor = moreCollection.find({});
      const more = await cursor.toArray();
      res.send(more);
    });
    app.get("/recent", async (req, res) => {
      const cursor = recentCollection.find({});
      const recent = await cursor.toArray();
      res.send(recent);
    });
    app.get("/travels_way", async (req, res) => {
      const cursor = travelsWayCollection.find({});
      const travels_way = await cursor.toArray();
      res.send(travels_way);
    });
    app.get("/slider", async (req, res) => {
      const cursor = sliderCollection.find({});
      const slider = await cursor.toArray();
      res.send(slider);
    });
    app.get("/booking", async (req, res) => {
      const cursor = bookingCollection.find({});
      const booking = await cursor.toArray();
      res.send(booking);
    });

    // Get Single Booking
    app.get("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const order = await bookingCollection.findOne(query);
      res.send(order);
    });
    // Delete API
    app.delete("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The server in running.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
