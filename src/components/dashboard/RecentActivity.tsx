import { cn } from "@/lib/utils";

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
  "bg-destructive/20 text-destructive",
];

export function RecentActivity() {
  return (
    <div className="stat-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium",
                avatarColors[index % avatarColors.length]
              )}
            >
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
