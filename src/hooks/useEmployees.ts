import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Employee {
  id: string;
  employee_code: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  department: string | null;
  position: string | null;
  status: "active" | "inactive" | "on-leave";
  join_date: string;
  birth_date: string | null;
  address: string | null;
  avatar_url: string | null;
  salary: number | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateEmployeeData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  status?: "active" | "inactive" | "on-leave";
  join_date?: string;
  birth_date?: string;
  address?: string;
  salary?: number;
}

export interface UpdateEmployeeData extends Partial<CreateEmployeeData> {
  id: string;
}

export function useEmployees() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("employees")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setEmployees((data || []) as Employee[]);
    } catch (err: any) {
      console.error("Error fetching employees:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const createEmployee = async (data: CreateEmployeeData): Promise<boolean> => {
    try {
      const { error: insertError } = await supabase.from("employees").insert({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone || null,
        department: data.department || null,
        position: data.position || null,
        status: data.status || "active",
        join_date: data.join_date || new Date().toISOString().split("T")[0],
        birth_date: data.birth_date || null,
        address: data.address || null,
        salary: data.salary || null,
      });

      if (insertError) {
        throw insertError;
      }

      toast.success("Thêm nhân viên thành công!");
      await fetchEmployees();
      return true;
    } catch (err: any) {
      console.error("Error creating employee:", err);
      toast.error(err.message || "Không thể thêm nhân viên");
      return false;
    }
  };

  const updateEmployee = async (data: UpdateEmployeeData): Promise<boolean> => {
    try {
      const { id, ...updateData } = data;
      
      const { error: updateError } = await supabase
        .from("employees")
        .update(updateData)
        .eq("id", id);

      if (updateError) {
        throw updateError;
      }

      toast.success("Cập nhật nhân viên thành công!");
      await fetchEmployees();
      return true;
    } catch (err: any) {
      console.error("Error updating employee:", err);
      toast.error(err.message || "Không thể cập nhật nhân viên");
      return false;
    }
  };

  const deleteEmployee = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from("employees")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      toast.success("Xóa nhân viên thành công!");
      await fetchEmployees();
      return true;
    } catch (err: any) {
      console.error("Error deleting employee:", err);
      toast.error(err.message || "Không thể xóa nhân viên");
      return false;
    }
  };

  const getStats = () => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === "active").length;
    const inactive = employees.filter((e) => e.status === "inactive").length;
    const onLeave = employees.filter((e) => e.status === "on-leave").length;
    return { total, active, inactive, onLeave };
  };

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getStats,
  };
}
