var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let status = await req.db.any(`
        SELECT
            order_statuses.id AS id,
            order_statuses.label AS label
        FROM
            order_statuses
    `)

    res.json({status: status })

});

module.exports = router;