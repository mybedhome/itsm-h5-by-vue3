var express = require('express');
var router = express.Router();
const util = require('../util');
const { faker } = require('@faker-js/faker');
faker.locale = 'zh_CN';
const services = require('../data/services');

const createOrderData = () => {
  return Array.from({ length: 30 }).map(() => {
    const order = {
      id: util.guid(),
      serviceId: faker.helpers.arrayElement(
        services.map((service) => service.serviceId)
      ),
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

const filter = (condition) => {
  const { orderStatus, serviceId } = condition;
  let filterData = [...orderData];
  if (orderStatus) {
    filterData = filterData.filter((item) => item.orderStatus == orderStatus);
  }
  if (serviceId) {
    filterData = filterData.filter((item) => item.serviceId == serviceId);
  }
  return filterData;
};

const getOrderData = ({ pageNo, pageSize, condition }) => {
  const offset = (pageNo - 1) * pageSize;
  const endPos = pageNo * pageSize;
  const filterData = filter(condition);
  return {
    items: filterData.slice(offset, endPos),
    maxPage: Math.ceil(filterData.length / pageSize),
  };
};

// 工单列表查询
router.post('/_query', async (req, res) => {
  // console.log('req', req.body);
  const { items, maxPage } = getOrderData(req.body);
  const data = {
    ...res.body,
    data: {
      items,
      maxPage,
    },
  };
  await util.delay(100);
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

// 查询待办任务总数
router.get('/_countNoHandleOrderNum', (req, res) => {
  res.json(3);
});

module.exports = router;
