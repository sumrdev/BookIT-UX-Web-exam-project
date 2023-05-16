import express from 'express';

const app = express();
const port = process.env.PORT || '3000';

// const jsonwebtoken = require('jsonwebtoken');
//const swaggerAutogen = require('swagger-autogen')();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require("dotenv").config(
    {path: __dirname + '/.env'}
);

var { expressjwt: jwt } = require("express-jwt");

const secret = process.env.JWT_SECRET;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
    jwt({
      secret: secret,
      algorithms: ["HS256"],
    }).unless({ path: ["/login"] })
  );

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

require('./endpoints')(app);
