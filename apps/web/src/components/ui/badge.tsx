import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium leading-[1.4] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none',
  {
    variants: {
      variant: {
        default: 'border-interactive/20 bg-secondary text-interactive',
        primary: 'border-interactive/20 bg-secondary text-interactive',
        secondary: 'border-secondary-foreground/20 bg-secondary text-secondary-foreground',
        success: 'border-success/30 bg-success-soft text-foreground',
        warning: 'border-warning/30 bg-warning-soft text-foreground',
        info: 'border-info/20 bg-info-soft text-foreground',
        error: 'border-destructive/30 bg-destructive-soft text-foreground',
        outline: 'border-interactive text-interactive',
        outlineSecondary: 'border-secondary text-secondary',
        outlineSuccess: 'border-success text-success',
        outlineWarning: 'border-warning text-foreground',
        outlineError: 'border-destructive text-destructive',
        outlineInfo: 'border-info text-info',
        lightPrimary: 'border-transparent bg-secondary text-interactive',
        lightSecondary: 'border-transparent bg-secondary text-secondary-foreground',
        lightSuccess: 'border-transparent bg-success-soft text-foreground',
        lightError: 'border-transparent bg-destructive-soft text-foreground',
        lightInfo: 'border-transparent bg-info-soft text-foreground',
        lightWarning: 'border-transparent bg-warning-soft text-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        gray: 'border-transparent bg-muted text-muted-foreground'
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
