import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  MoreHorizontal,
  Check,
  X,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { LeaveRequest, LeaveStatus, LeaveType } from "@/hooks/useLeaveRequests";

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  loading: boolean;
  isAdmin: boolean;
  onApprove: (id: string) => Promise<boolean>;
  onReject: (id: string, reason?: string) => Promise<boolean>;
  onCancel: (id: string) => Promise<boolean>;
}

const statusConfig: Record<LeaveStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Chờ duyệt", color: "bg-warning/10 text-warning", icon: Clock },
  approved: { label: "Đã duyệt", color: "bg-success/10 text-success", icon: CheckCircle },
  rejected: { label: "Từ chối", color: "bg-destructive/10 text-destructive", icon: XCircle },
  cancelled: { label: "Đã hủy", color: "bg-muted text-muted-foreground", icon: X },
};

const leaveTypeLabels: Record<LeaveType, string> = {
  annual: "Nghỉ phép năm",
  sick: "Nghỉ ốm",
  personal: "Nghỉ việc riêng",
  maternity: "Nghỉ thai sản",
  paternity: "Nghỉ chăm con",
  unpaid: "Không lương",
};

export function LeaveRequestsTable({
  requests,
  loading,
  isAdmin,
  onApprove,
  onReject,
  onCancel,
}: LeaveRequestsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = requests.filter((request) => {
    const employeeName = request.employee
      ? `${request.employee.last_name} ${request.employee.first_name}`.toLowerCase()
      : "";
    return employeeName.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn nghỉ phép</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Danh sách đơn nghỉ phép</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Chưa có đơn nghỉ phép nào</p>
          </div>
        ) : (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="data-table-header">Nhân viên</TableHead>
                  <TableHead className="data-table-header">Loại nghỉ</TableHead>
                  <TableHead className="data-table-header">Từ ngày</TableHead>
                  <TableHead className="data-table-header">Đến ngày</TableHead>
                  <TableHead className="data-table-header text-center">Số ngày</TableHead>
                  <TableHead className="data-table-header">Trạng thái</TableHead>
                  <TableHead className="data-table-header text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request, index) => {
                  const status = statusConfig[request.status];
                  const StatusIcon = status.icon;

                  return (
                    <TableRow
                      key={request.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell>
                        <div className="font-medium">
                          {request.employee
                            ? `${request.employee.last_name} ${request.employee.first_name}`
                            : "N/A"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.employee?.department || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {leaveTypeLabels[request.leave_type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(request.start_date), "dd/MM/yyyy", { locale: vi })}
                      </TableCell>
                      <TableCell>
                        {format(new Date(request.end_date), "dd/MM/yyyy", { locale: vi })}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {request.days_count}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn(status.color)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              {isAdmin ? (
                                <>
                                  <DropdownMenuItem onClick={() => onApprove(request.id)}>
                                    <Check className="mr-2 h-4 w-4 text-success" />
                                    Duyệt đơn
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => onReject(request.id)}>
                                    <X className="mr-2 h-4 w-4 text-destructive" />
                                    Từ chối
                                  </DropdownMenuItem>
                                </>
                              ) : (
                                <DropdownMenuItem onClick={() => onCancel(request.id)}>
                                  <X className="mr-2 h-4 w-4" />
                                  Hủy đơn
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
