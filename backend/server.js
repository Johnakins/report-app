// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

var cors = require('cors')
var app = express()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongodb')
}).catch((err) => {
    console.log(err)
});

const incidentSchema = new mongoose.Schema({
  type: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  imageUrl: String},
  { timestamps: true });

const Incident = mongoose.model('Incident', incidentSchema);

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post('/incidents', (req, res) => {
  const incident = new Incident(req.body);
  incident.save()
    .then(result => res.status(201).send(result))
    .catch(error => res.status(400).send(error));
});

app.get('/incidents', async (req, res) => {
  const { category } = req.query;
  try {
    let incidents;
    if (category) {
      incidents = await Incident.find({ type: category }).sort({ createdAt: -1 });
    } else {
      incidents = await Incident.find().sort({ createdAt: -1 });
    }
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
