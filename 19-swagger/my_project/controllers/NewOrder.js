'use strict';

var utils = require('../utils/writer.js');
var NewOrder = require('../service/NewOrderService');

module.exports.addOrder = function addOrder (req, res, next, body) {
  NewOrder.addOrder(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
