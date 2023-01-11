const express = require('express');
var router = express.Router();
const util = require('../util');

const services = require('../data/services');
// 查询服务列表
router.post('/data/findPage', (req, res) => {
  const data = {
    items: services,
    total: 3,
  };
  res.json({
    data,
    ...res.body,
  });
});

module.exports = router;
