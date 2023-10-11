const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    vehicle_model: {
      type: String,
      required: true,
    },
    vehicle_color: {
      type: String,
      required: true,
    },
    license_plate_number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('driver', driverSchema);
