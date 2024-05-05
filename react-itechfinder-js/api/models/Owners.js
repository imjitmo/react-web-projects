import mongoose from 'mongoose';

const OwnerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      requred: true,
      unique: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    shopAddress: {
      shopStreet: {
        type: String,
        required: true,
      },
      shopBarangay: {
        type: String,
        required: true,
      },
      shopCity: {
        type: String,
        default: 'Balanga',
      },
      shopProvince: {
        type: String,
        default: 'Bataan',
      },
    },
    shopType: {
      type: Array,
      required: true,
      default: [],
    },
    gadgetList: {
      type: Array,
      required: true,
      default: [],
    },
    permitNo: {
      type: String,
      required: true,
    },
    permitPhoto: {
      type: String,
      required: true,
    },
    geoCode: {
      type: Array,
      required: true,
      default: [],
    },
    socialLinks: {
      facebook: {
        type: String,
        default: '',
      },
      instagram: {
        type: String,
        default: '',
      },
      twitter: {
        type: String,
        default: '',
      },
      tiktok: {
        type: String,
        default: '',
      },
      youtube: {
        type: String,
        default: '',
      },
      linkedin: {
        type: String,
        default: '',
      },
    },
    isApproved: {
      type: Boolean,
      default: false,
      required: true,
    },
    isRepeat: {
      type: Boolean,
      default: false,
      required: true,
    },
    repeatReason: {
      type: Array,
      default: [],
    },
    followers: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    raters: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Owners = new mongoose.model('Owners', OwnerSchema);
export default Owners;
