var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let clients = await req.db.any(`
        SELECT
            clients.id AS id,
            clients.label AS label
        FROM
            clients
    `)
    console.log(clients)
    res.json({clients: clients })

});

module.exports = router;