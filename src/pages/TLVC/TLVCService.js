import axiosClient from '../../service/axiosClient';
import { PRD_TLVC } from '../../constants/Constants';

const getTLVCOrder = (params) => {
  return axiosClient.get('/api/order/read.php', {
    params: {
      ...params,
      product: PRD_TLVC
    }
  });
};

const TlvcOrderService = {
  getTLVCOrder
};

export default TlvcOrderService;
