import supabase, { supabaseUrl } from './supabase';

export const getInventories = async () => {
  const { data: inventory, error } = await supabase.from('inventory').select();
  if (error) {
    console.error(error);
    throw new Error('Inventory could not be retrieved');
  }

  return inventory;
};

export const addInventory = async (data: any) => {
  const { data: inventoryData, error } = await supabase.from('inventory').insert(data);

  if (error) {
    console.error(error);
    throw new Error('Inventory could not be created');
  }

  return inventoryData;
};
