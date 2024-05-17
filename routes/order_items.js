var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {

  var sessionInfo = session.auth(req);
  var user = sessionInfo.user;
  //console.log(user)

  let orders = await req.db.any(`
  SELECT
      orders.id AS id,
      orders.label AS label,
      order_statuses.label AS order_status_label,
      clients.label AS client_label,
      orders.amount AS amount
  FROM
      orders
  INNER JOIN
      clients ON clients.id = orders.id_client
  INNER JOIN
      order_statuses ON order_statuses.id = orders.id_status
`)

  let order_items = await req.db.any('SELECT * FROM order_items')
  //console.log(order_items)
  res.render('order_items/list', { title: 'Элементы заказа', order_items: order_items, orders: orders, user: user })
});

router.post('/add-items', async function(req, res, next) {

  // Получение данных элемента заказа из тела запроса
  let orderItem = req.body;

  // Добавление элемента заказа в базу данных
  await req.db.none('INSERT INTO order_items(label, id_order, amount) VALUES(${label}, ${id_order}, ${amount})', orderItem);

  // Отправка ответа
  res.send({msg: 'Элемент заказа успешно добавлен'});
});


module.exports = router;
