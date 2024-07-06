import supabase from './supabase';

type Users = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userType?: string;
};

export const loginUser = async (userData: Users) => {
  const { data, error } = await supabase.from('staffs').select('*').eq('email', userData.email);
  if (error) {
    throw new Error(error.message);
  }
  if (data[0]?.status) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  if (!data[0]?.status) {
    throw new Error('User is currently inactive. Please contact your administrator!');
  }
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const registerUser = async (userData: Users) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        displayName: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const { data: user, error } = await supabase.from('staffs').insert({
      displayName: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      userType: userData.userType,
    });
    if (error) {
      throw new Error(error.message);
    }

    return user;
  }
  return data;
};

export const listUsers = async () => {
  const { data, error } = await supabase
    .from('staffs')
    .select()
    .neq('userType', 'super')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateUserStatus = async (userData: { id: string; status: boolean }) => {
  const { data, error } = await supabase
    .from('staffs')
    .update({ status: userData.status })
    .eq('id', userData.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const checkUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

type UpdateType = {
  email?: string | undefined;
  displayName?: string;
  password?: string;
};

export const updateUserDisplayName = async (userData: UpdateType) => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      displayName: userData.displayName,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateUserPassword = async (userData: UpdateType) => {
  const { data, error } = await supabase.auth.updateUser({
    password: userData.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateStaffDisplayName = async (userData: UpdateType) => {
  const { data, error } = await supabase
    .from('staffs')
    .update({ displayName: userData.displayName })
    .eq('email', userData.email)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};
