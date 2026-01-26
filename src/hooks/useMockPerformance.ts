import { useState, useEffect } from "react";
import { performanceService } from "@/test/mockServices";
import { MockPerformance } from "@/test/mockData";
import { toast } from "sonner";

export function useMockPerformance() {
  const [reviews, setReviews] = useState<MockPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    avgRating: "0",
    goalCompletion: 0,
    pending: 0,
    topPerformers: 8,
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await performanceService.getAll();
      setReviews(data);
      const s = performanceService.getStats();
      setStats({ ...stats, ...s });
    } catch (error) {
      console.error("Error fetching performance reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateRating = async (id: string, rating: number): Promise<boolean> => {
    try {
      await performanceService.updateRating(id, rating);
      toast.success("Cập nhật đánh giá thành công!");
      await fetchReviews();
      return true;
    } catch (error) {
      toast.error("Không thể cập nhật đánh giá");
      return false;
    }
  };

  const startReviewCycle = async (): Promise<boolean> => {
    toast.success("Bắt đầu chu kỳ đánh giá mới!");
    return true;
  };

  return {
    reviews,
    loading,
    stats,
    fetchReviews,
    updateRating,
    startReviewCycle,
  };
}
