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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Employee } from "@/hooks/useEmployees";

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  stats: { total: number; active: number; inactive: number; onLeave: number };
  onAddEmployee: () => void;
  onViewEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
}

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-muted",
  "on-leave": "bg-warning/10 text-warning border-warning/20",
};

const statusLabels = {
  active: "Đang làm",
  inactive: "Nghỉ việc",
  "on-leave": "Nghỉ phép",
};

function StatCard({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: any;
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 p-4 rounded-xl border bg-card", className)}>
      <div className="p-2 rounded-lg bg-muted">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function EmployeeTable({
  employees,
  loading,
  stats,
  onAddEmployee,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
}: EmployeeTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.last_name} ${employee.first_name}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee.department?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (employee.employee_code?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Tổng nhân viên" value={stats.total} />
        <StatCard icon={UserCheck} label="Đang làm việc" value={stats.active} className="text-success" />
        <StatCard icon={Clock} label="Đang nghỉ phép" value={stats.onLeave} className="text-warning" />
        <StatCard icon={UserX} label="Nghỉ việc" value={stats.inactive} className="text-muted-foreground" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm nhân viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang làm</SelectItem>
              <SelectItem value="on-leave">Nghỉ phép</SelectItem>
              <SelectItem value="inactive">Nghỉ việc</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" onClick={onAddEmployee} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden shadow-soft">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="data-table-header">Mã NV</TableHead>
              <TableHead className="data-table-header">Nhân viên</TableHead>
              <TableHead className="data-table-header hidden md:table-cell">Phòng ban</TableHead>
              <TableHead className="data-table-header hidden lg:table-cell">Chức vụ</TableHead>
              <TableHead className="data-table-header">Trạng thái</TableHead>
              <TableHead className="data-table-header hidden sm:table-cell">Ngày vào</TableHead>
              <TableHead className="data-table-header w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Users className="h-8 w-8" />
                    <p>Không tìm thấy nhân viên nào</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee, index) => {
                const fullName = `${employee.last_name} ${employee.first_name}`;
                const initials = `${employee.last_name.charAt(0)}${employee.first_name.charAt(0)}`;

                return (
                  <TableRow
                    key={employee.id}
                    className="animate-fade-in hover:bg-muted/30 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 30}ms` }}
                    onClick={() => onViewEmployee(employee)}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {employee.employee_code || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{fullName}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground hidden md:table-cell">
                      {employee.department || "-"}
                    </TableCell>
                    <TableCell className="text-foreground hidden lg:table-cell">
                      {employee.position || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", statusStyles[employee.status])}
                      >
                        {statusLabels[employee.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell">
                      {new Date(employee.join_date).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted transition-colors"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewEmployee(employee);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditEmployee(employee);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteEmployee(employee);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <p>
          Hiển thị <span className="font-medium text-foreground">{filteredEmployees.length}</span> trên{" "}
          <span className="font-medium text-foreground">{employees.length}</span> nhân viên
        </p>
      </div>
    </div>
  );
}
