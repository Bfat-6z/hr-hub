import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Target,
  TrendingUp,
  Award,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceReview {
  id: string;
  employee: string;
  avatar: string;
  department: string;
  rating: number;
  goals: number;
  goalsCompleted: number;
  lastReview: string;
  status: "completed" | "pending" | "overdue";
}

const performanceData: PerformanceReview[] = [
  {
    id: "1",
    employee: "Sarah Chen",
    avatar: "SC",
    department: "Engineering",
    rating: 4.8,
    goals: 5,
    goalsCompleted: 4,
    lastReview: "Dec 2023",
    status: "completed",
  },
  {
    id: "2",
    employee: "Michael Brown",
    avatar: "MB",
    department: "Marketing",
    rating: 4.2,
    goals: 4,
    goalsCompleted: 3,
    lastReview: "Dec 2023",
    status: "completed",
  },
  {
    id: "3",
    employee: "Emily Davis",
    avatar: "ED",
    department: "Sales",
    rating: 4.5,
    goals: 6,
    goalsCompleted: 5,
    lastReview: "Nov 2023",
    status: "pending",
  },
  {
    id: "4",
    employee: "James Wilson",
    avatar: "JW",
    department: "HR",
    rating: 3.9,
    goals: 4,
    goalsCompleted: 2,
    lastReview: "Oct 2023",
    status: "overdue",
  },
  {
    id: "5",
    employee: "Lisa Anderson",
    avatar: "LA",
    department: "Finance",
    rating: 4.6,
    goals: 5,
    goalsCompleted: 5,
    lastReview: "Dec 2023",
    status: "completed",
  },
];

const statusStyles = {
  completed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  overdue: "bg-destructive/10 text-destructive",
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating
              ? "fill-warning text-warning"
              : "fill-muted text-muted"
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Performance() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-header">Performance Evaluation</h1>
          <p className="page-subheader">
            Track employee performance and manage reviews.
          </p>
        </div>
        <Button>
          <Target className="mr-2 h-4 w-4" />
          Start New Review Cycle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">4.4</p>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">78%</p>
                <p className="text-sm text-muted-foreground">Goals Achieved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">12</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-info/10 p-2">
                <Award className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-semibold">8</p>
                <p className="text-sm text-muted-foreground">Top Performers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((employee, index) => (
              <div
                key={employee.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {employee.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">
                      {employee.employee}
                    </h4>
                    <Badge
                      variant="secondary"
                      className={cn(statusStyles[employee.status])}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {employee.department} • Last review: {employee.lastReview}
                  </p>
                  <div className="flex items-center gap-6">
                    <RatingStars rating={employee.rating} />
                    <div className="flex-1 max-w-[200px]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Goals</span>
                        <span className="font-medium">
                          {employee.goalsCompleted}/{employee.goals}
                        </span>
                      </div>
                      <Progress
                        value={
                          (employee.goalsCompleted / employee.goals) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
