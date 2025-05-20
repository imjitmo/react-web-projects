import { UserImageUpdateProps, UserLogs, UserSignatureUpdateProps } from '../models/Users';
import supabase, { supabaseUrl } from './supabase';

export const addUserLogs = async (userData: UserLogs) => {
  const { data: user, error } = await supabase
    .from('tblLogs')
    .insert({
      userId: userData.userId,
      userEmail: userData.userEmail,
      userName: userData.userName,
      userType: userData.userType,
      action: userData.action,
    })
    .select();
  if (error) {
    throw error;
  }
  return user;
};

export const getAllUsers = async () => {
  const { data: user, error } = await supabase
    .from('userCreds')
    .select('*')
    .in('userType', ['admin', 'staff'])
    .order('userType', { ascending: false });
  if (error) {
    console.log(error);
    throw error;
  }

  return user;
};

export const getAllGuest = async () => {
  const { data: user, error } = await supabase.from('userCreds').select('*').eq('userType', 'guest');
  if (error) {
    throw error;
  }
  return user;
};

export const getSingleUser = async (id: string) => {
  const { data: user, error } = await supabase.from('userCreds').select('*').eq('userId', id).single();
  if (error) {
    console.log(error);
    throw error;
  }

  return user;
};

export const updateUserImage = async (userData: UserImageUpdateProps) => {
  console.log(userData);
  const imageInstance = userData.photo instanceof File ? userData.photo.name : null;
  const imageInstanceName = imageInstance?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${new Date().getTime()}_${Math.random()
    .toString(36)
    .slice(-8)}_${imageInstanceName?.substring(0, 8)}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/user/${imageName}`;
  console.log(imagePath);
  const { data, error } = await supabase
    .from('userCreds')
    .update({ photo: imagePath })
    .eq('userId', userData.id)
    .select();
  if (error) {
    console.log(error);
    throw new Error('Room image could not be updated');
  }

  const { error: uploadError } = await supabase.storage.from('user').upload(imageName, userData.photo);
  if (error) {
    console.error(uploadError);
    throw new Error('Room image could not be uploaded');
  }
  console.log(data);
  return data?.[0];
};

export const updateUserSignature = async (userData: UserSignatureUpdateProps) => {
  const imageInstance = userData.signature instanceof File ? userData.signature.name : null;
  const imageInstanceName = imageInstance?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${new Date().getTime()}_${Math.random()
    .toString(36)
    .slice(-8)}_${imageInstanceName?.substring(0, 8)}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/signature/${imageName}`;

  const { data, error } = await supabase
    .from('userCreds')
    .update({ signature: imagePath })
    .eq('userId', userData.id)
    .select();
  if (error) {
    console.log(error);
    throw new Error('Room image could not be updated');
  }

  const { error: uploadError } = await supabase.storage
    .from('signature')
    .upload(imageName, userData.signature);
  if (error) {
    console.error(uploadError);
    throw new Error('Signature could not be uploaded');
  }
  console.log(data);
  return data?.[0];
};

export const checkUserProfile = async (id: string) => {
  const { data: user, error } = await supabase
    .from('guestInfo')
    .select('*', { count: 'exact' })
    .eq('userId', id);
  if (error) {
    console.log(error);
    throw error;
  }
  return user;
};

interface GuestUpdateInformationProps {
  userId: string;
  contactNumber: string;
  homeAddress: string;
  streetName: string;
  brgyAddress: string;
  municipalAddress: string;
  provincialAddress: string;
  regionalAddress: string;
}
export const updateGuestInformation = async (guestData: GuestUpdateInformationProps) => {
  const { data: user, error } = await supabase.from('guestInfo').insert(guestData).select();
  if (error) {
    console.log(error);
    throw error;
  }
  return user;
};

interface GuestInformationProps {
  id?: string;
}

export const getGuestInformation = async (guestData: GuestInformationProps) => {
  const { data, error } = await supabase
    .from('userCreds')
    .select(`*, guestInfo(*)`)
    .eq('userId', guestData.id);
  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }
  return data[0];
};

export const getAllUserLogs = async () => {
  const { data, error } = await supabase
    .from('tblLogs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }
  return data;
};

interface UserStatus {
  id?: string;
  status: boolean;
}
export const updateUserStatus = async (userData: UserStatus) => {
  const { error } = await supabase
    .from('userCreds')
    .update({ status: userData.status })
    .eq('userId', userData.id);
  if (error) {
    console.error(error);
    throw new Error('Update Failed! Please try again!');
  }
  return;
};
