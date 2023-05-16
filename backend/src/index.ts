import express from 'express';
import { rootHandler, helloHandler } from './handlers';

const app = express();
const port = process.env.PORT || '3000';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
//const swaggerAutogen = require('swagger-autogen')();