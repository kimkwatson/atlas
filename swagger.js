const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Atlas API',
        description: 'API for locations and landmarks'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFile = ['./server.js'];

swaggerAutogen(outputFile, endpointsFile, doc);