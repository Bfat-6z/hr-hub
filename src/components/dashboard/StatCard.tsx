import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
}: StatCardProps) {
  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm font-medium flex items-center gap-1",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {changeType === "positive" && (
                <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-current" />
              )}
              {changeType === "negative" && (
                <span className="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-current" />
              )}
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "rounded-xl p-3 transition-all duration-300 group-hover:scale-110",
          iconColor
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
