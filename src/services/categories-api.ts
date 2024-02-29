import { supabase } from '@/lib/supabase';

export async function createCategory(categoryName: string) {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ category: categoryName.trim().toLowerCase() }])
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
