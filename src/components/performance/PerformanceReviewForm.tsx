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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
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
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { PerformanceRating, CreateReviewData } from "@/hooks/usePerformanceReviews";
import { Employee } from "@/hooks/useEmployees";

interface PerformanceReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
  onSubmit: (data: CreateReviewData) => Promise<boolean>;
}

const ratingOptions: { value: PerformanceRating; label: string; color: string }[] = [
  { value: "excellent", label: "Xuất sắc", color: "text-success" },
  { value: "good", label: "Tốt", color: "text-primary" },
  { value: "satisfactory", label: "Đạt yêu cầu", color: "text-info" },
  { value: "needs_improvement", label: "Cần cải thiện", color: "text-warning" },
  { value: "unsatisfactory", label: "Không đạt", color: "text-destructive" },
];

export function PerformanceReviewForm({
  open,
  onOpenChange,
  employees,
  onSubmit,
}: PerformanceReviewFormProps) {
  const [employeeId, setEmployeeId] = useState("");
  const [periodStart, setPeriodStart] = useState<Date | undefined>();
  const [periodEnd, setPeriodEnd] = useState<Date | undefined>();
  const [rating, setRating] = useState<PerformanceRating>("good");
  const [goalsAchieved, setGoalsAchieved] = useState([70]);
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [nextGoals, setNextGoals] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !periodStart || !periodEnd) return;

    setIsSubmitting(true);

    const success = await onSubmit({
      employee_id: employeeId,
      review_period_start: format(periodStart, "yyyy-MM-dd"),
      review_period_end: format(periodEnd, "yyyy-MM-dd"),
      overall_rating: rating,
      goals_achieved: goalsAchieved[0],
      strengths: strengths || undefined,
      areas_for_improvement: improvements || undefined,
      goals_for_next_period: nextGoals || undefined,
      comments: comments || undefined,
    });

    setIsSubmitting(false);

    if (success) {
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setEmployeeId("");
    setPeriodStart(undefined);
    setPeriodEnd(undefined);
    setRating("good");
    setGoalsAchieved([70]);
    setStrengths("");
    setImprovements("");
    setNextGoals("");
    setComments("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo đánh giá hiệu suất</DialogTitle>
          <DialogDescription>
            Đánh giá hiệu suất làm việc của nhân viên trong kỳ.
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
                    {emp.last_name} {emp.first_name} - {emp.department || "Chưa có phòng ban"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kỳ đánh giá từ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !periodStart && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {periodStart ? format(periodStart, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={periodStart}
                    onSelect={setPeriodStart}
                    locale={vi}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Đến</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !periodEnd && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {periodEnd ? format(periodEnd, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={periodEnd}
                    onSelect={setPeriodEnd}
                    disabled={(date) => periodStart ? date < periodStart : false}
                    locale={vi}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Đánh giá tổng thể</Label>
            <Select value={rating} onValueChange={(v) => setRating(v as PerformanceRating)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn đánh giá" />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className={option.color}>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Mục tiêu đạt được</Label>
              <span className="text-sm font-medium">{goalsAchieved[0]}%</span>
            </div>
            <Slider
              value={goalsAchieved}
              onValueChange={setGoalsAchieved}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="strengths">Điểm mạnh</Label>
            <Textarea
              id="strengths"
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              placeholder="Liệt kê các điểm mạnh..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="improvements">Cần cải thiện</Label>
            <Textarea
              id="improvements"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="Liệt kê các điểm cần cải thiện..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextGoals">Mục tiêu kỳ tới</Label>
            <Textarea
              id="nextGoals"
              value={nextGoals}
              onChange={(e) => setNextGoals(e.target.value)}
              placeholder="Đặt mục tiêu cho kỳ tiếp theo..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Nhận xét chung</Label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Nhận xét tổng quan..."
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
            <Button
              type="submit"
              disabled={isSubmitting || !employeeId || !periodStart || !periodEnd}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tạo đánh giá
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
