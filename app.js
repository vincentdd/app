var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require("morgan");
let jwt = require("express-jwt");

var indexRouter = require('./routes/index');
// const loginRouter = require('./routes/login');
// const logupRouter = require('./routes/register');
// var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
// const tagRouter = require('./routes/tag');

var app = express();


//Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://localhost/piggybank';
var mongoDB = 'mongodb://vincedd:1118@piggybank-shard-00-00-cwj1z.mongodb.net:27017,piggybank-shard-00-01-cwj1z.mongodb.net:27017,piggybank-shard-00-02-cwj1z.mongodb.net:27017/test?ssl=true&replicaSet=piggybank-shard-0&authSource=admin&retryWrites=true';
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6

    // replicaSet: 'piggybank-shard-0',
    // ssl: true,
    // authSource: admin,
    // retryWrites: true
};
mongoose.connect(mongoDB,options);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//node populatedb "mongodb://vincedd:1118@piggybank-shard-00-00-cwj1z.mongodb.net:27017,piggybank-shard-00-01-cwj1z.mongodb.net:27017,piggybank-shard-00-02-cwj1z.mongodb.net:27017/test?ssl=true&replicaSet=piggybank-shard-0&authSource=admin&retryWrites=true"

//**********************
// app.use(morgan("dev"));
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });
//
// app.post('/authenticate', function(req, res) {
//     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                res.json({
//                     type: true,
//                     data: user,
//                     token: user.token
//                 });
//             } else {
//                 res.json({
//                     type: false,
//                     data: "Incorrect email/password"
//                 });
//             }
//         }
//     });
// });
//
// app.post('/signin', function(req, res) {
//     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                 res.json({
//                     type: false,
//                     data: "User already exists!"
//                 });
//             } else {
//                 var userModel = new User();
//                 userModel.email = req.body.email;
//                 userModel.password = req.body.password;
//                 userModel.save(function(err, user) {
//                     user.token = jwt.sign(user, process.env.JWT_SECRET);
//                     user.save(function(err, user1) {
//                         res.json({
//                             type: true,
//                             data: user1,
//                             token: user1.token
//                         });
//                     });
//                 })
//             }
//         }
//     });
// });
//
// app.get('/me', ensureAuthorized, function(req, res) {
//     User.findOne({token: req.token}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             res.json({
//                 type: true,
//                 data: user
//             });
//         }
//     });
// });
//
// function ensureAuthorized(req, res, next) {
//     var bearerToken;
//     var bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         var bearer = bearerHeader.split(" ");
//         bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.send(403);
//     }
// }
//**********************
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//set listeninig port
//*******************************
// var User = require('./models/User');
//*********************************
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt({ secret: 'glgjscyqyhfbqz'}).unless({path: ['/login', '/register']}));
app.use('/', indexRouter);
app.get('/',
    jwt({secret: 'shhhhhhared-secret'}),
    function(req, res) {
        if (!req.user.admin) return res.sendStatus(401);
        res.sendStatus(200);
    });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
