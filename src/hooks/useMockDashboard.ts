import { useState, useEffect } from "react";
import { dashboardService } from "@/test/mockServices";

export function useMockDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    monthlySalary: "0",
    newEmployees: 0,
    resigned: 0,
    pendingApprovals: 0,
    upcomingReviews: 0,
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [attendanceChartData, setAttendanceChartData] = useState<any[]>([]);
  const [departmentChartData, setDepartmentChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, activities, attendanceData, deptData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentActivities(),
          dashboardService.getAttendanceChartData(),
          dashboardService.getDepartmentChartData(),
        ]);

        setStats(statsData);
        setRecentActivities(activities);
        setAttendanceChartData(attendanceData);
        setDepartmentChartData(deptData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stats,
    recentActivities,
    attendanceChartData,
    departmentChartData,
    loading,
  };
}
