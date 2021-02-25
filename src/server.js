const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require("node-fetch");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// --------------------

fetch('https://pokeapi.co/api/v2/pokemon?limit=251')
  .then(response => response.json())
  .then(data => console.log(data));

// --------------------

app.listen(port, () => {
    console.log(`Server is running a port party on: ${port}`);
});
