import { capitalizeFirstLetter, formatDateLong } from '@/lib/utils';
import BlogNotFound from './blog-not-found';
import parse from 'html-react-parser';

interface BlogDetailProps {
  blog: {
    id: string | undefined;
    title: string;
    description: string | null;
    publishedDate: string | null;
    blogPoster: string;
    categoryId: number;
    category: string;
    content: string;
    author: {
      id: string;
      imageUrl: string | null | undefined;
      fullName: string;
    };
  };
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  const { publishedDate, title, description, blogPoster, content } = blog;

  if (!publishedDate) return <BlogNotFound />;

  return (
    <>
      <header>
        <div className="flex flex-col gap-2 items-center pt-4">
          <div className="text-xs text-primary">
            Published on {formatDateLong(new Date(publishedDate))}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-display">
            {capitalizeFirstLetter(title)}
          </h1>
          {description && (
            <div className="max-w-md text-center">
              <p className="text-sm text-muted-foreground ">
                {capitalizeFirstLetter(description)}
              </p>
            </div>
          )}
        </div>
      </header>
      <div className="mt-4 w-full lg:w-3/4 aspect-video h-auto lg:mx-auto">
        <img
          src={blogPoster}
          alt={`${title} poster`}
          className="object-cover rounded-sm w-full "
        />
      </div>
      <div className="max-w-2xl mx-auto mt-4 [&>h2]:text-lg [&>h2]:md:text-xl [&>h2]:mb-2 [&>h2]:font-semibold [&>p]:text-sm blog">
        {parse(content)}
      </div>
    </>
  );
}
