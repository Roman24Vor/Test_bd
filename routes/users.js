var express = require('express');
var router = express.Router();

// Функция для проверки прав доступа
function checkAccess(req, res, next) {

  var sessionInfo = session.auth(req);
  var user = sessionInfo.user;

  console.log(user.fio)
  if (user.id_role != '3') {
    console.log(user.fio)
    next();
  } else {
    res.status(403).send('У вас нет доступа к этой странице');
  }
}

/* GET users listing. */
router.get('/', checkAccess, async function(req, res, next) {
  let users = await req.db.any('SELECT * FROM users')
  console.log(users)
  res.render('users/list', { title: 'Пользователи', users: users })
});

module.exports = router;