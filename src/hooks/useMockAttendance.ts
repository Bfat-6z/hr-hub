import { useState, useEffect } from "react";
import { attendanceService } from "@/test/mockServices";
import { MockAttendance } from "@/test/mockData";
import { toast } from "sonner";
import { format } from "date-fns";

export function useMockAttendance(selectedDate?: Date) {
  const [records, setRecords] = useState<MockAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    onLeave: 0,
  });

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const dateStr = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd");

      try {
        const data = await attendanceService.getAll(dateStr);
        setRecords(data);

        // Calculate stats
        const stats = attendanceService.getStats();
        setStats({
          present: stats.present,
          absent: stats.absent,
          late: stats.late,
          onLeave: stats.halfDay,
        });
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [selectedDate]);

  const checkIn = async (userId: string, employeeName: string) => {
    try {
      await attendanceService.checkIn(userId, employeeName);
      toast.success("Check-in thành công!");
      // Refresh records
      const dateStr = format(new Date(), "yyyy-MM-dd");
      const data = await attendanceService.getAll(dateStr);
      setRecords(data);
      return true;
    } catch (error) {
      toast.error("Check-in thất bại!");
      return false;
    }
  };

  const checkOut = async (recordId: string) => {
    try {
      await attendanceService.checkOut(recordId);
      toast.success("Check-out thành công!");
      // Refresh records
      const dateStr = format(new Date(), "yyyy-MM-dd");
      const data = await attendanceService.getAll(dateStr);
      setRecords(data);
      return true;
    } catch (error) {
      toast.error("Check-out thất bại!");
      return false;
    }
  };

  return { records, loading, stats, checkIn, checkOut };
}
