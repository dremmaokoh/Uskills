require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require("../models/index");

 const User = db.user


passport.serializeUser((user, done) => {
   done(null, user.id);
 });
 
 // Deserialize the user , just like decode a jwt token
 passport.deserializeUser((id, done) => {
   const user = User.findByPk(id);
   done(null, user);
 });
 
 passport.use(
          new GitHubStrategy({
           clientID: process.env.GITHUB_CLIENT_ID,
           clientSecret: process.env.GITHUB_CLIENT_SECRET,
           callbackURL: "https://uskills.herokuapp.com/auth/github/callback"
         },
     async (accessToken, refreshToken, profile, done) => { 
  //    console.log ('iam in')
       const existingUser = await User.findOne({
         where: {
            githubId: profile.id ,
         },
       });
   //   console.log ('iam')
console.log (existingUser)
       if (existingUser) {
         return done(null, existingUser);
       }
       
       const newUser = await User.create({
         githubId: profile.id,
                   username:profile.username,
                  name:profile.displayName,
       });
  //    console.log ('iam 23')

      done(null, newUser);
     } 
   )
 );