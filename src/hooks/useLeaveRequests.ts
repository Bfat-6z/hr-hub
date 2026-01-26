import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type LeaveType = "annual" | "sick" | "personal" | "maternity" | "paternity" | "unpaid";
export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface LeaveRequest {
  id: string;
  employee_id: string;
  user_id: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  days_count: number;
  reason: string | null;
  status: LeaveStatus;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  employee?: {
    first_name: string;
    last_name: string;
    department: string | null;
  };
}

export interface CreateLeaveRequestData {
  employee_id: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  days_count: number;
  reason?: string;
}

export function useLeaveRequests() {
  const { user, role } = useAuth();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = role === "admin";

  const fetchRequests = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("leave_requests")
        .select(`
          *,
          employee:employees(first_name, last_name, department)
        `)
        .order("created_at", { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setRequests((data || []) as LeaveRequest[]);
    } catch (err: any) {
      console.error("Error fetching leave requests:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const createRequest = async (data: CreateLeaveRequestData): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error: insertError } = await supabase.from("leave_requests").insert({
        employee_id: data.employee_id,
        user_id: user.id,
        leave_type: data.leave_type,
        start_date: data.start_date,
        end_date: data.end_date,
        days_count: data.days_count,
        reason: data.reason || null,
      });

      if (insertError) throw insertError;

      toast.success("Đã gửi đơn nghỉ phép thành công!");
      await fetchRequests();
      return true;
    } catch (err: any) {
      console.error("Error creating leave request:", err);
      toast.error(err.message || "Không thể gửi đơn nghỉ phép");
      return false;
    }
  };

  const approveRequest = async (id: string): Promise<boolean> => {
    if (!user || !isAdmin) return false;

    try {
      const { error: updateError } = await supabase
        .from("leave_requests")
        .update({
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã duyệt đơn nghỉ phép!");
      await fetchRequests();
      return true;
    } catch (err: any) {
      console.error("Error approving leave request:", err);
      toast.error(err.message || "Không thể duyệt đơn");
      return false;
    }
  };

  const rejectRequest = async (id: string, reason?: string): Promise<boolean> => {
    if (!user || !isAdmin) return false;

    try {
      const { error: updateError } = await supabase
        .from("leave_requests")
        .update({
          status: "rejected",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
          rejection_reason: reason || null,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã từ chối đơn nghỉ phép!");
      await fetchRequests();
      return true;
    } catch (err: any) {
      console.error("Error rejecting leave request:", err);
      toast.error(err.message || "Không thể từ chối đơn");
      return false;
    }
  };

  const cancelRequest = async (id: string): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from("leave_requests")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã hủy đơn nghỉ phép!");
      await fetchRequests();
      return true;
    } catch (err: any) {
      console.error("Error cancelling leave request:", err);
      toast.error(err.message || "Không thể hủy đơn");
      return false;
    }
  };

  const getStats = () => {
    const pending = requests.filter((r) => r.status === "pending").length;
    const approved = requests.filter((r) => r.status === "approved").length;
    const rejected = requests.filter((r) => r.status === "rejected").length;
    return { total: requests.length, pending, approved, rejected };
  };

  return {
    requests,
    loading,
    error,
    isAdmin,
    fetchRequests,
    createRequest,
    approveRequest,
    rejectRequest,
    cancelRequest,
    getStats,
  };
}
