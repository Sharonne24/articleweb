import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, titleCase } from '@/lib/utils';
import { Option } from '@/index';

interface CustomSelectProps {
  placeholder: string;
  options: Option[];
  className?: string;
  defaultValue?: string;
  isFilter?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function CustomSelect({
  className,
  placeholder,
  defaultValue,
  options,

  onChange,
  disabled,
}: CustomSelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value: string) => {
        onChange && onChange(value);
      }}
    >
      <SelectTrigger className={cn('w-[280px]', className)} disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {titleCase(option.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
