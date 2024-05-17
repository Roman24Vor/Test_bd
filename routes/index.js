var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    var user = session.auth(req).user
    //var can_view_users = user && user.id_role == 1 ? true : false


    var can_view_users = user && user.id_role == 3 ? false : true

    
    //var can_view_users = true
    //var can_view_orders = user && user.id_role == 1 ? true : false
    var can_view_orders = true
    var can_view_clients = true
    var can_view_order_items = true
    var can_view_order_statuses = true
    var can_view_payments = true
    var can_view_payment_types = true

    res.render('index', {
        title:  "Главная страница",
        user:   user,
        can_view_users: can_view_users,
        can_view_orders: can_view_orders,
        can_view_clients: can_view_clients,
        can_view_order_items: can_view_order_items,
        can_view_order_statuses: can_view_order_statuses,
        can_view_payments: can_view_payments,
        can_view_payment_types: can_view_payment_types
    })


});

module.exports = router;
