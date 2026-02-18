if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('./db/connect');
const locationsRoute = require('./routes/locations');
const landmarksRoute = require('./routes/landmarks');
const port = process.env.PORT || 3000;

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// express built-in body parsing
app.use(express.json());
app.use(cors());
app.use('/locations', locationsRoute);
app.use('/landmarks', landmarksRoute);
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
