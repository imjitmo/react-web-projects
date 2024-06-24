import supabase from './supabase';

export const viewBestSellers = async () => {
  const { data, error } = await supabase.from('best_seller').select('*').limit(3);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const viewOrders = async () => {
  const { data, error } = await supabase.from('order').select('*').order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const viewOrderByDate = async (startDate: Date, endDate: Date) => {
  const { data, error } = await supabase
    .from('order')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};