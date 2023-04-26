
const express = require('express');
const session = require('express-session');
const path = require('path');

const MsIdExpress = require('microsoft-identity-express');
const appSettings = require('./appSettings.js');
const mainRouter = require('./routes/mainRoutes');

const SERVER_PORT = process.env.PORT || 3000;

// initialize express
const app = express(); 

 app.use(session({
    secret: 'h4H8Q~pyj5YU0uOhv2gYQrSHK.WDFjP4RFoT6bbm',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set this to true on production
    }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(express.static(path.join(__dirname, './public')));

// instantiate the wrapper
const msid = new MsIdExpress.WebAppAuthClientBuilder(appSettings).build();

// initialize the wrapper
app.use(msid.initialize());

// pass the instance to your routers
app.use(mainRouter(msid));

app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`));

module.exports = app;