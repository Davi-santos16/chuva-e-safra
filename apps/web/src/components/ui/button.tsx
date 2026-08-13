import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-[color,background-color,border-color,box-shadow,opacity] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:brightness-95 disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none aria-busy:opacity-70 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        outline:
          'border border-interactive bg-transparent text-interactive hover:border-primary hover:bg-primary hover:text-primary-foreground',
        outlinesecondary:
          'border border-secondary-foreground bg-transparent text-secondary-foreground hover:bg-secondary',
        outlinesuccess:
          'border border-success bg-transparent text-success hover:bg-success hover:text-success-foreground',
        outlinewarning:
          'border border-warning bg-transparent text-foreground hover:bg-warning hover:text-warning-foreground',
        outlineinfo:
          'border border-info bg-transparent text-info hover:bg-info hover:text-info-foreground',
        outlineerror:
          'border border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        success:
          'bg-success text-success-foreground hover:bg-success-hover',
        warning:
          'bg-warning text-warning-foreground hover:bg-warning-hover',
        info: 'bg-info text-info-foreground hover:bg-info-hover',
        error:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        ghost: 'bg-transparent hover:bg-secondary hover:text-secondary-foreground',
        ghostprimary:
          'bg-transparent text-interactive hover:bg-secondary hover:text-interactive-hover',
        ghostsecondary:
          'bg-transparent text-secondary-foreground hover:bg-secondary',
        ghostsuccess:
          'bg-transparent text-success hover:bg-success-soft',
        ghostwarning:
          'bg-transparent text-foreground hover:bg-warning-soft',
        ghosterror:
          'bg-transparent text-destructive hover:bg-destructive-soft',
        ghostinfo: 'bg-transparent text-info hover:bg-info-soft',
        link: 'text-interactive underline-offset-4 hover:text-interactive-hover hover:underline',
        lightprimary:
          'bg-secondary text-interactive hover:bg-secondary-hover hover:text-interactive-hover',
        lightsecondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        lightsuccess:
          'bg-success-soft text-success hover:bg-success hover:text-success-foreground',
        lightwarning:
          'bg-warning-soft text-foreground hover:bg-warning hover:text-warning-foreground',
        lightinfo:
          'bg-info-soft text-info hover:bg-info hover:text-info-foreground',
        lighterror:
          'bg-destructive-soft text-destructive hover:bg-destructive hover:text-destructive-foreground',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-11 px-3',
        lg: 'h-12 px-8',
        icon: 'size-11 p-0',
      },
      shape: {
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
