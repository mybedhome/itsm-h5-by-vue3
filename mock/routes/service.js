const express = require('express');
var router = express.Router();
const util = require('../util');
router.post('/data/findPage', (req, res) => {
  const data = {
    items: [
      {
        serviceId: util.guid(),
        serviceName: '告警工单服务',
      },
      {
        serviceId: util.guid(),
        serviceName: '变更工单服务',
      },
      {
        serviceId: util.guid(),
        serviceName: '发布与部署工单服务',
      },
    ],
    total: 3,
  };
  res.json({
    data,
    ...res.body,
  });
});

module.exports = router;
