import axiosClient from '../../service/axiosClient';

const getAllTlvcOrder = (params) => {
  return axiosClient.get('/api/tlvc-order/read.php', { params });
};

const updateTlvcOrderStatus = (data) => {
  return axiosClient.post('/api/tlvc-order/update-status.php', data);
};

const TlvcOrderService = {
  getAllTlvcOrder,
  updateTlvcOrderStatus
};

export default TlvcOrderService;
