import supabase from './supabase';

export const getCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    throw new Error('Customers could not be fetched');
  }
  return data;
};

export const createQrCode = async (email: string) => {
  const { data, error } = await supabase.from('customers').select('csEmail').eq('csEmail', email);
  if (error) {
    throw new Error(error.message);
  }
  if (data.length <= 0) {
    throw new Error('Customer not found');
  }
  return data;
};
