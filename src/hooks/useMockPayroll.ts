import { useState, useEffect } from "react";
import { payrollService } from "@/test/mockServices";
import { MockPayroll } from "@/test/mockData";
import { toast } from "sonner";

export function useMockPayroll() {
  const [records, setRecords] = useState<MockPayroll[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPayroll: 0,
    totalBonus: 0,
    pending: 0,
  });

  const fetchPayroll = async () => {
    setLoading(true);
    try {
      const data = await payrollService.getAll();
      setRecords(data);
      setStats(payrollService.getStats());
    } catch (error) {
      console.error("Error fetching payroll:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const updateStatus = async (id: string, status: MockPayroll["status"]): Promise<boolean> => {
    try {
      await payrollService.updateStatus(id, status);
      toast.success("Cập nhật trạng thái thành công!");
      await fetchPayroll();
      return true;
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái");
      return false;
    }
  };

  const runPayroll = async (): Promise<boolean> => {
    try {
      // Simulate running payroll - update all pending to processing
      const pending = records.filter((r) => r.status === "pending");
      for (const record of pending) {
        await payrollService.updateStatus(record.id, "processing");
      }
      toast.success("Đang xử lý bảng lương...");
      await fetchPayroll();
      return true;
    } catch (error) {
      toast.error("Không thể xử lý bảng lương");
      return false;
    }
  };

  return {
    records,
    loading,
    stats,
    fetchPayroll,
    updateStatus,
    runPayroll,
  };
}
