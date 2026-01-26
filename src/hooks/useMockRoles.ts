import { useState, useEffect } from "react";
import { roleService } from "@/test/mockServices";
import { MockRole } from "@/test/mockData";
import { toast } from "sonner";

export function useMockRoles() {
  const [roles, setRoles] = useState<MockRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRoles: 0,
    usersAssigned: 156,
    permissionTypes: 16,
  });

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await roleService.getAll();
      setRoles(data);
      setStats({
        totalRoles: data.length,
        usersAssigned: data.reduce((sum, r) => sum + r.users, 0),
        permissionTypes: 16,
      });
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const createRole = async (data: Partial<MockRole>): Promise<boolean> => {
    try {
      await roleService.create(data);
      toast.success("Tạo vai trò thành công!");
      await fetchRoles();
      return true;
    } catch (error) {
      toast.error("Không thể tạo vai trò");
      return false;
    }
  };

  const updateRole = async (id: string, data: Partial<MockRole>): Promise<boolean> => {
    try {
      await roleService.update(id, data);
      toast.success("Cập nhật vai trò thành công!");
      await fetchRoles();
      return true;
    } catch (error) {
      toast.error("Không thể cập nhật vai trò");
      return false;
    }
  };

  return {
    roles,
    loading,
    stats,
    fetchRoles,
    createRole,
    updateRole,
  };
}
