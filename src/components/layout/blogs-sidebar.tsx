import { useParams } from 'react-router-dom';
import SearchInput from '../ui/search-input';
import Categories from './categories';

export default function BlogsSidebar() {
  const params = useParams();
  const hasParams = Object.keys(params).length > 0;
  return (
    <aside className="hidden md:block md:w-1/4 shrink-0 py-4 md:py-6 px-4 space-y-4">
      {!hasParams && (
        <>
          <SearchInput placeholder="Search articles..." className="w-full" />
          <Categories />
        </>
      )}
    </aside>
  );
}
