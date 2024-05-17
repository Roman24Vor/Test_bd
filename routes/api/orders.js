var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

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
    res.json({orders: orders })

});

module.exports = router;