const express = require('express');
const app = express();
const OrdersRouter = require('./routes/orders');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/orders', OrdersRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ code: 500, success: false, msg: err.message });
});

module.exports = app;
