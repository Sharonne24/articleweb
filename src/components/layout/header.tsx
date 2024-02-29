import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="block px-4 md:hidden py-1">
      <Button variant="outline" size="icon">
        <Menu className="icon-muted" />
      </Button>
    </header>
  );
}
