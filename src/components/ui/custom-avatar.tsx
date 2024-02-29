import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

interface CustomAvatarProps {
  imageUrl: string | undefined;
  userName: string;
}

export function CustomAvatar({ imageUrl, userName }: CustomAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={`Avatar for ${userName}`} />
      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
    </Avatar>
  );
}
