var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

    let roles = await req.db.any(`
        SELECT
            roles.id AS id,
            roles.code AS code,
            roles.label AS label
        FROM
            roles
    `)
    console.log(roles)
    res.json({roles: roles })

});

module.exports = router;