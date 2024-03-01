import { SearchIcon } from 'lucide-react';
import { useDebounceCallback } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  placeholder: string;
  className?: string;
}

export default function SearchInput({ placeholder, className }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useDebounceCallback((term: string) => {
    if (term) {
      searchParams.set('search', term);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={cn(
          'peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm  focus-visible:outline-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 placeholder:text-gray-500',
          className
        )}
        onChange={e => handleSearch(e.target.value)}
        placeholder={placeholder}
        defaultValue={searchParams.get('search')?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
