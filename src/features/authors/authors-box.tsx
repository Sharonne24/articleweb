import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function AuthorsBox() {
  return (
    <div className="space-y-4">
      <Button asChild>
        <Link to="new">Create author</Link>
      </Button>
    </div>
  );
}
