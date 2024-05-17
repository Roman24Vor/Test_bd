var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let order_items = await req.db.any(`
        SELECT
            order_items.id AS id,
            order_items.label AS label,
            order_items.id_order AS id_order,
            order_items.amount AS amount
        FROM
            order_items
    `)
    console.log(order_items)
    res.json({order_items: order_items })

});

module.exports = router;