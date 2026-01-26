import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
  avatar: string;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "active",
    joinDate: "2022-03-15",
    avatar: "SC",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "active",
    joinDate: "2021-08-22",
    avatar: "MB",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "Sales",
    position: "Sales Representative",
    status: "on-leave",
    joinDate: "2023-01-10",
    avatar: "ED",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@company.com",
    department: "HR",
    position: "HR Specialist",
    status: "active",
    joinDate: "2020-11-05",
    avatar: "JW",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "inactive",
    joinDate: "2022-06-18",
    avatar: "LA",
  },
  {
    id: "6",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    department: "Engineering",
    position: "Tech Lead",
    status: "active",
    joinDate: "2019-04-25",
    avatar: "RT",
  },
];

const statusStyles = {
  active: "status-badge status-active",
  inactive: "status-badge status-inactive",
  "on-leave": "status-badge status-pending",
};

const statusLabels = {
  active: "Active",
  inactive: "Inactive",
  "on-leave": "On Leave",
};

interface EmployeeTableProps {
  onAddEmployee: () => void;
}

export function EmployeeTable({ onAddEmployee }: EmployeeTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" onClick={onAddEmployee}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="data-table-header">Employee</TableHead>
              <TableHead className="data-table-header">Department</TableHead>
              <TableHead className="data-table-header">Position</TableHead>
              <TableHead className="data-table-header">Status</TableHead>
              <TableHead className="data-table-header">Join Date</TableHead>
              <TableHead className="data-table-header w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {employee.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {employee.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">
                  {employee.department}
                </TableCell>
                <TableCell className="text-foreground">
                  {employee.position}
                </TableCell>
                <TableCell>
                  <span className={cn(statusStyles[employee.status])}>
                    {statusLabels[employee.status]}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(employee.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
      </div>
    </div>
  );
}
