var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let roles = await req.db.any('SELECT * FROM roles')
  console.log(roles)
  res.render('roles/list', { title: 'Роли', roles: roles })
});

module.exports = router;