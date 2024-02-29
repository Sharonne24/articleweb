import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dummyArray } from '@/lib/utils';

const rowArray = dummyArray(10);

export default function CategoriesTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category #</TableHead>
          <TableHead className="w-24"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowArray.map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-2" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
