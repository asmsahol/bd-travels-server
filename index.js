/** @format */

const express = require("express");
const { MongoClient, Collection } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
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
