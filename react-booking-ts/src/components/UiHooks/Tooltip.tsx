import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { JSX } from 'react';

const Tiptools = ({
  children,
  title,
  className,
  titleClassName,
}: {
  children: JSX.Element | React.ReactNode;
  title: string;
  className?: string;
  titleClassName?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={`rounded-lg bg-slate-300 dark:bg-slate-700 ${className}`}>
          <p className={titleClassName}>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default Tiptools;
