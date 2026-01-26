import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type AppRole = "admin" | "employee" | "manager";

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
  profile?: {
    full_name: string | null;
    department: string | null;
    position: string | null;
  };
}

export function useRoles() {
  const { user, role: currentUserRole } = useAuth();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = currentUserRole === "admin";

  const fetchRoles = useCallback(async () => {
    if (!user || !isAdmin) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (rolesError) throw rolesError;

      // Fetch profiles for each user
      const userIds = (rolesData || []).map((r) => r.user_id);
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, full_name, department, position")
        .in("user_id", userIds);

      // Merge data
      const merged = (rolesData || []).map((role) => ({
        ...role,
        profile: profilesData?.find((p) => p.user_id === role.user_id) || null,
      }));

      setUserRoles(merged as UserRole[]);
    } catch (err: any) {
      console.error("Error fetching roles:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const updateUserRole = async (userId: string, newRole: AppRole): Promise<boolean> => {
    if (!isAdmin) {
      toast.error("Bạn không có quyền thay đổi vai trò");
      return false;
    }

    try {
      const { error: updateError } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (updateError) throw updateError;

      toast.success(`Đã cập nhật vai trò thành ${getRoleName(newRole)}!`);
      await fetchRoles();
      return true;
    } catch (err: any) {
      console.error("Error updating role:", err);
      toast.error(err.message || "Không thể cập nhật vai trò");
      return false;
    }
  };

  const getRoleName = (role: AppRole): string => {
    const names: Record<AppRole, string> = {
      admin: "Quản trị viên",
      manager: "Trưởng phòng",
      employee: "Nhân viên",
    };
    return names[role];
  };

  const getRoleColor = (role: AppRole): string => {
    const colors: Record<AppRole, string> = {
      admin: "bg-destructive text-destructive-foreground",
      manager: "bg-primary text-primary-foreground",
      employee: "bg-muted text-muted-foreground",
    };
    return colors[role];
  };

  const getStats = () => {
    const admins = userRoles.filter((r) => r.role === "admin").length;
    const managers = userRoles.filter((r) => r.role === "manager").length;
    const employees = userRoles.filter((r) => r.role === "employee").length;
    return { total: userRoles.length, admins, managers, employees };
  };

  return {
    userRoles,
    loading,
    error,
    isAdmin,
    fetchRoles,
    updateUserRole,
    getRoleName,
    getRoleColor,
    getStats,
  };
}
