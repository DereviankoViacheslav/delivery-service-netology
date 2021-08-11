const express = require('express');
const http = require('http');
const io = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const { CommunicationModule } = require('./components/communication');
const { isAuthenticatedMiddleware } = require('./middlewares');
const { UserModel } = require('./components/user');
const { configDB } = require('./config');
const { hashHelper } = require('./helpers');
const routes = require('./api');

const app = express();
const server = http.Server(app);
const socketIo = io(server);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const verify = (email, password, done) => {
  const passwordHash = hashHelper.getHashedData(password);
  UserModel.findOne({ email, passwordHash }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  });
};

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

passport.use(new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await UserModel.findById(id);
  if (!user) {
    return cb(new Error());
  }
  cb(null, user);
});

app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET || 'qwerty'
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  req.isAuthorized = req.isAuthenticated();
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(CommunicationModule(socketIo));
app.use(routes);

const PORT = process.env.HTTP_PORT || 3003;
const { host, ...dbConfig } = configDB;
mongoose.connect(host, dbConfig, (error) => {
  if (error) return console.log('Mongo connection error ===>>>', error);
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
