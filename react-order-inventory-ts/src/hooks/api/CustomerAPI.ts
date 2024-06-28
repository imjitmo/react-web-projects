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

type CreateCustomerProps = {
  csFirstName: string;
  csLastName: string;
  csEmail: string;
  csRewardPoints: number;
  addedBy?: string | null;
};
export const createCustomer = async (values: CreateCustomerProps) => {
  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .select('*')
    .eq('csEmail', values.csEmail);
  if (customerError) {
    throw new Error(customerError.message);
  }
  if (customerData.length > 0) {
    throw new Error('Customer already exists');
  }
  const { data, error } = await supabase.from('customers').insert(values);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const checkExistingCustomer = async (email: string) => {
  const { data, error } = await supabase.from('customers').select('*').eq('csEmail', email).single();
  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error('Customer not found');
  }
  return data;
};

type UpdateCustomerProps = {
  id: string;
  csRewardPoints: number;
  updatedBy?: string | null;
};

export const addPointsToCustomer = async (customerData: UpdateCustomerProps) => {
  const { data, error } = await supabase
    .from('customers')
    .update({ csRewardPoints: customerData.csRewardPoints })
    .eq('id', customerData.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
type PinType = {
  email: string;
  pin: string;
};
export const createQrCode = async (customerData: PinType) => {
  const { data, error } = await supabase
    .from('customers')
    .select('csEmail')
    .eq('csEmail', customerData.email)
    .eq('csPin', customerData.pin);
  if (error) {
    throw new Error(error.message);
  }
  if (data.length <= 0) {
    throw new Error('Customer not found');
  }
  return data;
};

export const viewCustomerPoints = async (email: string) => {
  const { data, error } = await supabase.from('customers').select('*').eq('csEmail', email);
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const checkPin = async (pinData: PinType) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('csEmail', pinData.email)
    .eq('csPin', pinData.pin);
  if (error) {
    throw new Error(error.message);
  }
  console.log(data[0]);
  return data[0];
};
