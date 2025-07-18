import { Checkbox } from '@/shared/components/shadcn/ui/checkbox';
import clsx from 'clsx';

const PrimaryCheckbox = ({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox>) => {
  return (
    <Checkbox
      {...props}
      className={clsx(
        'bg-white',
        'border border-light-gray',
        'data-[state=checked]:[background-color:var(--bg-primary)]',
        'data-[state=checked]:[border-color:var(--border-primary)]',
        'data-[state=checked]:text-white',
        className
      )}
    />
  );
};

export default PrimaryCheckbox;
