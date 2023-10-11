const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['RECEIVED', 'READY FOR DELIVERY', 'IN TRANSIT', 'DELIVERED'],
    },
    user_name: {
      type: String,
      required: true,
    },
    delivery_address: {
      type: String,
      required: true,
    },
    ordered_items: [
      {
        item_name: {
          type: String,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
        restaurant: {
          type: String,
          required: true,
        },
      },
    ],
    assigned_driver: {
      type: String,
      required: false,
    },
    driver_license_plate: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('order', orderSchema);
