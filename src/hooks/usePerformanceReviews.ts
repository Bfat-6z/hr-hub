import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type PerformanceRating = "excellent" | "good" | "satisfactory" | "needs_improvement" | "unsatisfactory";

export interface PerformanceReview {
  id: string;
  employee_id: string;
  reviewer_id: string;
  review_period_start: string;
  review_period_end: string;
  overall_rating: PerformanceRating;
  goals_achieved: number | null;
  strengths: string | null;
  areas_for_improvement: string | null;
  goals_for_next_period: string | null;
  comments: string | null;
  employee_comments: string | null;
  is_acknowledged: boolean;
  acknowledged_at: string | null;
  created_at: string;
  updated_at: string;
  employee?: {
    first_name: string;
    last_name: string;
    department: string | null;
    position: string | null;
  };
}

export interface CreateReviewData {
  employee_id: string;
  review_period_start: string;
  review_period_end: string;
  overall_rating: PerformanceRating;
  goals_achieved?: number;
  strengths?: string;
  areas_for_improvement?: string;
  goals_for_next_period?: string;
  comments?: string;
}

export function usePerformanceReviews() {
  const { user, role } = useAuth();
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = role === "admin";

  const fetchReviews = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("performance_reviews")
        .select(`
          *,
          employee:employees(first_name, last_name, department, position)
        `)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setReviews((data || []) as PerformanceReview[]);
    } catch (err: any) {
      console.error("Error fetching performance reviews:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const createReview = async (data: CreateReviewData): Promise<boolean> => {
    if (!user || !isAdmin) return false;

    try {
      const { error: insertError } = await supabase.from("performance_reviews").insert({
        employee_id: data.employee_id,
        reviewer_id: user.id,
        review_period_start: data.review_period_start,
        review_period_end: data.review_period_end,
        overall_rating: data.overall_rating,
        goals_achieved: data.goals_achieved || null,
        strengths: data.strengths || null,
        areas_for_improvement: data.areas_for_improvement || null,
        goals_for_next_period: data.goals_for_next_period || null,
        comments: data.comments || null,
      });

      if (insertError) throw insertError;

      toast.success("Đã tạo đánh giá hiệu suất thành công!");
      await fetchReviews();
      return true;
    } catch (err: any) {
      console.error("Error creating performance review:", err);
      toast.error(err.message || "Không thể tạo đánh giá");
      return false;
    }
  };

  const updateReview = async (id: string, data: Partial<CreateReviewData>): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const { error: updateError } = await supabase
        .from("performance_reviews")
        .update(data)
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã cập nhật đánh giá!");
      await fetchReviews();
      return true;
    } catch (err: any) {
      console.error("Error updating review:", err);
      toast.error(err.message || "Không thể cập nhật đánh giá");
      return false;
    }
  };

  const acknowledgeReview = async (id: string, employeeComments?: string): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from("performance_reviews")
        .update({
          is_acknowledged: true,
          acknowledged_at: new Date().toISOString(),
          employee_comments: employeeComments || null,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã xác nhận đánh giá!");
      await fetchReviews();
      return true;
    } catch (err: any) {
      console.error("Error acknowledging review:", err);
      toast.error(err.message || "Không thể xác nhận đánh giá");
      return false;
    }
  };

  const getRatingLabel = (rating: PerformanceRating): string => {
    const labels: Record<PerformanceRating, string> = {
      excellent: "Xuất sắc",
      good: "Tốt",
      satisfactory: "Đạt yêu cầu",
      needs_improvement: "Cần cải thiện",
      unsatisfactory: "Không đạt",
    };
    return labels[rating];
  };

  const getRatingScore = (rating: PerformanceRating): number => {
    const scores: Record<PerformanceRating, number> = {
      excellent: 5,
      good: 4,
      satisfactory: 3,
      needs_improvement: 2,
      unsatisfactory: 1,
    };
    return scores[rating];
  };

  const getStats = () => {
    const total = reviews.length;
    const acknowledged = reviews.filter((r) => r.is_acknowledged).length;
    const pending = total - acknowledged;
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + getRatingScore(r.overall_rating), 0) / reviews.length
      : 0;
    const avgGoals = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.goals_achieved || 0), 0) / reviews.length
      : 0;

    return { total, acknowledged, pending, avgRating, avgGoals };
  };

  return {
    reviews,
    loading,
    error,
    isAdmin,
    fetchReviews,
    createReview,
    updateReview,
    acknowledgeReview,
    getRatingLabel,
    getRatingScore,
    getStats,
  };
}
