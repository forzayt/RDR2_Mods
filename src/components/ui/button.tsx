import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-cond uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        paper: "bg-hero-foreground text-hero hover:bg-primary hover:text-primary-foreground",
        ghost: "bg-surface-glass text-foreground ring-1 ring-border hover:text-primary",
        active: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background text-foreground hover:bg-accent",
      },
      size: {
        default: "h-10 rounded-full px-5 text-sm font-semibold",
        compact: "h-8 rounded-full px-3 text-xs font-semibold",
        icon: "size-9 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return <Component ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };