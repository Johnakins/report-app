// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://johnolawole1:UjIzloHoRTdtTRjx@cluster0.dnxdigs.mongodb.net/report-app?retryWrites=true&w=majority&appName=Cluster0').then(() => {
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
  imageUrl: String,
  timestamp: { type: Date, default: Date.now },
});

const Incident = mongoose.model('Incident', incidentSchema);

app.use(bodyParser.json());

app.post('/incidents', (req, res) => {
  const incident = new Incident(req.body);
  incident.save()
    .then(result => res.status(201).send(result))
    .catch(error => res.status(400).send(error));
});

app.get('/incidents', (req, res) => {
  Incident.find()
    .then(incidents => res.send(incidents))
    .catch(error => res.status(500).send(error));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
