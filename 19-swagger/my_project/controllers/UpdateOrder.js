'use strict';

var utils = require('../utils/writer.js');
var UpdateOrder = require('../service/UpdateOrderService');

module.exports.updateOrder = function updateOrder (req, res, next, id) {
  UpdateOrder.updateOrder(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
