const express = require('express');
const app = express();
const logger = require('morgan');
const OrdersRouter = require('./routes/orders');
const ServiceRouter = require('./routes/service');
const StatisticsRouter = require('./routes/flowDefinitions');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use((req, res, next) => {
  res.body = {
    statusCode: 200,
    success: true,
  };
  next();
});

app.use('/orders', OrdersRouter);
app.use('/service', ServiceRouter);
app.use('/flowDefinitions', StatisticsRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ code: 500, success: false, msg: err.message });
});

module.exports = app;
