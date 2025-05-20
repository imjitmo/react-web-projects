export interface RoomsCreationProps {
  roomName: string;
  roomNumber: number;
  roomType: string;
  roomImg: File | string;
  roomPrice: number;
  roomBed: number;
  roomTb?: number;
  roomDesc: string;
  roomStatus: string;
}

export interface RoomUpdateProps {
  id?: string;
  roomName?: string;
  roomNumber?: number;
  roomType?: string;
  roomImg?: File | string;
  roomPrice?: number;
  roomBed?: number;
  roomTb?: number;
  roomDesc?: string;
  roomStatus?: string;
}

export interface RoomImageUpdateProps {
  id?: string;
  roomImg: File | string;
}
