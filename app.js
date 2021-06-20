if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const dbUrl = process.env.ATLAS_URL;

//Import Routes
const peopleRoutes = require('./routes/people');

//Connect to DataBase 
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected')
});

const app = express();

// Middlewares used
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json(["application/json", "json"]));
app.use('/api/people', peopleRoutes);

// Routes
app.get('/', (req, res) => {
  res.send("We are on HOME Page!")
});

// Error Handling Middlewares
app.all('*', (req, res, next) => {
  next(new ExpressError('Page not Found', 404))
});

app.use((err, req, res, next) => {
  if (!err.message) { err.message = 'oh NO, Something Went Wrong!' }
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listening to server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}!`)
})