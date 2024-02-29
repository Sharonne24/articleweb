import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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

import { getBlogs } from '@/services/blogApi';
import { formatDateLong, truncateString } from '@/lib/utils';

interface Blogs {
  id: string;
  title: string;
  published: boolean | null;
  category: string;
  createdAt: Date;
}

export default function BlogsTable() {
  const columns: ColumnDef<Blogs>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <div>{truncateString(row.getValue('title'))}</div>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },

    {
      accessorKey: 'createdAt',
      header: 'Created Date',
      cell: ({ row }) => <div>{formatDateLong(row.getValue('createdAt'))}</div>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        console.log(row.getValue('author'));
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none border-none">
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&>*]:cursor-pointer [&>*]:text-xs">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Publish</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
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
