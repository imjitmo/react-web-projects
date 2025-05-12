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

export const viewReservations = async () => {
  const { data, error } = await supabase
    .from('tblReservation')
    .select(`*, tblRooms(roomName, roomNumber, roomPrice)`);
  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }
  return data;
};

interface ReservationUpdateProps {
  id: string;
  bookStatus?: string;
  bookTracking?: string;
}

interface ViewReservationProps {
  id: string;
}

export const getReservationInformation = async (guestData: ViewReservationProps) => {
  console.log(guestData);
  const { data, error } = await supabase
    .from('tblReservation')
    .select(`*, tblRooms(roomName, roomNumber, roomPrice)`)
    .eq('id', guestData.id);
  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }
  console.log(data[0]);
  return data[0];
};

export const updateTrackingStatus = async (reservationData: ReservationUpdateProps) => {
  const { data, error } = await supabase
    .from('tblReservation')
    .update({ bookTracking: reservationData.bookTracking })
    .eq('id', reservationData.id);
  if (error) {
    throw new Error('Reservation status could not be updated');
  }
  console.log(reservationData);
  return data;
};

export const updateBookingStatus = async (reservationData: ReservationUpdateProps) => {
  const { data, error } = await supabase
    .from('tblReservation')
    .update({ bookStatus: reservationData.bookStatus })
    .eq('id', reservationData.id);
  if (error) {
    throw new Error('Reservation status could not be updated');
  }
  console.log(reservationData);
  return data;
};
