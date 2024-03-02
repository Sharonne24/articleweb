import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CustomAvatar } from '@/components/ui/custom-avatar';
import { formatDateLong } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  blogUrl: string;
  title: string;
  category: string;
  description: string;
  createdAt: Date;
  authorName: string;
  authorImageUrl: string | null;
}

export default function BlogCard({
  id,
  blogUrl,
  title,
  category,
  description,
  createdAt,
  authorName,
  authorImageUrl,
}: BlogCardProps) {
  return (
    <Link to={`/blogs/${id}`}>
      <Card className="rounded-sm overflow-hidden">
        <img
          src={blogUrl}
          alt={`cover for ${title}`}
          className="object-cover aspect-video"
        />
        <CardContent className="px-4 py-2 space-y-3">
          <Badge variant="tag" className="capitalize">
            {category}
          </Badge>
          <h3 className="text-sm md:text-base font-semibold font-display capitalize">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <CustomAvatar
              imageUrl={authorImageUrl ?? undefined}
              userName={authorName}
            />
            <div className="space-y-0.5">
              <div className="text-sm font-medium capitalize">{authorName}</div>
              <p className="text-muted-foreground text-xs">
                {formatDateLong(createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
