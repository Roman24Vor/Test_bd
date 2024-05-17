var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let payments = await req.db.any(`
        SELECT
            payments.id AS id,
            payments.id_order AS id_order,
            payments.id_payment_type AS id_payment_type,
            payments.amount AS amount
        FROM
            payments
    `)
    console.log(payments)
    res.json({payments: payments })

});

module.exports = router;