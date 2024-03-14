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

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return categories;
}

export async function deleteCategory(categoryId: number) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) throw new Error(error.message);
}
