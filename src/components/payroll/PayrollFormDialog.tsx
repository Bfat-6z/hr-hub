import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { CreatePayrollData } from "@/hooks/usePayroll";
import { Employee } from "@/hooks/useEmployees";

interface PayrollFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
  month: number;
  year: number;
  onSubmit: (data: CreatePayrollData) => Promise<boolean>;
}

export function PayrollFormDialog({
  open,
  onOpenChange,
  employees,
  month,
  year,
  onSubmit,
}: PayrollFormDialogProps) {
  const [employeeId, setEmployeeId] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimePay, setOvertimePay] = useState("");
  const [bonus, setBonus] = useState("");
  const [bonusReason, setBonusReason] = useState("");
  const [deductions, setDeductions] = useState("");
  const [deductionReason, setDeductionReason] = useState("");
  const [insurance, setInsurance] = useState("");
  const [tax, setTax] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateNetSalary = () => {
    const base = parseFloat(baseSalary) || 0;
    const overtime = parseFloat(overtimePay) || 0;
    const bonusAmount = parseFloat(bonus) || 0;
    const deductAmount = parseFloat(deductions) || 0;
    const insuranceAmount = parseFloat(insurance) || 0;
    const taxAmount = parseFloat(tax) || 0;

    return base + overtime + bonusAmount - deductAmount - insuranceAmount - taxAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !baseSalary) return;

    setIsSubmitting(true);

    const success = await onSubmit({
      employee_id: employeeId,
      month,
      year,
      base_salary: parseFloat(baseSalary),
      overtime_hours: parseFloat(overtimeHours) || 0,
      overtime_pay: parseFloat(overtimePay) || 0,
      bonus: parseFloat(bonus) || 0,
      bonus_reason: bonusReason || undefined,
      deductions: parseFloat(deductions) || 0,
      deduction_reason: deductionReason || undefined,
      insurance: parseFloat(insurance) || 0,
      tax: parseFloat(tax) || 0,
    });

    setIsSubmitting(false);

    if (success) {
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setEmployeeId("");
    setBaseSalary("");
    setOvertimeHours("");
    setOvertimePay("");
    setBonus("");
    setBonusReason("");
    setDeductions("");
    setDeductionReason("");
    setInsurance("");
    setTax("");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo bảng lương</DialogTitle>
          <DialogDescription>
            Tháng {month}/{year}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nhân viên</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhân viên" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.employee_code} - {emp.last_name} {emp.first_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseSalary">Lương cơ bản (VNĐ)</Label>
              <Input
                id="baseSalary"
                type="number"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtimeHours">Giờ làm thêm</Label>
              <Input
                id="overtimeHours"
                type="number"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="overtimePay">Phụ cấp làm thêm (VNĐ)</Label>
              <Input
                id="overtimePay"
                type="number"
                value={overtimePay}
                onChange={(e) => setOvertimePay(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonus">Thưởng (VNĐ)</Label>
              <Input
                id="bonus"
                type="number"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {bonus && parseFloat(bonus) > 0 && (
            <div className="space-y-2">
              <Label htmlFor="bonusReason">Lý do thưởng</Label>
              <Textarea
                id="bonusReason"
                value={bonusReason}
                onChange={(e) => setBonusReason(e.target.value)}
                placeholder="Nhập lý do thưởng..."
                rows={2}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deductions">Khấu trừ (VNĐ)</Label>
              <Input
                id="deductions"
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurance">Bảo hiểm (VNĐ)</Label>
              <Input
                id="insurance"
                type="number"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax">Thuế thu nhập (VNĐ)</Label>
            <Input
              id="tax"
              type="number"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Lương thực nhận:</span>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(calculateNetSalary())}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting || !employeeId || !baseSalary}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tạo bảng lương
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
