import { supabase } from '@/lib/supabase';
import { UserRole } from '@/index';

interface UserDetails {
  name: string;
  password: string;
  email: string;
  role: UserRole;
  imageUrl?: string;
}

export async function createUser(details: UserDetails) {
  const { data, error } = await supabase.auth.signUp({
    email: details.email,
    password: details.password,
    options: {
      data: {
        role: details.role,
        imageUrl: null,
        fullName: details.name.toLowerCase(),
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
