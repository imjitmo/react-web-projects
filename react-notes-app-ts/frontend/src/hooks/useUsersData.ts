import { User } from '@/models/Users';
import axios from 'axios';

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  try {
    const res = await axios(`${input}`, init);

    return res;
  } catch (err) {
    console.error(err);
    const errorBody = err;
    const errorMessage: string = errorBody?.message;
    throw new Error(errorMessage);
  }
};

export async function getLoggedInUser(): Promise<User> {
  try {
    const res = await fetchData('/api/users', { method: 'GET' });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUpUser(credentials: SignUpCredentials): Promise<User> {
  try {
    const res = await fetchData('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: credentials,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export interface loginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: loginCredentials): Promise<User> {
  try {
    console.log(credentials);
    const res = await fetchData('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: credentials,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout() {
  await fetchData('/api/users/logout', { method: 'POST' });
}
