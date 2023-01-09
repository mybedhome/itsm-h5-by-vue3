var express = require('express');
var router = express.Router();
const util = require('../util');
router.get('/_query', async (req, res) => {
  const data = {
    ...res.body,
    data: {
      items: [
        {
          createTime: Date.now() - 100000,
          createUser: {
            userName: 'ivan',
            userId: '11',
          },
          flowName: '事件工单流程',
          flowId: 'adb-xx-faca-13',
          notifyStatus: '成功',
          orderTitle: '工单统计测试',
          orderTask: '一线处理',
          serialNum: 'Event202210118937',
        },
      ],
    },
  };
  const random = util.getRandom(10);
  await util.delay(6000);
  // res.status(500);
  res.json(data);
});

router.get('/engineUsers', (req, res) => {
  res.json({
    ...res.body,
    data: [
      { id: util.guid(), firstName: 'kevin' },
      { id: util.guid(), firstName: 'rose' },
    ],
  });
});

router.get('/_countNoHandleOrderNum', (req, res) => {
  res.json(3);
});

module.exports = router;
