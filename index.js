const express = require('express');
const app = express();
const morgan = require('morgan');


// settings
app.set('appName', 'ExpressAppCourse');
app.set('port', 3000);
app.set('view engine', 'ejs');



// es para que reciba los datos json del front
app.use(express.json()); 
app.use(morgan('dev'));


app.get('/', (req, res) => {
	const data = [{name:'L'},{name:'J'}];
	res.render('index.ejs', {people: data});
});

app.all('/user', (req, res, next) => {
	console.log('por aqui paso');
	next();
});


app.get('/user', (req, res) => {
	res.json({
		username:'gustavo',
		lastname:'herrera'
	});
});

app.post('/user/:id', (req, res) => {
	// body para el cuerpo de la peticion
	console.log(req.body);
	// params es para obtener :id
	console.log(req.params);
	// req.body recibe los datos del front
	res.send('esto es una contacto');
});

app.put('/user/:usuario', (req, res) => {
	console.log(req.body);
	res.send(`User ${req.params.usuario} updated`);
});

app.delete('/user/:usuario', (req, res) => {
	res.send(`User ${req.params.usuario} deleted`);
});

// static es un middleware
app.use(express.static('public'));

app.listen(app.get('port'), () => {
	console.log(app.get('appName'));
	console.log('server on port ', app.get('port'));
});