import { http } from '@/utils/request';
import type {
  OrderStatisticsData,
  ServiceStatisticsData,
  StatisticsParams,
} from './model/statisticsModel';

export const getOrderStatistics = (params: StatisticsParams) => {
  return http.get<Array<OrderStatisticsData>>(
    '/flowDefinitions/getOrderStatisticsByState',
    { params }
  );
};

export const getServiceStatistics = (params: StatisticsParams) => {
  return http.get<ServiceStatisticsData>(
    '/flowDefinitions/getOrderStatisticsByFlow',
    { params }
  );
};
