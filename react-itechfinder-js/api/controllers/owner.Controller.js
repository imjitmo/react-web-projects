import Owners from '../models/Owners.js';
import Users from '../models/Users.js';
import errorHandler from '../utils/error.js';

export const ownerSetup = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'Unauthorized request'));
  }
  try {
    const checkOwner = await Owners.findOne({ userId: req.params.id, username: req.params.username });
    if (!checkOwner) {
      const newShop = new Owners({
        userId: req.params.id,
        username: req.params.username,
        shopName: req.body.shopName,
        ownerName: req.body.ownerName,
        shopAddress: {
          shopStreet: req.body.shopStreet,
          shopBarangay: req.body.shopBarangay,
        },
        shopType: req.body.shopType,
        gadgetList: req.body.gadgetList,
        permitNo: req.body.permitNo,
        permitPhoto: req.body.permitPhoto,
        geoCode: req.body.geoCode,
        socialLinks: {
          facebook: req.body.facebook,
          instagram: req.body.instagram,
          twitter: req.body.twitter,
          tiktok: req.body.tiktok,
          youtube: req.body.youtube,
          linkedin: req.body.linkedin,
        },
      });
      await newShop.save();
      const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          userType: 1,
          isOwner: true,
        },
        { new: true }
      );
      const { password, ...rest } = updateUser._doc;
      res.status(200).json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const showShop = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'Unauthorized request'));
  }
  try {
    const getShop = await Owners.findOne({ userId: req.params.id });
    res.status(201).json(getShop);
  } catch (err) {
    next(err);
  }
};

export const viewActiveShop = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const gadgetList =
    req.query.type === 'all' || req.query.type === undefined
      ? { $in: ['iphone', 'smartphone', 'laptop', 'mac', 'desktop', 'console', 'appliances'] }
      : req.query.type;

  const shopBarangay =
    req.query.loc === 'all' || req.query.loc === undefined
      ? {
          $in: [
            'bagumbayan',
            'cabog-cabog',
            'munting batangas',
            'cataning',
            'central',
            'cupang proper',
            'cupang west',
            'dangcol',
            'ibayo',
            'malabia',
            'poblacion barcenas',
            'pto. rivas ibaba',
            'pto. rivas itaas',
            'san jose',
            'sibacan',
            'camacho',
            'talisay',
            'tanato',
            'tenejero',
            'tortugas',
            'tuyo',
            'bagong silang',
            'cupang north',
            'doña francisca',
          ],
        }
      : req.query.loc;
  try {
    const activeShop = await Owners.find({
      isApproved: true,
      gadgetList,
      'shopAddress.shopBarangay': shopBarangay,
    })
      .limit(limit)
      .skip(startIndex);
    activeShop.length === 0 ? res.status(200).json({ error: true }) : res.status(201).json(activeShop);
  } catch (err) {
    next(err);
  }
};

export const showPendingOwners = async (req, res, next) => {
  try {
    const pendingOwners = await Owners.find({ isApproved: false });
    pendingOwners.length === 0 ? res.status(200).json({ error: true }) : res.status(201).json(pendingOwners);
  } catch (err) {
    next(err);
  }
};

export const showAll = async (req, res, next) => {
  try {
    const shopLists = await Owners.find().sort({ createdAt: -1 });
    const userLists = await Users.find().sort({ createdAt: -1 });
    const pendingOwner = shopLists.filter((shop) => shop.isApproved === false);
    const approvedShops = shopLists.filter((shop) => shop.isApproved === true);
    !shopLists || !userLists
      ? res.status(200).json({ error: true })
      : res.status(201).json({
          pendingOwner: pendingOwner,
          approvedShops: approvedShops,
          shopCount: shopLists,
          userCount: userLists,
        });
  } catch (err) {
    next(err);
  }
};

export const updateApplication = async (req, res, next) => {
  const applyStatus = req.body.applyStatus;
  const isApproved = typeof applyStatus === 'boolean' && applyStatus;
  const repeatReason = typeof applyStatus === 'boolean' ? [] : req.body.applyStatus.split('_');
  const isRepeat = repeatReason.length > 0 ? true : false;
  const shopId = req.params.id;
  const isOwner = isApproved ? true : false;
  try {
    const updateStore = await Owners.findByIdAndUpdate(
      { _id: shopId },
      {
        $set: {
          isApproved,
          isRepeat,
          repeatReason,
        },
      }
    );
    await Users.findByIdAndUpdate(req.body.userId, { userType: isOwner ? 1 : 0 });
    updateStore
      ? res.status(201).json({ error: false, success: shopId })
      : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};

export const getShop = async (req, res, next) => {
  const shopId = req.params.id;

  try {
    const getShop = await Owners.findOne({ _id: shopId });
    res.status(201).json(getShop);
  } catch (err) {
    next(err);
  }
};

export const showFavouriteShops = async (req, res, next) => {
  try {
    const favouriteList = await Owners.find({
      followers: {
        $in: req.user.id,
      },
    });
    favouriteList.length > 0 ? res.status(201).json(favouriteList) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};
