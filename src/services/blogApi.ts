import { FormType } from '@/features/blogs/blog-form';
import { supabase } from '@/lib/supabase';
import { PAGE_SIZE } from '@/lib/utils';

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
async function getCategoryId(categoryName: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('category', categoryName.trim().toLowerCase());

  if (error) return null;

  return data.at(0)?.id;
}

interface GetBlogsType {
  category: string | null;
  search: string | null;
  page: number;
}

export async function getAllBlogs({ category, search, page }: GetBlogsType) {
  let query = supabase
    .from('blogs')
    .select(
      'id,title,created_at,image_url,categories(category),users(full_name,image_url)',
      { count: 'exact' }
    );
  // .eq('published', true);

  if (category) {
    const categoryId = await getCategoryId(category);
    query = query.eq('category_id', categoryId ?? 0);
  }

  if (search) query = query.ilike('title', `%${search}%`);

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query.order('created_at', {
    ascending: false,
  });

  if (error) throw new Error(error.message);

  return { data, count };
}

export async function getBlog(blogId: string | undefined) {
  if (!blogId) {
    throw new Error('Unable to fetch blog details.');
  }
  const { data, error } = await supabase
    .from('blogs')
    .select(
      'title,description,image_url,content,category_id,published_date,published,published_date,categories(category),users(id,full_name,image_url)'
    )
    .eq('id', blogId)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function totalBlogs() {
  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact' });

  return count;
}

export async function totalViews() {
  const { count } = await supabase
    .from('blog_views')
    .select('*', { count: 'exact' });

  return count;
}

export async function unPublishedBlogs() {
  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .eq('published', false);

  return count;
}

export async function publishArticle(id: string) {
  const { error } = await supabase
    .from('blogs')
    .update({ published: true })
    .eq('id', id);

  if (error) throw new Error(error.message);
}

export async function deleteBlog(blogId: string) {
  // console.log(blogId);
  const { error } = await supabase.from('blogs').delete().eq('id', blogId);

  if (error) throw new Error(error.message);
}

export async function createBlogView(blogId: string) {
  const { data, error } = await supabase
    .from('blog_views')
    .insert([
      {
        blog_id: blogId,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
