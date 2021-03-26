const express = require('express');
const app = express();
const morgan = require('morgan');

//Server configuration
app.set('port', 4000);
app.set('json spaces', 2);


//Server middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(require('./routes/routes'));


app.listen(app.get('port'), (err) => {
	err ? console.log("We got an error: ", err) : console.log(`App is running on port ${app.get('port')}`);
})
