import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number | string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <CardContent className="py-4 space-y-2">
        <h2 className="text-sm md:text-base font-bold text-muted-foreground">
          {title}
        </h2>
        <p className="text-xl md:text-3xl font-extrabold">{value}</p>
      </CardContent>
    </Card>
  );
}
