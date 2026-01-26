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
  Search,
  Download,
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PayrollRecord {
  id: string;
  employee: string;
  avatar: string;
  department: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: "paid" | "pending" | "processing";
}

const payrollRecords: PayrollRecord[] = [
  {
    id: "1",
    employee: "Sarah Chen",
    avatar: "SC",
    department: "Engineering",
    baseSalary: 8500,
    bonus: 1000,
    deductions: 850,
    netPay: 8650,
    status: "paid",
  },
  {
    id: "2",
    employee: "Michael Brown",
    avatar: "MB",
    department: "Marketing",
    baseSalary: 6500,
    bonus: 500,
    deductions: 650,
    netPay: 6350,
    status: "paid",
  },
  {
    id: "3",
    employee: "Emily Davis",
    avatar: "ED",
    department: "Sales",
    baseSalary: 5500,
    bonus: 1200,
    deductions: 550,
    netPay: 6150,
    status: "processing",
  },
  {
    id: "4",
    employee: "James Wilson",
    avatar: "JW",
    department: "HR",
    baseSalary: 5000,
    bonus: 0,
    deductions: 500,
    netPay: 4500,
    status: "pending",
  },
  {
    id: "5",
    employee: "Lisa Anderson",
    avatar: "LA",
    department: "Finance",
    baseSalary: 7000,
    bonus: 750,
    deductions: 700,
    netPay: 7050,
    status: "paid",
  },
];

const statusStyles = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  processing: "bg-info/10 text-info",
};

export default function Payroll() {
  const totalPayroll = payrollRecords.reduce((sum, r) => sum + r.netPay, 0);
  const totalBonus = payrollRecords.reduce((sum, r) => sum + r.bonus, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-header">Payroll Management</h1>
          <p className="page-subheader">
            Manage employee salaries, bonuses, and payments.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  ${totalPayroll.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Payroll</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  ${totalBonus.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Bonuses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-info/10 p-2">
                <Calendar className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-semibold">Jan 2024</p>
                <p className="text-sm text-muted-foreground">Pay Period</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">2</p>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search employees..." className="pl-9" />
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="data-table-header">Employee</TableHead>
                <TableHead className="data-table-header">Department</TableHead>
                <TableHead className="data-table-header text-right">Base Salary</TableHead>
                <TableHead className="data-table-header text-right">Bonus</TableHead>
                <TableHead className="data-table-header text-right">Deductions</TableHead>
                <TableHead className="data-table-header text-right">Net Pay</TableHead>
                <TableHead className="data-table-header">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollRecords.map((record, index) => (
                <TableRow
                  key={record.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {record.avatar}
                      </div>
                      <span className="font-medium">{record.employee}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {record.department}
                  </TableCell>
                  <TableCell className="text-right">
                    ${record.baseSalary.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-success">
                    +${record.bonus.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    -${record.deductions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${record.netPay.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(statusStyles[record.status])}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
