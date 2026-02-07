const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Atlas API',
        description: 'API for locations and landmarks'
    },
    host: 'atlas-3zxc.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);