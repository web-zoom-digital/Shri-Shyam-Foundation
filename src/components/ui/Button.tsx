import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#dc2626] text-white hover:bg-[#b91c1c] shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5",
        primary:
          "bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white hover:from-[#b91c1c] hover:to-[#dc2626] shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5",
        secondary:
          "bg-[#b91c1c] text-white hover:bg-[#991b1b] shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)] hover:-translate-y-0.5",
        warm:
          "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)] hover:-translate-y-0.5",
        outline:
          "border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white hover:-translate-y-0.5",
        ghost: "hover:bg-[#fef2f2] text-[#dc2626] hover:text-[#b91c1c]",
        link: "text-[#dc2626] underline-offset-4 hover:underline",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
