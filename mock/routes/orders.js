const express = require('express');
const router = express.Router();
const util = require('../util');
const { faker } = require('@faker-js/faker');
const services = require('../data/services');
const flowName = require('../data/flowName');

const createOrderData = () => {
  return Array.from({ length: 30 }).map((item, index) => {
    const langs = ['zh_CN', 'en'];
    faker.setLocale(langs[index % 2]);
    const order = {
      id: util.guid(),
      serviceId: faker.helpers.arrayElement(
        services.map((service) => service.serviceId)
      ),
      createTime: Date.now() - parseInt(Math.random() * 100000),
      flowName: faker.helpers.arrayElement(flowName),
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
  const { orderStatus, serviceId, serialNum } = condition;
  let filterData = [...orderData];
  if (orderStatus) {
    filterData = filterData.filter((item) => item.orderStatus == orderStatus);
  }
  if (serviceId) {
    filterData = filterData.filter((item) => item.serviceId == serviceId);
  }
  if (serialNum) {
    filterData = filterData.filter(
      (item) =>
        item.orderTitle.includes(serialNum) ||
        item.serialNum.includes(serialNum)
    );
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
  res.json(19);
});

module.exports = router;
