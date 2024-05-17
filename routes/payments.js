var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {

    var sessionInfo = session.auth(req);
    var user = sessionInfo.user;
    console.log(user)

    let paymentType = await req.db.any(`
    SELECT
        payment_types.id AS id,
        payment_types.label AS label
    FROM
        payment_types
    `)

    let payments = await req.db.any(`
    SELECT
        payments.id AS id,
        orders.label AS order_label,
        payment_types.label AS payment_type_label,
        payments.amount AS amount
    FROM
        payments
    INNER JOIN orders ON payments.id_order = orders.id
    INNER JOIN payment_types ON payments.id_payment_type = payment_types.id
`)

    let orders = await req.db.any(`
    SELECT
        orders.id AS id,
        orders.label AS label,
        orders.id_status AS id_status,
        orders.id_client AS id_client,
        orders.amount AS amount
    FROM
        orders
`)
  console.log(orders)
  console.log(paymentType)
  res.render('payments/list', { title: 'Платежи', user: user, payments: payments, paymentType: paymentType, orders: orders })
});

router.post('/change', async function(req, res, next) {

    let order = req.body

    await req.db.none('INSERT INTO payments(id_order, id_payment_type, amount) VALUES(${id_order}, ${id_payment_type}, ${amount})', order);

    res.send({msg: 'Платеж успешно изменен'})

});

module.exports = router;
