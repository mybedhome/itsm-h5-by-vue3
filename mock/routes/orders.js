var express = require('express');
var router = express.Router();
const util = require('../util');
router.all('/_query', async (req, res) => {
  const data = {
    statusCode: 200,
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
  console.log('random', random);
  await util.delay(6000);
  // res.status(500);
  res.json(data);
});

module.exports = router;
