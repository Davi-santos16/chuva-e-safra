import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "mt-2 flex field-sizing-content min-h-24 w-full rounded-md border border-input bg-card px-3 py-2 text-base text-foreground placeholder:text-muted-foreground transition-[color,background-color,border-color,box-shadow] duration-200 ease-out focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
