import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SearchInput from '@/components/ui/search-input';
import { Link } from 'react-router-dom';
import BlogsTable from './blogs-table';

export default function BlogsListBox() {
  return (
    <div className="space-y-4">
      <Button asChild>
        <Link to="/blogs/new">Create blog</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
          <CardDescription>A list of all created blogs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchInput
            placeholder="Search blog..."
            className="w-full md:w-96"
          />
          <BlogsTable />
        </CardContent>
      </Card>
    </div>
  );
}
