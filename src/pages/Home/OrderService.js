import axiosClient from '../../service/axiosClient';

const getAllOrder = (params) => {
  return axiosClient.get('/api/landing/order', { params });
};

const updateOrderStatus = (data) => {
  return axiosClient.post('/api/landing/order/update-status', data);
};

const OrderService = {
  getAllOrder,
  updateOrderStatus
};

export default OrderService;
