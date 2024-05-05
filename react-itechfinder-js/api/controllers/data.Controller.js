import Data from '../models/Data.js';
import errorHandler from '../utils/error.js';

export const newData = async (req, res, next) => {
  const { id, username } = req.params;
  const { firstName, lastName, userGender, contactNumber, userAddress } = req.body;
  try {
    const newData = new Data({
      userId: id,
      username,
      firstName,
      lastName,
      userGender,
      contactNumber,
      userAddress,
    });
    await newData.save();
    res.status(201).json({ message: 'Data created successfully!' });
  } catch (err) {
    next(err);
  }
};

export const getData = async (req, res, next) => {
  const { id, username } = req.params;
  try {
    const getData = await Data.findOne({ userId: id, username });
    getData ? res.status(201).json(getData) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};

export const updateData = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, userGender, contactNumber } = req.body;
  try {
    const updateData = await Data.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName,
          lastName,
          userGender,
          contactNumber,
        },
      },
      { new: true }
    );

    updateData ? res.status(201).json(updateData) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};
