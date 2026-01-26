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
  UserPlus,
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
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" onClick={onAddEmployee} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden shadow-soft">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="data-table-header">Employee</TableHead>
              <TableHead className="data-table-header hidden md:table-cell">Department</TableHead>
              <TableHead className="data-table-header hidden lg:table-cell">Position</TableHead>
              <TableHead className="data-table-header">Status</TableHead>
              <TableHead className="data-table-header hidden sm:table-cell">Join Date</TableHead>
              <TableHead className="data-table-header w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className="animate-fade-in hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-sm font-semibold text-primary">
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
                <TableCell className="text-foreground hidden md:table-cell">
                  {employee.department}
                </TableCell>
                <TableCell className="text-foreground hidden lg:table-cell">
                  {employee.position}
                </TableCell>
                <TableCell>
                  <span className={cn(statusStyles[employee.status])}>
                    {statusLabels[employee.status]}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">
                  {new Date(employee.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Eye className="h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive gap-2 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
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
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <p>
          Showing <span className="font-medium text-foreground">{filteredEmployees.length}</span> of <span className="font-medium text-foreground">{employees.length}</span> employees
        </p>
      </div>
    </div>
  );
}
