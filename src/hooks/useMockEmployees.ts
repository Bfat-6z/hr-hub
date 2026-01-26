import { useState, useEffect, useCallback } from "react";
import { employeeService } from "@/test/mockServices";
import { MockEmployee } from "@/test/mockData";
import { toast } from "sonner";

export interface CreateMockEmployeeData {
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

export interface UpdateMockEmployeeData extends Partial<CreateMockEmployeeData> {
  id: string;
}

export function useMockEmployees() {
  const [employees, setEmployees] = useState<MockEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (err: any) {
      console.error("Error fetching employees:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const createEmployee = async (data: CreateMockEmployeeData): Promise<boolean> => {
    try {
      await employeeService.create(data);
      toast.success("Thêm nhân viên thành công!");
      await fetchEmployees();
      return true;
    } catch (err: any) {
      console.error("Error creating employee:", err);
      toast.error(err.message || "Không thể thêm nhân viên");
      return false;
    }
  };

  const updateEmployee = async (data: UpdateMockEmployeeData): Promise<boolean> => {
    try {
      const { id, ...updateData } = data;
      await employeeService.update(id, updateData);
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
      await employeeService.delete(id);
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
    return employeeService.getStats();
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
