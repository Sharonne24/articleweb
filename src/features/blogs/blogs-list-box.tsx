import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function BlogsListBox() {
  return (
    <div className="space-y-4">
      <Button asChild>
        <Link to="/blogs/new">Create blog</Link>
      </Button>
    </div>
  );
}
