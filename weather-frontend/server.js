const path = require('path');
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { data: null, error: null, location: '' });
});

app.post('/search', async (req, res) => {
  const location = req.body.location;
  try {
    const response = await axios.get(`http://weather-api:8080/location/${encodeURIComponent(location)}`);
    const data = response.data;
    res.render('index', { data, error: null, location });
  } catch (error) {
    res.render('index', { data: null, error: 'Erreur lors de la récupération des données météo', location });
  }
});

app.listen(3000, () => {
  console.log('Frontend météo sur http://localhost:3000');
});