import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';

export default function AppLayout() {
  return (
    <div className="flex h-dvh py-2">
      <aside className="hidden md:block md:w-72 h-full ">
        <Sidebar />
      </aside>
      <main className="h-full md:rounded-sm md:border flex-1 ">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
