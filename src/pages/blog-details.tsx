import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import BlogDetail from '@/features/blogs/blog-detail';
import BlogDetailSkeleton from '@/features/blogs/blog-detail-skeleton';
import { getBlog } from '@/services/blogApi';
import BlogNotFound from '@/features/blogs/blog-not-found';

export default function BlogDetails() {
  const { id } = useParams();

  const { isLoading, data: blog } = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => getBlog(id),
  });

  if (isLoading) return <BlogDetailSkeleton />;

  if (!blog) return <BlogNotFound />;

  const formattedBlog = {
    id,
    title: blog.title,
    description: blog.description,
    publishedDate: blog.published_date,
    blogPoster: blog.image_url,
    categoryId: blog.category_id,
    category: blog.categories?.category as string,
    content: blog.content,
    author: {
      id: blog.users?.id as string,
      imageUrl: blog.users?.image_url,
      fullName: blog.users?.full_name as string,
    },
  };

  return <BlogDetail blog={formattedBlog} />;
}
