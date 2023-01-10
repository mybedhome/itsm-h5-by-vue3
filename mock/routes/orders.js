var express = require('express');
var router = express.Router();
const util = require('../util');
const { faker } = require('@faker-js/faker');
faker.locale = 'zh_CN';

const createOrderData = () => {
  return Array.from({ length: 30 }).map(() => {
    const order = {
      id: util.guid(),
      createTime: Date.now() - parseInt(Math.random() * 100000),
      flowName: faker.helpers.arrayElement([
        '告警工单流程',
        '变更工单流程',
        '问题工单流程',
        '事件工单流程',
        '发布与部署管理流程',
      ]),
      flowId: util.guid(),
      orderTitle: faker.word.adjective({ min: 5, max: 10 }),
      orderStatus: faker.helpers.arrayElement([1, 2, 3]),
      serialNum:
        faker.helpers.arrayElement(['Event', 'Warning', 'Change']) + Date.now(),
      createUser: {
        userName: faker.name.firstName(),
        userId: util.guid(),
      },
    };
    return order;
  });
};
const orderData = createOrderData();

const getCurrentPageData = (pageNo, pageSize) => {
  const offset = (pageNo - 1) * pageSize;
  const endPos = pageNo * pageSize;
  return orderData.slice(offset, endPos);
};

const getMaxPage = (pageSize) => Math.ceil(orderData.length / pageSize);
// console.log('orderData', orderData);
router.post('/_query', async (req, res) => {
  console.log('req', req.body);
  const data = {
    ...res.body,
    data: {
      items: getCurrentPageData(req.body.pageNo, req.body.pageSize),
      maxPage: getMaxPage(req.body.pageSize),
    },
  };
  await util.delay(100);
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
