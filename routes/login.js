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