import { Reservation } from '../models/Reservation';
import supabase from './supabase';

export const addReservation = async (reservationData: Reservation) => {
  const { data, error } = await supabase.from('tblReservation').insert({
    userId: reservationData.userId ? reservationData.userId : null,
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
    .select(`*, tblRooms(roomName, roomNumber, roomPrice)`)
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }

  return data;
};

export const viewGuestReservations = async (userId: string) => {
  const { data, error } = await supabase
    .from('tblReservation')
    .select(`*, tblRooms(roomName, roomNumber, roomPrice)`)
    .eq('userId', userId);
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
  paymentType?: string;
}

interface ViewReservationProps {
  id: string;
}

export const getReservationInformation = async (guestData: ViewReservationProps) => {
  const { data, error } = await supabase
    .from('tblReservation')
    .select(`*, tblRooms(roomName, roomNumber, roomPrice)`)
    .eq('id', guestData.id);
  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }

  return data[0];
};

export const updateTrackingStatus = async (reservationData: ReservationUpdateProps) => {
  const { data, error } = await supabase
    .from('tblReservation')
    .update({ bookTracking: reservationData.bookTracking, paymentType: reservationData.paymentType })
    .eq('id', reservationData.id);
  if (error) {
    throw new Error('Reservation status could not be updated');
  }
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

  return data;
};

interface ReserveCountProps {
  userId?: string;
}
export const getGuestReserveCount = async (countProps: ReserveCountProps) => {
  const { data, error } = await supabase
    .from('tblReservation')
    .select('*')
    .eq('userId', `${countProps.userId}`);
  if (error) {
    throw new Error('Reservation count could not be retrieved');
  }
  return data;
};

interface ExtrasTypes {
  reserveId?: string;
  extrasName: string;
  extrasPrice: number;
  extrasQty: number;
}
export const addReservationExtras = async (extrasData: ExtrasTypes) => {
  const { data, error } = await supabase.from('tblExtras').insert(extrasData);
  if (error) {
    console.log(error);
    throw new Error('Extras could not be added');
  }
  return data;
};

export const getReservationExtras = async (reserveData: { reserveId: string }) => {
  const { data, error } = await supabase.from('tblExtras').select('*').eq('reserveId', reserveData.reserveId);
  if (error) {
    console.error(error);
    throw new Error('Reservation could not be fetched');
  }
  return data;
};
