import BlogsLoadingSkeleton from './blogs-loading-skeleton';

import BlogCard from './blog-card';
import { useBlogs } from './use-blogs';
import NoPost from './no-post';

export default function BlogCards() {
  const { isLoading, blogs } = useBlogs();
  return (
    <>
      {!blogs || (!blogs.length && <NoPost />)}
      {isLoading ? (
        <BlogsLoadingSkeleton />
      ) : (
        <div className="mt-4 md:mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {blogs?.map(blog => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              blogUrl={blog.image_url}
              category={blog.categories?.category as string}
              createdAt={new Date(blog.created_at)}
              description={blog.description!}
              title={blog.title}
              authorName={blog.users?.full_name as string}
              authorImageUrl={blog.users?.image_url ?? null}
            />
          ))}
        </div>
      )}
    </>
  );
}
