import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-white text-zinc-950 shadow hover:bg-zinc-200",
        secondary: "border-[#3776ab]/30 bg-[#3776ab]/15 text-[#58a6ff] hover:bg-[#3776ab]/25",
        tertiary: "border-[#ffd43b]/30 bg-[#ffd43b]/15 text-[#ffd43b] hover:bg-[#ffd43b]/25",
        outline: "text-zinc-300 border-[#1e293b]",
        destructive: "border-transparent bg-red-600/20 text-red-400 border border-red-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
