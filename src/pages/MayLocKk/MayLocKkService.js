import axiosClient from '../../service/axiosClient';
import { PRD_MAY_LOC_KK } from '../../constants/Constants';

const getMayLocKkOrder = (params) => {
  return axiosClient.get('/api/landing/order', {
    params: {
      ...params,
      product: PRD_MAY_LOC_KK
    }
  });
};

const MayLocKkService = {
  getMayLocKkOrder
};

export default MayLocKkService;
