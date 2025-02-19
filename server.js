const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

const Clothing = require('./models/clothing.js');

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// GET /
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// GET /clothing
app.get('/clothing', async (req, res) => {
  const allClothing = await Clothing.find();
  console.log(allclothing);
  res.render('clothing/index.ejs', { clothing: allclothing });
});

// GET /clothing/new
app.get('/clothing/new', (req, res) => {
  res.render('clothing/new.ejs');
});

// GET /clothing/:id
app.get('/clothing/:clothingId', async (req, res) => {
  const foundClothing = await Clothing.findById(req.params.clothingId);
  res.render('clothing/show.ejs', { clothing: foundclothing });
});

// POST /clothing
app.post('/clothing', async (req, res) => {
  if (req.body.inStock === 'on') {
    req.body.inStock = true;
  } else {
    req.body.inStock = false;
  }

  await Clothing.create(req.body);
  res.redirect('/clothing');
});

app.delete('/clothing/:clothingId', async (req, res) => {
  await Clothing.findByIdAndDelete(req.params.clothingId);
  res.redirect('/clothing');
});

app.get('/clothing/:clothingId/edit', async (req, res) => {
  const foundclothing = await Clothing.findById(req.params.clothingId);
  res.render('clothing/edit.ejs', { clothing: foundclothing });
});

app.put('/clothing/:clothingId', async (req, res) => {
  if (req.body.inStock === 'on') {
    req.body.inStock = true;
  } else {
    req.body.inStock = false;
  }

  await Clothing.findByIdAndUpdate(req.params.clothingId, req.body);

  res.redirect(`/clothing/${req.params.clothingId}`);
});


app.listen(3000, () => {
  console.log('Listening on Port 3000');
});