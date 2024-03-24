// Fichier JS pour le front-end
const { engine } = require('express-handlebars');
const express = require('express');
const path = require('path');


const app = express();
const PORT = 3300;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// Ligne inutile car express handlebars connait déjà ce dossier par défaut
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes'));




app.listen(PORT, () => {
	console.log(`Express running on localhost:${PORT}`);
});
