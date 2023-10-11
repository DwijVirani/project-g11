const { getUserByUsername } = require('../../services/driverService');
const {
  deliveryOrdersService,
  orderUpdateService,
  markOrderAsDeliveredService,
  getCurrentOrderService,
} = require('./../../services/orderService');

const deliveryOrders = async (req, res) => {
  try {
    const orderList = await deliveryOrdersService();
    if (orderList && orderList.length > 0) {
      return res.render('dashboard', { layout: 'layout.hbs', orderList });
    } else {
      return res.render('dashboard', { layout: 'layout.hbs', orderList: [], errMsg: 'No orders' });
    }
  } catch (error) {
    return res.render('dashboard', { layout: 'layout.hbs', orderList: [], errMsg: error.message });
  }
};

const getCurrentOrder = async (req, res) => {
  try {
    const driverName = req.session.user.username;
    const result = await getCurrentOrderService(driverName);
    if (result) {
      return res.render('currentOrders', { layout: 'layout.hbs', orderData: result });
    } else {
      return res.render('currentOrders', { layout: 'layout.hbs', orderData: {}, errMsg: 'No orders' });
    }
  } catch (error) {
    return res.render('currentOrders', { layout: 'layout.hbs', orderData: {}, errMsg: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = 'IN TRANSIT';
    const driverName = req.session.user.username;

    const driverData = await getUserByUsername(driverName);
    const result = await orderUpdateService(orderId, status, driverData.username, driverData.license_plate_number);
    if (result) {
      return res.redirect('/dashboard');
    } else {
      return res.render('dashboard', { layout: 'layout.hbs', result: [], errMsg: 'No orders' });
    }
  } catch (error) {
    return res.render('dashboard', { layout: 'layout.hbs', orderList: [], errMsg: error.message });
  }
};

const markOrderDelivered = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!req.file) {
      return res.render('currentOrders', {
        layout: 'layout.hbs',
        result: [],
        errMsg: 'Cannot mark order as delivered without a photo',
      });
    }

    const result = await markOrderAsDeliveredService(orderId);
    if (result) {
      return res.redirect('/dashboard');
    } else {
      return res.render('currentOrders', { layout: 'layout.hbs', result: [], errMsg: 'No orders' });
    }
  } catch (error) {
    return res.render('currentOrders', { layout: 'layout.hbs', orderData: {}, errMsg: error.message });
  }
};

module.exports = {
  deliveryOrders,
  getCurrentOrder,
  updateOrderStatus,
  markOrderDelivered,
};
