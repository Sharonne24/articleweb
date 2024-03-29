import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import { DataTable } from '@/components/ui/datatable';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BlogsTableSkeleton from './blogs-table-skeleton';

import { deleteBlog, getBlogs } from '@/services/blogApi';
import {
  capitalizeFirstLetter,
  formatDateLong,
  truncateString,
} from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import CustomDialog from '@/components/ui/custom-dialog';
// import CustomDialog from '@/components/ui/custom-dialog';

interface Blogs {
  id: string;
  title: string;
  published: boolean | null;
  category: string;
  createdAt: Date;
}

export default function BlogsTable() {
  const queryClient = useQueryClient();
  const columns: ColumnDef<Blogs>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div>
          {truncateString(capitalizeFirstLetter(row.getValue('title')))}
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div>
          <Badge variant="tag" className="capitalize">
            {row.getValue('category')}
          </Badge>
        </div>
      ),
    },

    {
      accessorKey: 'createdAt',
      header: 'Created Date',
      cell: ({ row }) => <div>{formatDateLong(row.getValue('createdAt'))}</div>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const blog = row.original;

        function handleDelete(id: string) {
          deleteBlog(id)
            .then(() => {
              toast.success('Article deleted successfully!.');
              queryClient.invalidateQueries({ queryKey: ['blogs'] });
            })
            .catch(err => {
              console.log(err);
              toast.error('There was an error performing this action.');
            });
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none border-none">
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:cursor-pointer [&>*]:text-xs">
              <DropdownMenuItem asChild>
                <Link to={`/blogs/${blog.id}`}>View</Link>
              </DropdownMenuItem>
              <button className="dropdown-link cursor-pointer text-destructive">
                <CustomDialog
                  onAction={() => handleDelete(blog.id)}
                  actionText="Delete"
                >
                  <span>Delete</span>
                </CustomDialog>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [fetchedBlogs, setFetchedBlogs] = useState<Blogs[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  useEffect(
    function () {
      if (data) {
        const formatted = data.map(blog => ({
          id: blog.id,
          title: blog.title,
          published: blog.published!,
          category: blog.categories?.category as string,
          createdAt: new Date(blog.created_at),
        }));
        setFetchedBlogs(formatted);
      }
    },
    [data]
  );

  if (error) {
    console.log(error);
    toast.error(`😞 There was a problem fetching blogs.`);
  }

  return (
    <div>
      {isLoading ? (
        <BlogsTableSkeleton />
      ) : (
        <DataTable columns={columns} data={fetchedBlogs} />
      )}
    </div>
  );
}
