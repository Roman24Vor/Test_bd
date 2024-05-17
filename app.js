var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://test:1@localhost:5432/test')

// Определение страниц
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
var order_itemsRouter = require('./routes/order_items');
var order_statusesRouter = require('./routes/order_statuses');
var paymentsRouter = require('./routes/payments');
var payment_typesRouter = require('./routes/payment_types');
var clientsRouter = require('./routes/clients');
var rolesRouter = require('./routes/roles');

var app = express();

session = require("./session.js")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  req.db = db;
  next();
})

// Добавление страниц
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/order_items', order_itemsRouter);
app.use('/order_statuses', order_statusesRouter);
app.use('/payments', paymentsRouter);
app.use('/payment_types', payment_typesRouter);
app.use('/clients', clientsRouter);
app.use('/roles', rolesRouter);

var api = require('./routes/api.js');
app.use('/api', api);
var api_auth = require('./routes/api/auth');
api.use('/auth', api_auth);

var api_users = require('./routes/api/users');
api.use('/users', api_users);

var api_orders = require('./routes/api/orders');
api.use('/orders', api_orders);

var api_clients = require('./routes/api/clients');
api.use('/clients', api_clients);

var api_order_items = require('./routes/api/order_items');
api.use('/order_items', api_order_items);

var api_order_statuses = require('./routes/api/order_statuses');
api.use('/order_statuses', api_order_statuses);

var api_payment_types = require('./routes/api/payment_types');
api.use('/payment_types', api_payment_types);

var api_payments = require('./routes/api/payments');
api.use('/payments', api_payments);

var api_roles = require('./routes/api/roles');
api.use('/roles', api_roles);

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


db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })


module.exports = app;

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`)
})
