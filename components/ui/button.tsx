import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#a33537] disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-primary-red text-white hover:bg-[#862b2d] shadow-sm min-h-[48px] px-6 py-3 text-base font-semibold',
        outline: 'border border-surface-charcoal text-surface-charcoal hover:bg-surface-charcoal/5 min-h-[48px] px-6 py-3 text-base font-semibold',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 min-h-[48px] px-6 py-3 text-base',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'inline-block text-surface-charcoal hover:underline decoration-[#a33537] decoration-2 underline-offset-4',
      },
      size: {
        default: '',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export {Button, buttonVariants}
