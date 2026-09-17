import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-cond uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm active:scale-[0.97]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97]",
        paper: "bg-hero-foreground text-hero hover:bg-primary hover:text-primary-foreground active:scale-[0.97]",
        ghost: "bg-surface-glass text-foreground ring-1 ring-border hover:text-primary active:scale-[0.97]",
        active: "bg-primary text-primary-foreground",
        outline: "border border-border bg-card/70 text-foreground hover:bg-accent hover:border-primary/50 active:scale-[0.97]",
      },
      size: {
        default: "h-10 rounded-full px-5 text-sm font-semibold tracking-wide",
        sm: "h-9 rounded-full px-4 text-xs font-semibold tracking-wide",
        compact: "h-8 rounded-full px-3 text-xs font-semibold tracking-wide",
        lg: "h-12 rounded-full px-8 text-base font-bold tracking-wider",
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