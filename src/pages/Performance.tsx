import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Target,
  TrendingUp,
  Award,
  Clock,
  Star,
  ChevronRight,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { usePerformanceReviews, PerformanceRating } from "@/hooks/usePerformanceReviews";
import { useEmployees } from "@/hooks/useEmployees";
import { PerformanceReviewForm } from "@/components/performance/PerformanceReviewForm";
import { useAuth } from "@/contexts/AuthContext";

const ratingConfig: Record<PerformanceRating, { label: string; color: string }> = {
  excellent: { label: "Xuất sắc", color: "bg-success/10 text-success" },
  good: { label: "Tốt", color: "bg-primary/10 text-primary" },
  satisfactory: { label: "Đạt yêu cầu", color: "bg-info/10 text-info" },
  needs_improvement: { label: "Cần cải thiện", color: "bg-warning/10 text-warning" },
  unsatisfactory: { label: "Không đạt", color: "bg-destructive/10 text-destructive" },
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
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const {
    reviews,
    loading,
    createReview,
    getRatingScore,
    getStats,
  } = usePerformanceReviews();
  const { employees } = useEmployees();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const stats = getStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="page-header">Đánh giá hiệu suất</h1>
          <p className="page-subheader">
            {isAdmin
              ? "Theo dõi và đánh giá hiệu suất làm việc của nhân viên."
              : "Xem đánh giá hiệu suất làm việc của bạn."}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo đánh giá mới
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="animate-slide-up" style={{ animationDelay: "0ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.avgRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Điểm trung bình</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{Math.round(stats.avgGoals)}%</p>
                <p className="text-sm text-muted-foreground">Mục tiêu đạt được</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Chờ xác nhận</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-info/10 p-2">
                <Award className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {reviews.filter((r) => r.overall_rating === "excellent").length}
                </p>
                <p className="text-sm text-muted-foreground">Xuất sắc</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đánh giá</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Target className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Chưa có đánh giá hiệu suất nào</p>
              {isAdmin && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo đánh giá đầu tiên
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => {
                const ratingScore = getRatingScore(review.overall_rating);
                const config = ratingConfig[review.overall_rating];

                return (
                  <div
                    key={review.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {review.employee
                          ? `${review.employee.last_name[0]}${review.employee.first_name[0]}`
                          : "??"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">
                          {review.employee
                            ? `${review.employee.last_name} ${review.employee.first_name}`
                            : "N/A"}
                        </h4>
                        <Badge variant="secondary" className={cn(config.color)}>
                          {config.label}
                        </Badge>
                        {review.is_acknowledged && (
                          <Badge variant="outline" className="text-success border-success/30">
                            Đã xác nhận
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {review.employee?.department || "Chưa có phòng ban"} • Kỳ đánh giá:{" "}
                        {format(new Date(review.review_period_start), "dd/MM/yyyy", { locale: vi })} -{" "}
                        {format(new Date(review.review_period_end), "dd/MM/yyyy", { locale: vi })}
                      </p>
                      <div className="flex items-center gap-6">
                        <RatingStars rating={ratingScore} />
                        <div className="flex-1 max-w-[200px]">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Mục tiêu</span>
                            <span className="font-medium">
                              {review.goals_achieved || 0}%
                            </span>
                          </div>
                          <Progress
                            value={review.goals_achieved || 0}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <PerformanceReviewForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        employees={employees}
        onSubmit={createReview}
      />
    </div>
  );
}
