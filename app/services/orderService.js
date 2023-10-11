const orderModel = require('../models/orders');

const deliveryOrdersService = async () => {
  try {
    const result = await orderModel.find({ status: 'READY FOR DELIVERY' }).sort({ createdAt: -1 }).lean().exec();
    if (result && result.length > 0) {
      return result;
    }
    return undefined;
  } catch (error) {
    throw error;
  }
};

const orderUpdateService = async (orderId, status, driverName) => {
  try {
    const existingOrder = await orderModel.findOne({ _id: orderId });
    if (!existingOrder) {
      throw Error('Order not found');
    }

    const result = await orderModel.updateOne({ _id: orderId }, { status, assigned_driver: driverName });
    if (result) {
      return result;
    }
    return undefined;
  } catch (error) {
    throw error;
  }
};

const markOrderAsDeliveredService = async (orderId) => {
  try {
    const existingOrder = await orderModel.findOne({ _id: orderId });
    if (!existingOrder) {
      throw Error('Order not found');
    }

    const result = await orderModel.updateOne({ _id: orderId }, { status: 'DELIVERED' });
    if (result) {
      return result;
    }
    return undefined;
  } catch (error) {
    throw error;
  }
};

const getCurrentOrderService = async (driverName) => {
  try {
    const result = await orderModel.findOne({ status: 'IN TRANSIT', assigned_driver: driverName }).lean().exec();
    if (result) {
      return result;
    }
    return undefined;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  deliveryOrdersService,
  orderUpdateService,
  markOrderAsDeliveredService,
  getCurrentOrderService,
};
