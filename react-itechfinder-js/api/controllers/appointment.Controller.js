import Appointment from '../models/Appointment.js';
import Owners from '../models/Owners.js';
import errorHandler from '../utils/error.js';

export const createAppointment = async (req, res, next) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    newAppointment
      ? res.status(201).json(newAppointment)
      : res.status(200).json({ error: 'Failed to create appointment' });
  } catch (err) {
    next(err);
  }
};

export const getAppointments = async (req, res, next) => {
  const { id, type } = req.params;
  const queue = type === 'owner' ? { ownerId: id } : { userId: id };
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  try {
    const appointments = await Appointment.find(queue).limit(limit).skip(startIndex).sort({ createdAt: -1 });
    appointments.length > 0 ? res.status(201).json(appointments) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req, res, next) => {
  const { id } = req.params;
  const { status, reason } = req.body;
  try {
    const storeCurrentRate = await Owners.findOne({ _id: id });
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: { status, cancelReason: reason?.split('_'), userRead: false } },
      { new: true }
    );
    appointment ? res.status(201).json(appointment) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};

export const readAppointment = async (req, res, next) => {
  const { id, userType } = req.params;
  const setRead = userType === 'owner' ? { ownerRead: true } : { userRead: true };
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, setRead, { new: true });
    appointment ? res.status(201).json(appointment) : res.status(200).json({ error: true });
  } catch (err) {
    next(err);
  }
};

export const rateAppointment = async (req, res, next) => {
  const { id, shopId } = req.params;
  const { rating } = req.body;
  try {
    const storeCurrentRate = await Owners.find({ _id: shopId });
    const currRate = storeCurrentRate.length > 0 ? storeCurrentRate[0].rating : false;
    const currRater = storeCurrentRate.length > 0 ? storeCurrentRate[0].raters : false;
    if (currRate !== false && currRater !== false) {
      const totalRate = currRate + rating;
      const totalRater = currRater + 1;
      const appointment = await Appointment.findByIdAndUpdate(id, { $set: { rating } }, { new: true });
      const store = await Owners.findByIdAndUpdate(
        shopId,
        { $set: { rating: totalRate, raters: totalRater } },
        { new: true }
      );
      appointment && store ? res.status(201).json(appointment) : res.status(200).json({ error: true });
    } else {
      return res.status(200).json({ error: true });
    }
  } catch (err) {
    next(err);
  }
};
