require("dotenv").config(
    {path: __dirname + '/../.env'}
);

import express from 'express';

const app = express();
const port = process.env.PORT || '4000';

// const jsonwebtoken = require('jsonwebtoken');
//const swaggerAutogen = require('swagger-autogen')();

var { expressjwt: jwt } = require("express-jwt");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const secret = process.env.JWT_SECRET;

import cors from 'cors';

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(
    jwt({
      secret: secret,
      algorithms: ["HS256"],
      getToken: (req: any) => {
        if(req.headers.authorization) return req.headers.authorization.split(" ")[1].replace(/['"]+/g, '');
      }
    }).unless({ path: [, "/", "/login", "/signup"] })
  );

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

require('./endpoints')(app);
