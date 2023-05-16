import express from 'express';

const app = express();
const port = process.env.PORT || '3000';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

require('./endpoints')(app);

const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const secret = 'secret';
//const swaggerAutogen = require('swagger-autogen')();