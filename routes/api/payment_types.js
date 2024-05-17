var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let payment_types = await req.db.any(`
        SELECT
            payment_types.id AS id,
            payment_types.label AS label
        FROM
            payment_types
    `)
    console.log(payment_types)
    res.json({payment_types: payment_types })

});

module.exports = router;