import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

const activities: Activity[] = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "approved leave request for",
    target: "Michael Brown",
    time: "2 minutes ago",
    avatar: "SC",
  },
  {
    id: "2",
    user: "James Wilson",
    action: "added new employee",
    target: "Emily Davis",
    time: "15 minutes ago",
    avatar: "JW",
  },
  {
    id: "3",
    user: "Lisa Anderson",
    action: "updated payroll for",
    target: "Engineering Dept",
    time: "1 hour ago",
    avatar: "LA",
  },
  {
    id: "4",
    user: "Robert Taylor",
    action: "completed review for",
    target: "Q4 Performance",
    time: "2 hours ago",
    avatar: "RT",
  },
  {
    id: "5",
    user: "Maria Garcia",
    action: "scheduled interview with",
    target: "Alex Johnson",
    time: "3 hours ago",
    avatar: "MG",
  },
];

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-info/20 text-info",
  "bg-success/20 text-success",
  "bg-warning/20 text-warning",
  "bg-chart-3/20 text-chart-3",
];

export function RecentActivity() {
  return (
    <div className="stat-card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
                avatarColors[index % avatarColors.length]
              )}
            >
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-semibold">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
