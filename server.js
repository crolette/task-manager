// Fichier JS pour le front-end
const { engine } = require('express-handlebars');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authController');
const app = express();
const PORT = 3300;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Ligne inutile car express handlebars connait déjà ce dossier par défaut
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'views')));
// Body parser middleware

// middleware for cookies
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*',checkUser);
app.use('/', require('./routes/routes'));

app.listen(PORT, () => {
	console.log(`Express running on localhost:${PORT}`);
});
