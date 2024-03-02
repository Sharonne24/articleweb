import { Outlet } from 'react-router-dom';

import PublicHeader from './public-header';
import BlogsSidebar from './blogs-sidebar';
import Footer from './footer';

export default function PublicLayout() {
  return (
    <div className="h-dvh flex flex-col">
      <PublicHeader />
      <div className="flex-1 md:flex">
        <BlogsSidebar />
        <div className="px-6 md:px-8 lg:px-12 py-4 md:py-6 md:flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
