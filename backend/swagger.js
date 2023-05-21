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
    },
    CreateRoom: {
      name: 'Room 1',
      type: 'Skybox',
      capacity: 10,
      powerOutlets: 5,
      ethernetPorts: 5,
      externalMonitor: true,
      whiteboard: true,
      eatingAllowed: true,
      bookings: {},
    },
    CreateBooking: {
      startTime: Date.now(),
      endTime: Date.now()+3600000,
      roomId: 1,
      userId: 2,
    },
    UpdateUser: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123123',
    },
    CreateUserAdmin: {
      email: 'admin@maybe.com',
      name: 'big boss',
      password: '123123',
      admin: true,
    },
    UpdateRoom: {
      name: 'Auditorium 1',
      type: 'Auditorium',
      capacity: 100,
      powerOutlets: 5,
      ethernetPorts: 5,
      externalMonitor: true,
      whiteboard: true,
      eatingAllowed: true,
      bookings: {},
    },
  },
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/endpoints.ts'];


swaggerAutogen(outputFile, endpointsFiles, doc);