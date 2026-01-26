import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, LogOut, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface TodayRecord {
  id: string;
  check_in: string | null;
  check_out: string | null;
  status: string;
}

export function CheckInOut() {
  const { user } = useAuth();
  const [todayRecord, setTodayRecord] = useState<TodayRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch today's record
  useEffect(() => {
    if (!user) return;

    const fetchTodayRecord = async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const { data, error } = await supabase
        .from("attendance_records")
        .select("id, check_in, check_out, status")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      if (error) {
        console.error("Error fetching today's record:", error);
      } else {
        setTodayRecord(data);
      }
      setLoading(false);
    };

    fetchTodayRecord();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("attendance-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "attendance_records",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchTodayRecord();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleCheckIn = async () => {
    if (!user) return;
    setActionLoading(true);

    const now = new Date();
    const today = format(now, "yyyy-MM-dd");
    const isLate = now.getHours() >= 9 && now.getMinutes() > 0;

    const { data, error } = await supabase
      .from("attendance_records")
      .insert({
        user_id: user.id,
        date: today,
        check_in: now.toISOString(),
        status: isLate ? "late" : "present",
      })
      .select()
      .single();

    if (error) {
      console.error("Check-in error:", error);
      toast.error("Không thể check-in. Vui lòng thử lại.");
    } else {
      setTodayRecord(data);
      toast.success(`Check-in thành công lúc ${format(now, "HH:mm")}`);
    }
    setActionLoading(false);
  };

  const handleCheckOut = async () => {
    if (!user || !todayRecord) return;
    setActionLoading(true);

    const now = new Date();
    const checkInTime = new Date(todayRecord.check_in!);
    const workMs = now.getTime() - checkInTime.getTime();
    const workHours = Math.floor(workMs / 3600000);
    const workMinutes = Math.floor((workMs % 3600000) / 60000);

    // Determine status based on work hours
    let status = todayRecord.status;
    if (workHours < 4) {
      status = "half-day";
    }

    const { data, error } = await supabase
      .from("attendance_records")
      .update({
        check_out: now.toISOString(),
        work_hours: `${workHours} hours ${workMinutes} minutes`,
        status,
      })
      .eq("id", todayRecord.id)
      .select()
      .single();

    if (error) {
      console.error("Check-out error:", error);
      toast.error("Không thể check-out. Vui lòng thử lại.");
    } else {
      setTodayRecord(data);
      toast.success(`Check-out thành công lúc ${format(now, "HH:mm")}`);
    }
    setActionLoading(false);
  };

  const hasCheckedIn = todayRecord?.check_in;
  const hasCheckedOut = todayRecord?.check_out;

  return (
    <Card className="animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Chấm công hôm nay
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current time display */}
        <div className="text-center py-4 bg-muted/50 rounded-lg">
          <p className="text-3xl font-bold tabular-nums">
            {format(currentTime, "HH:mm:ss")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {format(currentTime, "EEEE, dd MMMM yyyy", { locale: vi })}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Status display */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-success/10 rounded-lg">
                <p className="text-muted-foreground text-xs mb-1">Check-in</p>
                <p className="font-semibold text-success">
                  {hasCheckedIn
                    ? format(new Date(todayRecord.check_in!), "HH:mm")
                    : "--:--"}
                </p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg">
                <p className="text-muted-foreground text-xs mb-1">Check-out</p>
                <p className="font-semibold text-destructive">
                  {hasCheckedOut
                    ? format(new Date(todayRecord.check_out!), "HH:mm")
                    : "--:--"}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              {!hasCheckedIn ? (
                <Button
                  className="flex-1"
                  onClick={handleCheckIn}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn className="mr-2 h-4 w-4" />
                  )}
                  Check-in
                </Button>
              ) : !hasCheckedOut ? (
                <Button
                  className="flex-1"
                  variant="destructive"
                  onClick={handleCheckOut}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Check-out
                </Button>
              ) : (
                <div className="flex-1 text-center py-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ✓ Đã hoàn thành chấm công hôm nay
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
