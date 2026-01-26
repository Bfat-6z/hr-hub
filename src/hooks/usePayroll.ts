import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type PayrollStatus = "draft" | "pending" | "approved" | "paid";

export interface PayrollRecord {
  id: string;
  employee_id: string;
  month: number;
  year: number;
  base_salary: number;
  overtime_hours: number | null;
  overtime_pay: number | null;
  bonus: number | null;
  bonus_reason: string | null;
  deductions: number | null;
  deduction_reason: string | null;
  insurance: number | null;
  tax: number | null;
  net_salary: number;
  status: PayrollStatus;
  approved_by: string | null;
  approved_at: string | null;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  employee?: {
    first_name: string;
    last_name: string;
    department: string | null;
    position: string | null;
    employee_code: string | null;
  };
}

export interface CreatePayrollData {
  employee_id: string;
  month: number;
  year: number;
  base_salary: number;
  overtime_hours?: number;
  overtime_pay?: number;
  bonus?: number;
  bonus_reason?: string;
  deductions?: number;
  deduction_reason?: string;
  insurance?: number;
  tax?: number;
  notes?: string;
}

export function usePayroll() {
  const { user, role } = useAuth();
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const isAdmin = role === "admin";

  const fetchPayrolls = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("payroll")
        .select(`
          *,
          employee:employees(first_name, last_name, department, position, employee_code)
        `)
        .eq("month", selectedMonth)
        .eq("year", selectedYear)
        .order("created_at", { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setPayrolls((data || []) as PayrollRecord[]);
    } catch (err: any) {
      console.error("Error fetching payroll:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchPayrolls();
  }, [fetchPayrolls]);

  const calculateNetSalary = (data: CreatePayrollData): number => {
    const baseSalary = data.base_salary || 0;
    const overtimePay = data.overtime_pay || 0;
    const bonus = data.bonus || 0;
    const deductions = data.deductions || 0;
    const insurance = data.insurance || 0;
    const tax = data.tax || 0;

    return baseSalary + overtimePay + bonus - deductions - insurance - tax;
  };

  const createPayroll = async (data: CreatePayrollData): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const netSalary = calculateNetSalary(data);

      const { error: insertError } = await supabase.from("payroll").insert({
        employee_id: data.employee_id,
        month: data.month,
        year: data.year,
        base_salary: data.base_salary,
        overtime_hours: data.overtime_hours || 0,
        overtime_pay: data.overtime_pay || 0,
        bonus: data.bonus || 0,
        bonus_reason: data.bonus_reason || null,
        deductions: data.deductions || 0,
        deduction_reason: data.deduction_reason || null,
        insurance: data.insurance || 0,
        tax: data.tax || 0,
        net_salary: netSalary,
        status: "draft",
      });

      if (insertError) throw insertError;

      toast.success("Đã tạo bảng lương thành công!");
      await fetchPayrolls();
      return true;
    } catch (err: any) {
      console.error("Error creating payroll:", err);
      toast.error(err.message || "Không thể tạo bảng lương");
      return false;
    }
  };

  const updatePayroll = async (id: string, data: Partial<CreatePayrollData>): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const updateData: any = { ...data };
      
      // Recalculate net salary if any amount changed
      if (data.base_salary !== undefined || data.bonus !== undefined || 
          data.deductions !== undefined || data.insurance !== undefined || 
          data.tax !== undefined || data.overtime_pay !== undefined) {
        
        const current = payrolls.find(p => p.id === id);
        if (current) {
          const merged = { ...current, ...data };
          updateData.net_salary = calculateNetSalary({
            employee_id: merged.employee_id,
            month: merged.month,
            year: merged.year,
            base_salary: merged.base_salary,
            overtime_pay: merged.overtime_pay || 0,
            bonus: merged.bonus || 0,
            deductions: merged.deductions || 0,
            insurance: merged.insurance || 0,
            tax: merged.tax || 0,
          });
        }
      }

      const { error: updateError } = await supabase
        .from("payroll")
        .update(updateData)
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã cập nhật bảng lương!");
      await fetchPayrolls();
      return true;
    } catch (err: any) {
      console.error("Error updating payroll:", err);
      toast.error(err.message || "Không thể cập nhật bảng lương");
      return false;
    }
  };

  const approvePayroll = async (id: string): Promise<boolean> => {
    if (!user || !isAdmin) return false;

    try {
      const { error: updateError } = await supabase
        .from("payroll")
        .update({
          status: "approved",
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã duyệt bảng lương!");
      await fetchPayrolls();
      return true;
    } catch (err: any) {
      console.error("Error approving payroll:", err);
      toast.error(err.message || "Không thể duyệt bảng lương");
      return false;
    }
  };

  const markAsPaid = async (id: string): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const { error: updateError } = await supabase
        .from("payroll")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      toast.success("Đã đánh dấu đã thanh toán!");
      await fetchPayrolls();
      return true;
    } catch (err: any) {
      console.error("Error marking as paid:", err);
      toast.error(err.message || "Không thể cập nhật trạng thái");
      return false;
    }
  };

  const getStats = () => {
    const totalPayroll = payrolls.reduce((sum, p) => sum + p.net_salary, 0);
    const totalBonus = payrolls.reduce((sum, p) => sum + (p.bonus || 0), 0);
    const pending = payrolls.filter((p) => p.status === "pending" || p.status === "draft").length;
    const paid = payrolls.filter((p) => p.status === "paid").length;
    return { totalPayroll, totalBonus, pending, paid, count: payrolls.length };
  };

  return {
    payrolls,
    loading,
    error,
    isAdmin,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    fetchPayrolls,
    createPayroll,
    updatePayroll,
    approvePayroll,
    markAsPaid,
    getStats,
  };
}
