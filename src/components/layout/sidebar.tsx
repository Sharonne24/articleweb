import { AlignJustify, Home, LogOut, Rss } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';

import { logOut } from '@/services/auth';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="px-4 h-full flex flex-col gap-4">
      <img src="/logo/kcj.png" alt="logo" className="h-32 w-auto mx-auto" />
      <nav>
        <ul className="space-y-2">
          <li className="block transition-all hover:bg-secondary hover:text-sky-900 hover:font-bold hover:dark:text-100 rounded-sm px-4 py-2">
            <Link to="/dashboard" className="flex items-center gap-3">
              <Home className="icon" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>
          <li className="block transition-all hover:bg-secondary hover:text-sky-900 hover:font-bold hover:dark:text-100 rounded-sm px-4 py-2">
            <Link to="/categories" className="flex items-center gap-3">
              <AlignJustify className="icon" />
              <span className="text-sm font-medium">Categories</span>
            </Link>
          </li>
          <li className="block transition-all hover:bg-secondary hover:text-sky-900 hover:font-bold hover:dark:text-100 rounded-sm px-4 py-2">
            <Link to="/blogs/list" className="flex items-center gap-3">
              <Rss className="icon" />
              <span className="text-sm font-medium">Blogs</span>
            </Link>
          </li>
          {/* <li className="block transition-all hover:bg-secondary hover:text-sky-900 hover:font-bold hover:dark:text-100 rounded-sm px-4 py-2">
            <Link to="/authors" className="flex items-center gap-3">
              <Users className="icon" />
              <span className="text-sm font-medium">Authors</span>
            </Link>
          </li> */}
          {/* <li className="block transition-all hover:bg-secondary hover:text-sky-900 hover:font-bold hover:dark:text-100 rounded-sm px-4 py-2">
            <Link to="/password" className="flex items-center gap-3">
              <Lock className="icon" />
              <span className="text-sm font-medium">Change password</span>
            </Link>
          </li> */}
        </ul>
      </nav>
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            logOut();
            navigate('/', { replace: true });
          }}
        >
          <LogOut className="icon" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
