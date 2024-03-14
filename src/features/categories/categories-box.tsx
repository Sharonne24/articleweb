import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoreVertical } from 'lucide-react';

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
import CategoriesTableSkeleton from './table-skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { titleCase } from '@/lib/utils';
import { useCategories } from '../blogs/use-categories';
import CustomDialog from '@/components/ui/custom-dialog';
import { deleteCategory } from '@/services/categories-api';
import { toast } from 'sonner';

export default function CategoriesBox() {
  const { isLoading, categories } = useCategories();
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBlog } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success('😄 Category deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: err => {
      console.log(err);
      toast.error('😞 Unable to perform selected action.');
    },
  });

  // if (error) {
  //   toast.error('Error while retrieving created categories.', {
  //     duration: 5000,
  //   });
  // }

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
                          <button
                            className="dropdown-link cursor-pointer"
                            disabled={isDeleting}
                          >
                            <CustomDialog
                              onAction={() => deleteBlog(category.id)}
                            >
                              <span className="text-sm text-destructive">
                                Delete
                              </span>
                            </CustomDialog>
                          </button>
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
