import { Inventory } from '../models/Inventory';
import supabase from './supabase';

export const getInventories = async () => {
  const { data: inventory, error } = await supabase
    .from('inventory')
    .select()
    .order('id', { ascending: true });
  if (error) {
    console.error(error);
    throw new Error('Inventory could not be retrieved');
  }

  return inventory;
};

export const addInventory = async (data: Inventory) => {
  const { data: inventoryData, error } = await supabase.from('inventory').insert(data);

  if (error) {
    console.error(error);
    throw new Error('Inventory could not be created');
  }

  return inventoryData;
};

export const updateInventory = async (data: Inventory) => {
  const { data: inventoryData, error } = await supabase.from('inventory').update(data).eq('id', data.id);

  if (error) {
    console.error(error);
    throw new Error('Inventory could not be updated');
  }
  return inventoryData;
};
