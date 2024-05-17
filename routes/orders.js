var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    //var user = session.auth(req);
    var sessionInfo = session.auth(req);
    var user = sessionInfo.user;
    console.log(user)
    
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
    //console.log(orders)
     let clients = await req.db.any(`
        SELECT
            *
        FROM
            clients
    `)
    //console.log(clients)

    let order_statuses = await req.db.any(`
    SELECT
        *
    FROM
        order_statuses
  `)
  
    res.render('orders/list', { title: 'Заказы', orders: orders, clients: clients, user: user, order_statuses: order_statuses })

});

router.post('/create', async function(req, res, next) {

    let order = req.body

    await req.db.none('INSERT INTO orders(label, id_client, amount) VALUES(${label}, ${id_client}, ${amount})', order);

    res.send({msg: ''})

});

router.post('/change', async function(req, res, next) {

    // Получение данных элемента заказа из тела запроса
    let orderItem = req.body;

    // Добавление элемента заказа в базу данных
    //await req.db.none('INSERT INTO orders(id_status) VALUES(${id_status}', orderItem);
    await req.db.none('UPDATE orders SET id_status = ${id_status} WHERE id = ${label}', orderItem);

    // Отправка ответа
    res.send({msg: 'Статус успешно изменен'});

});


router.get('/:id', async function(req, res) {

    let id = req.params.id

    let order = await req.db.one(`
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
        WHERE
            orders.id = ${id}
    `)

    res.render('orders/view', { title: 'Заказ' + order.label, order: order })

});

module.exports = router;
