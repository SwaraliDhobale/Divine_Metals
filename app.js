 const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { name } = require('ejs');
const collection = require('./database')
const path = require('path');
const router = express.Router();
const app = express();

app.use(session({
  secret: 'your_secret_key_here', // Replace with your secret key
  resave: false,
  saveUninitialized: true
}));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/login', function(req, res){
    res.render('login');
});
app.get('/diamonds', function(req, res){
    res.render('diamonds');
});
app.get('/signup', function(req, res){
    res.render('signup');
});
app.get('/gold', function(req, res){
    res.render('gold');
});
app.get('/silver', function(req, res){
    res.render('silver');
});

app.get('/welcome', (req, res) => {
  // Check if the user is logged in and retrieve the username
  const name = req.session.check ? req.session.user.name : null;
  res.render('dashboard', { name });
});


app.listen(app.get('port'), function() {
    console.log("server is up")
});

app.post("/signup", async (req, res) => {

        const data={
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
          }
          await collection.insertMany([data])
          res.render('dashboard')
      
});
//--------------------------------------------------
app.post("/login", async (req, res) => {
  try {
      const check = await collection.findOne({ name: req.body.name, password: req.body.password });
        
        if (check.password===req.body.password ){
          req.session.user=check;
          res.render('dashboard')
        }
        else{
          res.send('Wrong password')
        }
          }
         catch (error) {
          res.send('Wrong details');
        }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login'); // Redirect to the login page after logout
});

