const express = require('express');
const router = express.Router();
const util = require('../util');
const { faker } = require('@faker-js/faker');
const flowName = require('../data/flowName');
faker.locale = 'zh_CN';

const createData = () => {
  return Array.from({ length: 5 }).map((_, index) => ({
    NAME_: flowName[index],
    NUM_: faker.datatype.number(50),
    PROC_DEF_ID_: util.guid(),
  }));
};

router.get('/getOrderStatisticsByState', (req, res) => {
  const getTotal = (max = 100) => faker.datatype.number(max);
  const data = {
    ...res.body,
    data: [{ finishNum: getTotal(), procNum: getTotal(), revNum: getTotal() }],
  };
  res.json(data);
});

router.get('/getOrderStatisticsByFlow', (req, res) => {
  const data = {
    ...res.body,
    data: createData(),
  };
  res.json(data);
});

module.exports = router;
