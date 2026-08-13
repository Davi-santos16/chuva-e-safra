import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex h-11 w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground transition-[color,background-color,border-color,box-shadow] duration-200 ease-out placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive file:mr-5 file:rounded-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-interactive motion-reduce:transition-none',
  {
    variants: {
      variant: {
        default:
          'border-input',
        gray:
          'border-input bg-muted text-foreground placeholder:text-muted-foreground',
        info:
          'border-info bg-info-soft text-foreground placeholder:text-muted-foreground focus-visible:border-info focus-visible:ring-info',
        failure:
          'border-destructive bg-destructive-soft text-foreground placeholder:text-muted-foreground focus-visible:border-destructive focus-visible:ring-destructive',
        warning:
          'border-warning bg-warning-soft text-foreground placeholder:text-muted-foreground focus-visible:border-warning focus-visible:ring-warning',
        success:
          'border-success bg-success-soft text-foreground placeholder:text-muted-foreground focus-visible:border-success focus-visible:ring-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
