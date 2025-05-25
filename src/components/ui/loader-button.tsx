import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const LoaderButton = React.forwardRef<HTMLButtonElement, LoaderButtonProps>(
  ({ 
    children, 
    isLoading = false, 
    className, 
    disabled,
    variant = "default",
    ...props 
  }, ref) => {
    return (
      <Button
        className={cn(className)}
        disabled={isLoading || disabled}
        ref={ref}
        variant={variant}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

LoaderButton.displayName = "LoaderButton";

export { LoaderButton };
