import { DataTable } from '@/components/ui/datatable';
import { ColumnDef } from '@tanstack/react-table';

interface Blogs {
  title: string;
  author: string;
  published: boolean;
  category: string;
  createdAt: Date;
}

export default function BlogsTable() {
  const columns: ColumnDef<Blogs>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'author',
      header: 'Author',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created Date',
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={} />
    </div>
  );
}
