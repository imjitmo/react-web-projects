import supabase from './supabase';

interface dateProps {
  startDate?: Date;
  endDate?: Date;
}

export const getReservationReports = async (date: dateProps) => {
  const { data, error } = await supabase
    .from('tblReservation')
    .select('*')
    .gte('created_at', date.startDate ? date.startDate.toISOString() : '')
    .lte('created_at', date.endDate ? date?.endDate.toISOString() : '')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserLogsReports = async (date: dateProps) => {
  const { data, error } = await supabase
    .from('tblLogs')
    .select('*')
    .gte('created_at', date.startDate ? date.startDate.toISOString() : '')
    .lte('created_at', date.endDate ? date?.endDate.toISOString() : '')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
