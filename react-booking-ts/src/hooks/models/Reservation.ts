export interface Reservation {
  userId?: string;
  roomId?: string;
  userName?: string;
  checkIn?: Date;
  checkOut?: Date;
  amenities?: object[];
  bookStatus?: string;
}
