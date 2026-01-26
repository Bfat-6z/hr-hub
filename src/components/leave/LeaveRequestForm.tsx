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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { LeaveType, CreateLeaveRequestData } from "@/hooks/useLeaveRequests";

interface LeaveRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
  onSubmit: (data: CreateLeaveRequestData) => Promise<boolean>;
}

const leaveTypes: { value: LeaveType; label: string }[] = [
  { value: "annual", label: "Nghỉ phép năm" },
  { value: "sick", label: "Nghỉ ốm" },
  { value: "personal", label: "Nghỉ việc riêng" },
  { value: "maternity", label: "Nghỉ thai sản" },
  { value: "paternity", label: "Nghỉ chăm con" },
  { value: "unpaid", label: "Nghỉ không lương" },
];

export function LeaveRequestForm({
  open,
  onOpenChange,
  employeeId,
  onSubmit,
}: LeaveRequestFormProps) {
  const [leaveType, setLeaveType] = useState<LeaveType>("annual");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daysCount = startDate && endDate 
    ? differenceInDays(endDate, startDate) + 1 
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      return;
    }

    setIsSubmitting(true);

    const success = await onSubmit({
      employee_id: employeeId,
      leave_type: leaveType,
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
      days_count: daysCount,
      reason: reason || undefined,
    });

    setIsSubmitting(false);

    if (success) {
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setLeaveType("annual");
    setStartDate(undefined);
    setEndDate(undefined);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tạo đơn nghỉ phép</DialogTitle>
          <DialogDescription>
            Điền thông tin để gửi đơn xin nghỉ phép.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leaveType">Loại nghỉ phép</Label>
            <Select value={leaveType} onValueChange={(v) => setLeaveType(v as LeaveType)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại nghỉ phép" />
              </SelectTrigger>
              <SelectContent>
                {leaveTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Từ ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    locale={vi}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Đến ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => startDate ? date < startDate : false}
                    locale={vi}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {daysCount > 0 && (
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <span className="text-sm text-muted-foreground">Tổng số ngày nghỉ: </span>
              <span className="font-semibold">{daysCount} ngày</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Lý do (không bắt buộc)</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do xin nghỉ..."
              rows={3}
            />
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
            <Button type="submit" disabled={isSubmitting || !startDate || !endDate}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gửi đơn
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
