import { FormType } from '@/features/blogs/blog-form';
import { supabase } from '@/lib/supabase';

export async function createBlog(details: FormType) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session || !session.user)
    throw new Error('Unauthorized. You need to be logged in to create a blog.');

  const { category, content, imageUrl, title } = details;
  const { data, error } = await supabase
    .from('blogs')
    .insert([
      {
        title: title.trim().toLowerCase(),
        image_url: imageUrl,
        category_id: Number(category),
        content,
        author_id: session.user.id,
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
    .select('id,title,published,created_at,categories(category)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function getAllBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select(
      'id,title,created_at,description,image_url,categories(category),users(full_name,image_url)'
    )
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}
