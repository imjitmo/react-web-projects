import supabase from './supabase';

export const getCustomers = async () => {
  const { data, error } = await supabase.from('customers').select('*');
  if (error) {
    console.error(error);
    throw new Error('Customers could not be fetched');
  }
  return data;
};
