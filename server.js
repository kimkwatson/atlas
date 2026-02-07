require('dotenv').config();
const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const router = require('./routes');
const port = process.env.PORT || 3000;

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// express built-in body parsing
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// initialize mongodb
const startServer = async () => {
    try {
        await mongodb.initDb();
        console.log('MongoDB connected');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server: ', error);
    }
};

startServer();

/*mongodb.initDb((error) => {
    if (error) {
        console.log(error);
    } else {
        // start server
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});*/
