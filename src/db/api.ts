import { supabase } from './supabase';
import type { Registration, RegistrationInput } from '@/types';

/**
 * Create a new hackathon registration
 */
export async function createRegistration(data: RegistrationInput): Promise<Registration> {
  const { data: registration, error } = await supabase
    .from('registrations')
    .insert([data])
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!registration) {
    throw new Error('Failed to create registration');
  }

  return registration;
}

/**
 * Get all registrations
 */
export async function getRegistrations(): Promise<Registration[]> {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return Array.isArray(data) ? data : [];
}

/**
 * Check if email is already registered
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('registrations')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    throw new Error(error.message);
  }

  return !!data;
}

/**
 * Get registration count
 */
export async function getRegistrationCount(): Promise<number> {
  const { count, error } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw new Error(error.message);
  }

  return count || 0;
}
