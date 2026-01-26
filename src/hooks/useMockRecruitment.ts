import { useState, useEffect } from "react";
import { recruitmentService } from "@/test/mockServices";
import { MockJobPosting } from "@/test/mockData";
import { toast } from "sonner";

export function useMockRecruitment() {
  const [jobs, setJobs] = useState<MockJobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    interviews: 12,
    hired: 8,
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await recruitmentService.getAll();
      setJobs(data);
      const s = recruitmentService.getStats();
      setStats({ ...stats, ...s });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const createJob = async (data: Partial<MockJobPosting>): Promise<boolean> => {
    try {
      await recruitmentService.create(data);
      toast.success("Đăng tin tuyển dụng thành công!");
      await fetchJobs();
      return true;
    } catch (error) {
      toast.error("Không thể đăng tin tuyển dụng");
      return false;
    }
  };

  const updateJobStatus = async (id: string, status: MockJobPosting["status"]): Promise<boolean> => {
    try {
      await recruitmentService.updateStatus(id, status);
      toast.success("Cập nhật trạng thái thành công!");
      await fetchJobs();
      return true;
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái");
      return false;
    }
  };

  return {
    jobs,
    loading,
    stats,
    fetchJobs,
    createJob,
    updateJobStatus,
  };
}
