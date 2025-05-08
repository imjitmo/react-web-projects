import { Reservation } from '../models/Reservation';
import supabase from './supabase';

export const addReservation = async (reservationData: Reservation) => {
  const { data, error } = await supabase.from('tblReservation').insert({
    roomId: reservationData.roomId,
    userName: reservationData.userName,
    checkIn: reservationData.checkIn,
    checkOut: reservationData.checkOut,
    amenities: reservationData.amenities,
    bookStatus: reservationData.bookStatus,
  });

  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }
  return data;
};
