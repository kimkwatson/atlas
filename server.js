const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello");
});

// express built-in body parsing
app.use(express.json());
app.use('/', router);

// start server
app.listen(process.env.PORT || 3000, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});