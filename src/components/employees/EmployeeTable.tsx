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
    name: "Trần Thị Hương",
    email: "huong.tran@congty.vn",
    department: "Kỹ thuật",
    position: "Lập trình viên cao cấp",
    status: "active",
    joinDate: "2022-03-15",
    avatar: "TH",
  },
  {
    id: "2",
    name: "Nguyễn Văn Minh",
    email: "minh.nguyen@congty.vn",
    department: "Marketing",
    position: "Trưởng phòng Marketing",
    status: "active",
    joinDate: "2021-08-22",
    avatar: "NM",
  },
  {
    id: "3",
    name: "Phạm Thị Lan",
    email: "lan.pham@congty.vn",
    department: "Kinh doanh",
    position: "Nhân viên kinh doanh",
    status: "on-leave",
    joinDate: "2023-01-10",
    avatar: "PL",
  },
  {
    id: "4",
    name: "Lê Hoàng Nam",
    email: "nam.le@congty.vn",
    department: "Nhân sự",
    position: "Chuyên viên nhân sự",
    status: "active",
    joinDate: "2020-11-05",
    avatar: "LN",
  },
  {
    id: "5",
    name: "Vũ Thị Hằng",
    email: "hang.vu@congty.vn",
    department: "Tài chính",
    position: "Chuyên viên tài chính",
    status: "inactive",
    joinDate: "2022-06-18",
    avatar: "VH",
  },
  {
    id: "6",
    name: "Hoàng Văn Đức",
    email: "duc.hoang@congty.vn",
    department: "Kỹ thuật",
    position: "Trưởng nhóm kỹ thuật",
    status: "active",
    joinDate: "2019-04-25",
    avatar: "HD",
  },
];

const statusStyles = {
  active: "status-badge status-active",
  inactive: "status-badge status-inactive",
  "on-leave": "status-badge status-pending",
};

const statusLabels = {
  active: "Đang làm",
  inactive: "Nghỉ việc",
  "on-leave": "Nghỉ phép",
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
            placeholder="Tìm kiếm nhân viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Lọc
          </Button>
          <Button size="sm" onClick={onAddEmployee} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Thêm nhân viên
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden shadow-soft">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="data-table-header">Nhân viên</TableHead>
              <TableHead className="data-table-header hidden md:table-cell">Phòng ban</TableHead>
              <TableHead className="data-table-header hidden lg:table-cell">Chức vụ</TableHead>
              <TableHead className="data-table-header">Trạng thái</TableHead>
              <TableHead className="data-table-header hidden sm:table-cell">Ngày vào</TableHead>
              <TableHead className="data-table-header w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className="animate-fade-in hover:bg-muted/30 transition-all duration-300"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-sm font-semibold text-primary transition-transform duration-300 hover:scale-110">
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
                  {new Date(employee.joinDate).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Eye className="h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit className="h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive gap-2 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                        Xóa
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
          Hiển thị <span className="font-medium text-foreground">{filteredEmployees.length}</span> trên <span className="font-medium text-foreground">{employees.length}</span> nhân viên
        </p>
      </div>
    </div>
  );
}
