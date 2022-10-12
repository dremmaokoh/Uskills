const express = require('express');
const ejs = require('ejs');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require ('./config/passport_setup');
require('dotenv').config();
const session = require('express-session');
const userRoute = require('./routes/post.route');
const authRoutes = require('./routes/route');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.use(
  session({
  secret: process.env.KEYS,
  resave: false,
  saveUninitialized: false,
 cookie: { httpOnly: true,
           secure: false,
           maxAge: 24 * 60 * 60 * 1000,
}
}))


// connect to db
const db = require("./models/index");
db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// sync
db.sequelize.sync()

// to force sync during development
// db.sequelize.sync({ force: true }).then(() => {
// console.log("Drop and re-sync db.");
// });


app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
  res.render('home')
  });
app.use('/auth',authRoutes)
app.use("/api", userRoute);

app.get('/',(req,res)=>{
  res.render('home')
  });

  app.get("/create",(req,res)=>{
    res.render("post")
  });

  app.get("/flutter",(req,res)=>{
    res.render("payment") 
  });
 
//   app.get('/payment-callback', async (req, res) => {
//     if (req.query.status === 'successful') {
//         const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
//         const response = await flw.Transaction.verify({id: req.query.transaction_id});
//         if (
//             response.data.status === "successful"
//             && response.data.amount === transactionDetails.amount
//             && response.data.currency === "NGN") {
//             // Success! Confirm the customer's payment
//         } else {
//             // Inform the customer their payment was unsuccessful
//         }
//        }   }
// )

 const port = process.env.PORT 
 app.listen(port, () => {
   console.log(`app running on http://localhost:${port}`);
 });