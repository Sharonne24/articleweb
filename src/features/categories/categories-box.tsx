import { useQuery } from '@tanstack/react-query';
import { MoreVertical, Trash } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateCategory from './create-category';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import CategoriesTableSkeleton from './table-skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { getCategories } from '@/services/categories-api';
import { titleCase } from '@/lib/utils';

export default function CategoriesBox() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (error) {
    toast.error('Error while retrieving created categories.', {
      duration: 5000,
    });
  }

  return (
    <div className="space-y-4">
      <CreateCategory />
      <Card>
        <CardHeader>
          <CardTitle>Created categories</CardTitle>
          <CardDescription>A list of all created categories</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <CategoriesTableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map(category => (
                  <TableRow key={category.id}>
                    <TableCell>{titleCase(category.category)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="border-none outline-none">
                            <MoreVertical className="icon-muted" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Trash className="icon text-destructive" />
                            <span className="text-sm text-destructive">
                              Delete
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
