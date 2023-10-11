const {
  deliveryOrdersService,
  orderUpdateService,
  markOrderAsDeliveredService,
  getCurrentOrderService,
} = require('./../../services/orderService');

const deliveryOrders = async (req, res) => {
  try {
    const driverName = req.session.user.username;
    const orderList = await deliveryOrdersService(driverName);
    if (orderList && orderList.length > 0) {
      return res.render('dashboard', { layout: 'layout.hbs', orderList });
    } else {
      return res.render('dashboard', { layout: 'layout.hbs', orderList: [], noOrderMsg: 'No orders' });
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
      return res.render('currentOrders', { layout: 'layout.hbs', orderData: {}, noOrderMsg: 'No orders' });
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
    const result = await orderUpdateService(orderId, status, driverName);
    if (result) {
      return res.redirect('/dashboard');
    } else {
      return res.render('dashboard', { layout: 'layout.hbs', result: [], noOrderMsg: 'No orders' });
    }
  } catch (error) {
    return res.render('dashboard', { layout: 'layout.hbs', orderList: [], errMsg: error.message });
  }
};

const markOrderDelivered = async (req, res) => {
  try {
    const orderId = req.params.id;

    const result = await markOrderAsDeliveredService(orderId);
    if (result) {
      return res.redirect('/current-order');
    } else {
      return res.render('currentOrders', { layout: 'layout.hbs', result: [], noOrderMsg: 'No orders' });
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
