import mongoose from 'mongoose';

const DataSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userGender: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    userAddress: {
      street: {
        type: String,
      },
      barangay: {
        type: String,
      },
      city: {
        type: String,
      },
      province: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Data = new mongoose.model('Data', DataSchema);
export default Data;
