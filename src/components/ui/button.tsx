import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#58a6ff] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-white text-zinc-950 shadow-sm hover:bg-zinc-200 active:bg-zinc-300",
        secondary:
          "bg-[#0f2338] text-[#58a6ff] border border-[#3776ab]/30 shadow-sm hover:bg-[#153250]",
        tertiary:
          "bg-[#2a2206] text-[#ffd43b] border border-[#ffd43b]/30 shadow-sm hover:bg-[#382f10]",
        outline:
          "border border-[#1e293b] bg-transparent text-zinc-300 shadow-sm hover:border-[#3776ab]/60 hover:bg-[#0f2338]/40 hover:text-white",
        ghost: "hover:bg-[#0f2338]/40 hover:text-white text-zinc-300",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
        link: "text-[#58a6ff] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6 text-base",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
