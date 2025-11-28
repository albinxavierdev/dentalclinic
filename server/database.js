import { supabase } from './supabase.js';

// ===== APPOINTMENTS =====

export const getAllAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getAppointmentById = async (id) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createAppointment = async (data) => {
  const { data: result, error } = await supabase
    .from('appointments')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        date: data.date,
        time: data.time,
        special_request: data.special_request || ''
      }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return result.id;
};

export const updateAppointment = async (id, data) => {
  const { data: result, error } = await supabase
    .from('appointments')
    .update({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
      special_request: data.special_request || ''
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const updateAppointmentStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteAppointment = async (id) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { message: 'Appointment deleted successfully' };
};

// ===== SETTINGS =====

export const getAllSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*');
  
  if (error) throw error;
  
  const settings = {};
  data.forEach(row => {
    settings[row.key] = row.value;
  });
  return settings;
};

export const getSetting = async (key) => {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();
  
  if (error) throw error;
  return data ? data.value : null;
};

export const updateSetting = async (key, value) => {
  const { data, error } = await supabase
    .from('settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateMultipleSettings = async (settings) => {
  const updates = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString()
  }));

  const { data, error } = await supabase
    .from('settings')
    .upsert(updates)
    .select();
  
  if (error) throw error;
  return data;
};

// ===== SERVICES =====

export const getAllServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

export const getActiveServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name');
  
  if (error) throw error;
  return data;
};

export const getServiceById = async (id) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createService = async (data) => {
  const { data: result, error } = await supabase
    .from('services')
    .insert([
      {
        name: data.name,
        description: data.description || '',
        is_active: data.is_active !== undefined ? data.is_active : true
      }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return result.id;
};

export const updateService = async (id, data) => {
  const { data: result, error } = await supabase
    .from('services')
    .update({
      name: data.name,
      description: data.description || '',
      is_active: data.is_active !== undefined ? data.is_active : true
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const deleteService = async (id) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { message: 'Service deleted successfully' };
};
