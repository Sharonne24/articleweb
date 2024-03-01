import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/categories-api';

export function useCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return { categories, isLoading };
}
