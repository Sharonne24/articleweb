import { FormType } from '@/features/blogs/blog-form';
import { supabase } from '@/lib/supabase';

export async function createBlog(details: FormType) {
  const { category, content, imageUrl, title } = details;
  const { data, error } = await supabase
    .from('blogs')
    .insert([
      {
        title: title.trim().toLowerCase(),
        image_url: imageUrl,
        category_id: Number(category),
        content,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('title,created_at,categories(category)');
}
