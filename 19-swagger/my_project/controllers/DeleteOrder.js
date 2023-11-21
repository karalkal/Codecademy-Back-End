'use strict';

var utils = require('../utils/writer.js');
var DeleteOrder = require('../service/DeleteOrderService');

module.exports.deleteOrder = function deleteOrder (req, res, next, id) {
  DeleteOrder.deleteOrder(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
