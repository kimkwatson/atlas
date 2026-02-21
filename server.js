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

// OAuth require statements
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// The scope for reading contacts.
const SCOPES = ['openid', 'https://www.googleapid.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

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
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // For now, just store the Google profile in the session
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Start Google OAuth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// Simple success/failure pages
app.get('/auth/success', (req, res) => {
  res.send('Logged in with Google!');
});

app.get('/auth/failure', (req, res) => {
  res.status(401).send('Google login failed.');
});

// express built-in body parsing
app.use(express.json());
app.use(cors());
app.use('/locations', locationsRoute);
app.use('/landmarks', landmarksRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Return authenticated Google client
async function getGoogleAuth() {
  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
    port: 3001
  });
  return auth;
  }

app.get('/auth/test', async (req, res) => {
  try {
    await getGoogleAuth();
    res.send('OAuth worked');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OAuth test failed' });
  }
});

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