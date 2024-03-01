import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getAllBlogs } from '@/services/blogApi';

export function useBlogs() {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search');
  const categoryValue = searchParams.get('category');
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const category =
    !categoryValue || categoryValue === 'all' ? null : categoryValue;

  const { isLoading, data: { data: blogs, count } = {} } = useQuery({
    queryKey: ['all-blogs', searchValue, category],
    queryFn: () => getAllBlogs({ category, search: searchValue, page }),
  });

  return { isLoading, blogs, count };
}
