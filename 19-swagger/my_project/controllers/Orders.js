'use strict';

var utils = require('../utils/writer.js');
var Orders = require('../service/OrdersService');

module.exports.getOrders = function getOrders (req, res, next) {
  Orders.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
