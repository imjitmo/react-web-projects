import { UserLogs } from '../models/Users';
import supabase from './supabase';

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
