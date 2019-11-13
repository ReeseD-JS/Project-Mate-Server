require('dotenv').config();
var express = require('express');
var app = express();
var signup = require('./controllers/signupcontroller');
var login = require('./controllers/logincontroller');
var project = require('./controllers/projectscontroller');
var sequelize = require('./db');

sequelize.sync();
//sequelize.sync({force:true});

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/app/signup', signup);

app.use('/app/login', login);

app.use(require('./middleware/validate-session'));

app.use('/app/member/projects', project);


app.listen(3000, function() {
    console.log('App is Listening on 3000.')
})