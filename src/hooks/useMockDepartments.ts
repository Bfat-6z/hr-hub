import { useState, useEffect } from "react";
import { departmentService } from "@/test/mockServices";
import { MockDepartment } from "@/test/mockData";
import { toast } from "sonner";

export function useMockDepartments() {
  const [departments, setDepartments] = useState<MockDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await departmentService.getAll();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const createDepartment = async (data: Partial<MockDepartment>): Promise<boolean> => {
    try {
      await departmentService.create(data);
      toast.success("Thêm phòng ban thành công!");
      await fetchDepartments();
      return true;
    } catch (error) {
      toast.error("Không thể thêm phòng ban");
      return false;
    }
  };

  const updateDepartment = async (id: string, data: Partial<MockDepartment>): Promise<boolean> => {
    try {
      await departmentService.update(id, data);
      toast.success("Cập nhật phòng ban thành công!");
      await fetchDepartments();
      return true;
    } catch (error) {
      toast.error("Không thể cập nhật phòng ban");
      return false;
    }
  };

  const deleteDepartment = async (id: string): Promise<boolean> => {
    try {
      await departmentService.delete(id);
      toast.success("Xóa phòng ban thành công!");
      await fetchDepartments();
      return true;
    } catch (error) {
      toast.error("Không thể xóa phòng ban");
      return false;
    }
  };

  return {
    departments,
    loading,
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
}
