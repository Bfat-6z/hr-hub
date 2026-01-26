import { useState } from "react";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";

export default function Employees() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="page-header">Employees</h1>
        <p className="page-subheader">
          Manage your team members and their information.
        </p>
      </div>

      {/* Employee Table */}
      <EmployeeTable onAddEmployee={() => setIsAddDialogOpen(true)} />

      {/* Add Employee Dialog */}
      <AddEmployeeDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
