import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { Skeleton } from '../ui/skeleton';

import { dummyArray, titleCase } from '@/lib/utils';
import { getCategories } from '@/services/categories-api';

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  function handleClick(category: string) {
    searchParams.set('category', category);
    searchParams.delete('page');
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
                className={clsx(
                  'text-sm font-medium px-2 py-1 transition-colors hover:bg-secondary cursor-pointer',
                  { 'text-primary': selectedCategory === category.category }
                )}
                onClick={() => handleClick(category.category)}
                key={category.id}
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
