require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rateLimit = require('express-rate-limit');
const authenticateUser = require('./authUserMiddleware');
const connectDB = require('./db');
var app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
connectDB();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Rate limit exceeded. Please try again later.' }
});
const userRouter = require("./routes/user")
const cartRouter = require("./routes/cart")
const ordersRouter = require("./routes/order")
const categoryRouter = require("./routes/category")
const productRouter = require("./routes/product");
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer Token',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
    servers: [{
      url: "http://localhost:3001"
    }],

  }
  , apis: ['./routes/*.js'],

};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));




app.use('/api/users', apiLimiter, userRouter);
app.use('/api/carts', apiLimiter, authenticateUser, cartRouter);
app.use('/api/orders', apiLimiter, authenticateUser, ordersRouter);
app.use('/api/categories', apiLimiter, categoryRouter);
app.use('/api/products', apiLimiter, productRouter);
app.use("*", (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})



// Middleware to handle 405 errors
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).json({ error: 'Not Found', message: 'The requested resource was not found on this server' });
  } else {
    return res.status(404).json({ error: 'Method not allowed', message: 'Method not allowed' });
  }

  next(err);
});




module.exports = app;
