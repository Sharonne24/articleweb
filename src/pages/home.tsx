import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { CustomSelect } from '@/components/ui/basic-select';
import SearchInput from '@/components/ui/search-input';
import BlogCards from '@/features/blogs/blog-cards';
import { Skeleton } from '@/components/ui/skeleton';

import { getCategories } from '@/services/categories-api';
import { titleCase } from '@/lib/utils';

function Home() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const formattedData = categories?.map(category => ({
    value: category.category.toLowerCase(),
    label: titleCase(category.category),
  }));

  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(category: string) {
    searchParams.set('category', category);
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="block md:hidden space-y-2">
        <SearchInput placeholder="Search articles..." className="w-full" />
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <CustomSelect
            placeholder="Filter by category"
            options={
              (formattedData && [
                { value: 'all', label: 'All' },
                ...formattedData,
              ]) ||
              []
            }
            className="w-full"
            onChange={(value: string) => handleChange(value)}
          />
        )}
      </div>
      <BlogCards />
    </>
  );
}

export default Home;
