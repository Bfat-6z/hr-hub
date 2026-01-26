import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Hash,
} from "lucide-react";
import { Employee } from "@/hooks/useEmployees";
import { cn } from "@/lib/utils";

interface EmployeeViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
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

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}

export function EmployeeViewDialog({
  open,
  onOpenChange,
  employee,
}: EmployeeViewDialogProps) {
  if (!employee) return null;

  const fullName = `${employee.last_name} ${employee.first_name}`;
  const initials = `${employee.last_name.charAt(0)}${employee.first_name.charAt(0)}`;

  const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return null;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thông tin nhân viên</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={employee.avatar_url || undefined} />
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{fullName}</h3>
              <p className="text-sm text-muted-foreground">
                {employee.position || "Chưa có chức vụ"}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {employee.employee_code && (
                  <Badge variant="outline" className="text-xs">
                    <Hash className="h-3 w-3 mr-1" />
                    {employee.employee_code}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={cn("text-xs", statusStyles[employee.status])}
                >
                  {statusLabels[employee.status]}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact info */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Thông tin liên hệ
            </h4>
            <InfoRow icon={Mail} label="Email" value={employee.email} />
            <InfoRow icon={Phone} label="Số điện thoại" value={employee.phone} />
            <InfoRow icon={MapPin} label="Địa chỉ" value={employee.address} />
          </div>

          <Separator />

          {/* Work info */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Thông tin công việc
            </h4>
            <InfoRow icon={Building2} label="Phòng ban" value={employee.department} />
            <InfoRow icon={Briefcase} label="Chức vụ" value={employee.position} />
            <InfoRow
              icon={Calendar}
              label="Ngày vào làm"
              value={formatDate(employee.join_date)}
            />
            <InfoRow
              icon={DollarSign}
              label="Mức lương"
              value={formatCurrency(employee.salary)}
            />
          </div>

          {employee.birth_date && (
            <>
              <Separator />
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Thông tin cá nhân
                </h4>
                <InfoRow
                  icon={User}
                  label="Ngày sinh"
                  value={formatDate(employee.birth_date)}
                />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
