import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
        outline: "border border-primary-500 text-primary-700 dark:border-primary-600 dark:text-primary-400",
        secondary: "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300",
        success: "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300",
        warning: "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300",
        error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-300",
        neutral: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-base",
      },
      removable: {
        true: "pr-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      removable: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  label: string;
  withIcon?: boolean;
  icon?: React.ReactNode;
  onRemove?: () => void;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    label, 
    variant = "default", 
    size = "sm", 
    withIcon = false, 
    icon,
    removable,
    onRemove,
    className, 
    ...props 
  }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, removable }), className)}
        {...props}
      >
        {withIcon && (
          <span className="mr-1.5 inline-flex">
            {icon || (
              <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor">
                <circle cx="4" cy="4" r="3" />
              </svg>
            )}
          </span>
        )}
        
        {label}
        
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              "ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              variant === "default" 
                ? "text-primary-600 hover:bg-primary-200 hover:text-primary-800 focus:ring-primary-500 dark:text-primary-400 dark:hover:bg-primary-800 dark:hover:text-primary-200"
                : variant === "secondary"
                ? "text-secondary-600 hover:bg-secondary-200 hover:text-secondary-800 focus:ring-secondary-500 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-200"
                : variant === "success"
                ? "text-success-600 hover:bg-success-200 hover:text-success-800 focus:ring-success-500 dark:text-success-400 dark:hover:bg-success-800 dark:hover:text-success-200"
                : variant === "warning"
                ? "text-warning-600 hover:bg-warning-200 hover:text-warning-800 focus:ring-warning-500 dark:text-warning-400 dark:hover:bg-warning-800 dark:hover:text-warning-200"
                : variant === "error"
                ? "text-error-600 hover:bg-error-200 hover:text-error-800 focus:ring-error-500 dark:text-error-400 dark:hover:bg-error-800 dark:hover:text-error-200"
                : "text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800 focus:ring-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            )}
          >
            <span className="sr-only">Remove badge</span>
            <X className="h-2 w-2" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";
