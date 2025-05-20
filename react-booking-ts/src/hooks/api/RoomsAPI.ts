import { RoomImageUpdateProps, RoomsCreationProps, RoomUpdateProps } from '../models/Rooms';
import supabase, { supabaseUrl } from './supabase';

export const createRoom = async (roomData: RoomsCreationProps) => {
  const imageInstance = roomData.roomImg instanceof File ? roomData.roomImg.name : null;
  const imageInstanceName = imageInstance?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${new Date().getTime()}_${Math.random()
    .toString(36)
    .slice(-8)}_${imageInstanceName?.substring(0, 8)}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;

  const { data: room, error: roomError } = await supabase.from('tblRooms').insert({
    roomName: roomData.roomName,
    roomNumber: roomData.roomNumber,
    roomType: roomData.roomType,
    roomPrice: roomData.roomPrice,
    roomBed: roomData.roomBed,
    roomTb: roomData.roomTb,
    roomDesc: roomData.roomDesc,
    roomStatus: roomData.roomStatus,
    roomImg: imagePath,
  });
  if (roomError) {
    console.error(roomError);
    throw new Error('Room could not be created');
  }

  const { error } = await supabase.storage.from('images').upload(imageName, roomData.roomImg);
  if (error) {
    console.error(error);
    throw new Error('Room image could not be uploaded');
  }

  return room;
};

export const viewRooms = async () => {
  const { data: rooms, error } = await supabase
    .from('tblRooms')
    .select('*')
    .order('roomStatus', { ascending: true });
  if (error) {
    throw new Error('Rooms could not be fetched');
  }
  return rooms;
};

export const viewAvailableRooms = async () => {
  const { data: rooms, error } = await supabase
    .from('tblRooms')
    .select('*')
    .eq('roomStatus', 'available')
    .order('roomStatus', { ascending: true });
  if (error) {
    throw new Error('Rooms could not be fetched');
  }
  return rooms;
};

export const updateRoomInformation = async (roomData: RoomUpdateProps) => {
  const { data, error } = await supabase
    .from('tblRooms')
    .update({
      roomName: roomData.roomName,
      roomNumber: roomData.roomNumber,
      roomType: roomData.roomType,
      roomPrice: roomData.roomPrice,
      roomBed: roomData.roomBed,
      roomTb: roomData.roomTb,
      roomDesc: roomData.roomDesc,
      roomStatus: roomData.roomStatus,
    })
    .eq('id', roomData.id);
  if (error) {
    throw new Error('Room information could not be updated');
  }
  return data;
};

export const updateRoomImage = async (roomData: RoomImageUpdateProps) => {
  const imageInstance = roomData.roomImg instanceof File ? roomData.roomImg.name : null;
  const imageInstanceName = imageInstance?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${new Date().getTime()}_${Math.random()
    .toString(36)
    .slice(-8)}_${imageInstanceName?.substring(0, 8)}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;
  const { data, error } = await supabase
    .from('tblRooms')
    .update({ roomImg: imagePath })
    .eq('id', roomData.id);
  if (error) {
    throw new Error('Room image could not be updated');
  }

  const { error: uploadError } = await supabase.storage.from('images').upload(imageName, roomData.roomImg);
  if (error) {
    console.error(uploadError);
    throw new Error('Room image could not be uploaded');
  }

  return data;
};

export const updateRoomStatus = async (roomData: { id: string; status: string }) => {
  const newStatus = roomData.status;
  const { data, error } = await supabase
    .from('tblRooms')
    .update({ roomStatus: newStatus })
    .eq('id', roomData.id);
  if (error) {
    throw new Error('Room status could not be updated');
  }
  return data;
};

export const viewSingleRoomInformation = async (roomId: string) => {
  const { data: room, error } = await supabase.from('tblRooms').select('*').eq('id', roomId);
  if (error) {
    throw new Error('Room information could not be fetched');
  }
  return room[0];
};

export const getRandomRooms = async () => {
  const { data: rooms, error } = await supabase.from('random_rooms').select('*').limit(5);
  if (error) {
    throw new Error('Rooms could not be fetched');
  }
  return rooms;
};
