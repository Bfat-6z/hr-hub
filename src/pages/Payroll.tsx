import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Download,
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  Plus,
  MoreHorizontal,
  Check,
  Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePayroll, PayrollStatus } from "@/hooks/usePayroll";
import { useEmployees } from "@/hooks/useEmployees";
import { PayrollFormDialog } from "@/components/payroll/PayrollFormDialog";
import { useAuth } from "@/contexts/AuthContext";

const statusStyles: Record<PayrollStatus, { label: string; color: string }> = {
  draft: { label: "Nháp", color: "bg-muted text-muted-foreground" },
  pending: { label: "Chờ duyệt", color: "bg-warning/10 text-warning" },
  approved: { label: "Đã duyệt", color: "bg-info/10 text-info" },
  paid: { label: "Đã thanh toán", color: "bg-success/10 text-success" },
};

const months = [
  { value: 1, label: "Tháng 1" },
  { value: 2, label: "Tháng 2" },
  { value: 3, label: "Tháng 3" },
  { value: 4, label: "Tháng 4" },
  { value: 5, label: "Tháng 5" },
  { value: 6, label: "Tháng 6" },
  { value: 7, label: "Tháng 7" },
  { value: 8, label: "Tháng 8" },
  { value: 9, label: "Tháng 9" },
  { value: 10, label: "Tháng 10" },
  { value: 11, label: "Tháng 11" },
  { value: 12, label: "Tháng 12" },
];

export default function Payroll() {
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const {
    payrolls,
    loading,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    createPayroll,
    approvePayroll,
    markAsPaid,
    getStats,
  } = usePayroll();
  const { employees } = useEmployees();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const stats = getStats();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const filteredPayrolls = payrolls.filter((p) => {
    const employeeName = p.employee
      ? `${p.employee.last_name} ${p.employee.first_name}`.toLowerCase()
      : "";
    return employeeName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="page-header">Quản lý lương</h1>
          <p className="page-subheader">
            {isAdmin
              ? "Quản lý lương, thưởng và thanh toán cho nhân viên."
              : "Xem thông tin lương của bạn."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
          {isAdmin && (
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tạo bảng lương
            </Button>
          )}
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-4 items-center">
        <Select
          value={selectedMonth.toString()}
          onValueChange={(v) => setSelectedMonth(parseInt(v))}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value.toString()}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedYear.toString()}
          onValueChange={(v) => setSelectedYear(parseInt(v))}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="animate-slide-up" style={{ animationDelay: "0ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {formatCurrency(stats.totalPayroll)}
                </p>
                <p className="text-sm text-muted-foreground">Tổng chi lương</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {formatCurrency(stats.totalBonus)}
                </p>
                <p className="text-sm text-muted-foreground">Tổng thưởng</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-info/10 p-2">
                <Calendar className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {months.find((m) => m.value === selectedMonth)?.label} {selectedYear}
                </p>
                <p className="text-sm text-muted-foreground">Kỳ lương</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Chờ thanh toán</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm nhân viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="rounded-lg border bg-card">
          {loading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredPayrolls.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Banknote className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Chưa có bảng lương nào cho kỳ này</p>
              {isAdmin && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo bảng lương
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="data-table-header">Nhân viên</TableHead>
                  <TableHead className="data-table-header">Phòng ban</TableHead>
                  <TableHead className="data-table-header text-right">Lương cơ bản</TableHead>
                  <TableHead className="data-table-header text-right">Thưởng</TableHead>
                  <TableHead className="data-table-header text-right">Khấu trừ</TableHead>
                  <TableHead className="data-table-header text-right">Thực nhận</TableHead>
                  <TableHead className="data-table-header">Trạng thái</TableHead>
                  {isAdmin && <TableHead className="data-table-header text-right">Thao tác</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayrolls.map((record, index) => {
                  const status = statusStyles[record.status];
                  return (
                    <TableRow
                      key={record.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                            {record.employee
                              ? `${record.employee.last_name[0]}${record.employee.first_name[0]}`
                              : "??"}
                          </div>
                          <div>
                            <span className="font-medium">
                              {record.employee
                                ? `${record.employee.last_name} ${record.employee.first_name}`
                                : "N/A"}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {record.employee?.employee_code}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.employee?.department || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(record.base_salary)}
                      </TableCell>
                      <TableCell className="text-right text-success">
                        +{formatCurrency(record.bonus || 0)}
                      </TableCell>
                      <TableCell className="text-right text-destructive">
                        -{formatCurrency((record.deductions || 0) + (record.insurance || 0) + (record.tax || 0))}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(record.net_salary)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn(status.color)}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              {record.status === "draft" && (
                                <DropdownMenuItem onClick={() => approvePayroll(record.id)}>
                                  <Check className="mr-2 h-4 w-4 text-info" />
                                  Duyệt bảng lương
                                </DropdownMenuItem>
                              )}
                              {record.status === "approved" && (
                                <DropdownMenuItem onClick={() => markAsPaid(record.id)}>
                                  <CreditCard className="mr-2 h-4 w-4 text-success" />
                                  Đánh dấu đã thanh toán
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Form Dialog */}
      <PayrollFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        employees={employees}
        month={selectedMonth}
        year={selectedYear}
        onSubmit={createPayroll}
      />
    </div>
  );
}
