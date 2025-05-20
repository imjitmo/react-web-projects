import { Users } from '../models/Users';
import supabase from './supabase';

export const registerUser = async (userData: Users) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });
  if (error) {
    throw error;
  }
  if (data) {
    const { data: user, error } = await supabase
      .from('userCreds')
      .insert({
        company: userData.company,
        firstName: userData.firstName,
        middleName: userData.middleName === undefined ? '' : userData.middleName,
        lastName: userData.lastName,
        email: userData.email,
        userType: userData.userType,
        section: userData.section,
        photo: 'https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/user/photo_profile.webp',
        status: true,
      })
      .select();
    if (error) {
      throw error;
    }
    return user;
  }
};

export const loginUser = async (user: Users) => {
  const { data: login, error } = await supabase.from('userCreds').select('*').eq('email', user.email);
  if (error) {
    throw error;
  }

  if (login[0]?.status) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      throw error;
    }
    return { ...data, ...login[0] };
  }

  if (!login[0]?.status) {
    throw new Error('User is currently inactive. Please contact your administrator!');
  }
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const checkUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
