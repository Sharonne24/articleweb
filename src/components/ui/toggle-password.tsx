import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface TogglePasswordProps {
  showPassword: boolean;
  onTogglePassword: () => void;
  disabled?: boolean;
}

export default function TogglePassword({
  showPassword,
  onTogglePassword,
  disabled,
}: TogglePasswordProps) {
  return (
    <>
      {showPassword ? (
        <div
          className={cn(
            'flex items-center gap-1 cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
          onClick={onTogglePassword}
        >
          <EyeOff className="icon-muted" />
          <span className="text-xs">Hide</span>
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center gap-1 cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
          onClick={onTogglePassword}
        >
          <Eye className="icon-muted" />
          <span className="text-xs">Show</span>
        </div>
      )}
    </>
  );
}
