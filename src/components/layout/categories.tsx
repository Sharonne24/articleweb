import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '../ui/skeleton';

import { dummyArray, titleCase } from '@/lib/utils';
import { getCategories } from '@/services/categories-api';

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  function handleClick(category: string) {
    searchParams.set('category', category);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <p className="text-primary font-medium mb-2">Blog categories</p>
      {isLoading ? (
        <Skeletons />
      ) : (
        <div className="space-y-2">
          {categories &&
            [{ id: 0, category: 'all' }, ...categories].map(category => (
              <div
                className="text-sm font-medium px-2 py-1 transition-colors hover:bg-secondary cursor-pointer"
                onClick={() => handleClick(category.category)}
              >
                {titleCase(category.category)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function Skeletons() {
  return (
    <div className="space-y-1">
      {dummyArray(5).map((_, i) => (
        <Skeleton key={i} className="w-56 h-8" />
      ))}
    </div>
  );
}
