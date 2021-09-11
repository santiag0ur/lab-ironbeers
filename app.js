const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(result => {
      res.render('beers', { beers: result });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      // your magic happens here
      res.render('randombeer', { beer: responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beer/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(result => {
      console.log(result);
      res.render('detail', { beer: result });
    })
    .catch(error => console.log(error));
  // res.send(req.params);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

/*
 
*/
