import { AlignJustify, Home, Lock, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="px-4 space-y-4">
      <img
        src="/logo/logoipsum.svg"
        alt="logo"
        className="h-8 w-auto mx-auto"
      />
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
            <Link to="/blog/new" className="flex items-center gap-3">
              <Rss className="icon" />
              <span className="text-sm font-medium">Create Blog</span>
            </Link>
          </li>
          <li className="block transition-all hover:bg-secondary hover:text-sky-900 hover:font-bold hover:dark:text-100 rounded-sm px-4 py-2">
            <Link to="/password" className="flex items-center gap-3">
              <Lock className="icon" />
              <span className="text-sm font-medium">Change password</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
