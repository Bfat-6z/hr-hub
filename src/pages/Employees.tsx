import { useState } from "react";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeFormDialog } from "@/components/employees/EmployeeFormDialog";
import { EmployeeViewDialog } from "@/components/employees/EmployeeViewDialog";
import { DeleteEmployeeDialog } from "@/components/employees/DeleteEmployeeDialog";
import { useEmployees, Employee, CreateEmployeeData, UpdateEmployeeData } from "@/hooks/useEmployees";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function Employees() {
  const { role } = useAuth();
  const {
    employees,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getStats,
  } = useEmployees();

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const canAccess = isAdmin || isManager;

  // Redirect employees to dashboard
  if (!canAccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold">Không có quyền truy cập</h2>
            <p className="text-muted-foreground">
              Bạn không có quyền xem trang này. Vui lòng liên hệ quản trị viên.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = getStats();

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsFormDialogOpen(true);
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    if (!isAdmin) return;
    setSelectedEmployee(employee);
    setIsFormDialogOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    if (!isAdmin) return;
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: CreateEmployeeData): Promise<boolean> => {
    if (selectedEmployee) {
      const updateData: UpdateEmployeeData = {
        id: selectedEmployee.id,
        ...data,
      };
      return await updateEmployee(updateData);
    } else {
      return await createEmployee(data);
    }
  };

  const handleDeleteConfirm = async (id: string): Promise<boolean> => {
    return await deleteEmployee(id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1 animate-fade-in">
        <h1 className="page-header">Nhân viên</h1>
        <p className="page-subheader">
          Quản lý thông tin và hồ sơ nhân viên của bạn.
        </p>
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={employees}
        loading={loading}
        stats={stats}
        onAddEmployee={handleAddEmployee}
        onViewEmployee={handleViewEmployee}
        onEditEmployee={handleEditEmployee}
        onDeleteEmployee={handleDeleteEmployee}
        isAdmin={isAdmin}
      />

      {/* Form Dialog (Add/Edit) - Only for admin */}
      {isAdmin && (
        <EmployeeFormDialog
          open={isFormDialogOpen}
          onOpenChange={setIsFormDialogOpen}
          employee={selectedEmployee}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* View Dialog */}
      <EmployeeViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        employee={selectedEmployee}
      />

      {/* Delete Confirmation Dialog - Only for admin */}
      {isAdmin && (
        <DeleteEmployeeDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          employee={selectedEmployee}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}