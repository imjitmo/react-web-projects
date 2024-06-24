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

export const createOrder = async (orderData: string) => {
  const { data, error } = await supabase.from('order').insert({ orderStaffName: orderData }).select();
  if (error) {
    throw new Error(error.message);
  }

  return data[0].id;
};

export const cancelOrder = async (orderId: string) => {
  const { data, error } = await supabase.from('order').delete().match({ id: orderId });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export type Order = {
  id: string;
  orderItemQuantity: number;
  orderTotalPrice: number;
};
export const updateCurrentOrder = async (orderData: Order) => {
  const { data, error } = await supabase.from('order').update(orderData).eq('id', orderData.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

interface OrderList {
  dishId: string;
  dishName: string;
  orderId: string;
  dishPrice: number;
  dishQuantity: number;
  quantity: number;
  totalPrice: number;
  dishImage?: string;
}

export const addToOrderList = async (orderListData: OrderList[]) => {
  console.log(orderListData);
  const newOrderList = orderListData.map((order) => {
    return {
      dishId: order.dishId,
      orderId: order.orderId,
      dishName: order.dishName,
      dishPrice: order.dishPrice,
      orderQuantity: order.quantity,
      totalPrice: order.totalPrice,
      order_month: new Date().getMonth() + 1,
      order_year: new Date().getFullYear(),
    };
  });

  const { data, error } = await supabase.from('order_list').insert(newOrderList).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
