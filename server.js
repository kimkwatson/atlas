if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('./db/connect');
const locationsRoute = require('./routes/locations');
const landmarksRoute = require('./routes/landmarks');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const port = process.env.PORT || 3000;

// OAuth require statements
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// express built-in body parsing
app.use(express.json());
app.use(cors());

// routes
app.use(express.static("public"));
app.use('/auth', loginRoute);
app.use('/locations', locationsRoute);
app.use('/landmarks', landmarksRoute);
app.use('/logout', logoutRoute);
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