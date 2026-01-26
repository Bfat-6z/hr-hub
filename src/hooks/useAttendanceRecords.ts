import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

export interface AttendanceRecord {
  id: string;
  user_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: "present" | "absent" | "late" | "half-day";
  work_hours: string | null;
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export function useAttendanceRecords(selectedDate?: Date) {
  const { user, role } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    onLeave: 0,
  });

  useEffect(() => {
    if (!user) return;

    const fetchRecords = async () => {
      setLoading(true);
      const dateStr = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd");

      let query = supabase
        .from("attendance_records")
        .select(`
          id,
          user_id,
          date,
          check_in,
          check_out,
          status,
          work_hours
        `)
        .eq("date", dateStr)
        .order("check_in", { ascending: true });

      // If not admin, only fetch own records
      if (role !== "admin") {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching attendance records:", error);
        setRecords([]);
      } else {
        // Fetch profile info for each record
        const recordsWithProfiles = await Promise.all(
          (data || []).map(async (record) => {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("full_name, avatar_url")
              .eq("user_id", record.user_id)
              .maybeSingle();

            return {
              ...record,
              status: record.status as AttendanceRecord["status"],
              work_hours: record.work_hours as string | null,
              profile: profileData,
            };
          })
        );

        setRecords(recordsWithProfiles);

        // Calculate stats
        const presentCount = recordsWithProfiles.filter(
          (r) => r.status === "present"
        ).length;
        const lateCount = recordsWithProfiles.filter(
          (r) => r.status === "late"
        ).length;
        const halfDayCount = recordsWithProfiles.filter(
          (r) => r.status === "half-day"
        ).length;

        setStats({
          present: presentCount,
          absent: 0, // Would need total employee count to calculate
          late: lateCount,
          onLeave: halfDayCount,
        });
      }
      setLoading(false);
    };

    fetchRecords();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("attendance-list")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "attendance_records",
        },
        () => {
          fetchRecords();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, role, selectedDate]);

  return { records, loading, stats };
}
