import axiosClient from '../../service/axiosClient';

const getAllOrder = (params) => {
  return axiosClient.get('/api/order/read.php', { params });
};

const updateOrderStatus = (data) => {
  return axiosClient.post('/api/order/update-status.php', data);
};

const OrderService = {
  getAllOrder,
  updateOrderStatus
};

export default OrderService;
