'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Base Button ────────────────────────────────────────────────
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:     'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:   'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:       'hover:bg-accent hover:text-accent-foreground',
        link:        'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm:      'h-9 rounded-md px-3',
        lg:      'h-11 rounded-md px-8',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

// ── Colorful Button ────────────────────────────────────────────
// Nombre histórico: con el diseño aprobado ya no lleva degradado ni glow.
// Es un botón sólido mantequilla con texto noche (igual que .btn-primary).
interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export function ButtonColorful({ className, label = 'Hablemos hoy', ...props }: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        'h-11 px-6 rounded-full gap-2',
        'bg-butter text-night font-semibold',
        'hover:bg-white hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
        'transition-[background-color,transform] duration-200',
        'focus-visible:ring-butter focus-visible:ring-offset-night',
        className
      )}
      {...props}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
    </Button>
  )
}

export { Button, buttonVariants }
