import { useState } from "react";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeFormDialog } from "@/components/employees/EmployeeFormDialog";
import { EmployeeViewDialog } from "@/components/employees/EmployeeViewDialog";
import { DeleteEmployeeDialog } from "@/components/employees/DeleteEmployeeDialog";
import { useEmployees, Employee, CreateEmployeeData, UpdateEmployeeData } from "@/hooks/useEmployees";

export default function Employees() {
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
    setSelectedEmployee(employee);
    setIsFormDialogOpen(true);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: CreateEmployeeData): Promise<boolean> => {
    if (selectedEmployee) {
      // Update existing employee
      const updateData: UpdateEmployeeData = {
        id: selectedEmployee.id,
        ...data,
      };
      return await updateEmployee(updateData);
    } else {
      // Create new employee
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
      />

      {/* Form Dialog (Add/Edit) */}
      <EmployeeFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        employee={selectedEmployee}
        onSubmit={handleFormSubmit}
      />

      {/* View Dialog */}
      <EmployeeViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        employee={selectedEmployee}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteEmployeeDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        employee={selectedEmployee}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
