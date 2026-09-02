import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  badge?: string
  align?: "left" | "center"
  lightText?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = "left",
  lightText = false,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
      {...props}
    >
      {badge && (
        <span className={cn(
          "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border",
          lightText 
            ? "bg-slate-900/50 text-slate-300 border-slate-800" 
            : "bg-slate-50 text-slate-600 border-slate-100"
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn("section-title", lightText && "!text-white")}>
        {title.split(" ").map((word, i) => {
          if (["Foundation", "Mission", "Premium", "Difference", "Action", "Trust"].includes(word)) {
            return (
              <span key={i} className="text-gradient-primary">
                {word}{" "}
              </span>
            )
          }
          return <span key={i}>{word} </span>
        })}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "section-subtitle",
            align === "center" ? "max-w-2xl" : "max-w-xl",
            lightText && "!text-slate-300"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
