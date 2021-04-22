const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Company = require('../models/CompanySchema');

passport.use(new BearerStrategy(
    (token, done)=> {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedData);
      Company.findById(decodedData.userId, (err, user)=> {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));