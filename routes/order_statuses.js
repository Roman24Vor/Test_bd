var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  var sessionInfo = session.auth(req);
  var user = sessionInfo.user;
  console.log(user)

  let status = await req.db.any(`
  SELECT
      order_statuses.id AS id,
      order_statuses.label AS label
  FROM
      order_statuses
`)

  let order_statuses = await req.db.any('SELECT * FROM order_statuses')
  console.log(order_statuses)
  res.render('order_statuses/list', { title: 'Статусы заказа', order_statuses: status, status: status, user: user })
});

module.exports = router;
