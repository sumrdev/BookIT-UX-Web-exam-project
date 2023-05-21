const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    }
  },
  definitions: {
    CreateUser: {
      email: 'Jhon@Doe.com',
      name: 'Jhon Doe',
      password: "123123",
    },
    LoginUser: {
      email: 'Jhon@Doe.com',
      password: "123123",
    }
  },
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/endpoints.ts'];


swaggerAutogen(outputFile, endpointsFiles, doc);