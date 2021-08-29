// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



//set up session
const session = require('express-session');
const oneDay = 1000*60*60*24;
var sess = {
    secret: "thisisthesecret",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false,
}
app.use(session(sess));

app.use('/public', express.static("public"));

const flow = require('./routes/flow');
app.use('/', flow);

const db_flow = require('./routes/mongoose');
app.use('/mongoose', db_flow);


//helper lib to display all routes
const elr = require("express-list-routes");
elr(app);



app.listen(PORT, () => {
  console.log('Server connected at:', PORT);
});