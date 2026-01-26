import { useState, useEffect } from "react";
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
import { UserPlus, Edit, Loader2 } from "lucide-react";
import { Employee, CreateEmployeeData } from "@/hooks/useEmployees";

interface EmployeeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onSubmit: (data: CreateEmployeeData) => Promise<boolean>;
}

const departments = [
  { value: "Kỹ thuật", label: "Kỹ thuật" },
  { value: "Marketing", label: "Marketing" },
  { value: "Kinh doanh", label: "Kinh doanh" },
  { value: "Nhân sự", label: "Nhân sự" },
  { value: "Tài chính", label: "Tài chính" },
  { value: "Hành chính", label: "Hành chính" },
];

export function EmployeeFormDialog({
  open,
  onOpenChange,
  employee,
  onSubmit,
}: EmployeeFormDialogProps) {
  const isEditing = !!employee;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CreateEmployeeData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    status: "active",
    join_date: new Date().toISOString().split("T")[0],
    birth_date: "",
    address: "",
    salary: undefined,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone || "",
        department: employee.department || "",
        position: employee.position || "",
        status: employee.status,
        join_date: employee.join_date,
        birth_date: employee.birth_date || "",
        address: employee.address || "",
        salary: employee.salary || undefined,
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        status: "active",
        join_date: new Date().toISOString().split("T")[0],
        birth_date: "",
        address: "",
        salary: undefined,
      });
    }
  }, [employee, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.email) {
      return;
    }

    setIsSubmitting(true);
    const success = await onSubmit(formData);
    setIsSubmitting(false);

    if (success) {
      onOpenChange(false);
    }
  };

  const handleChange = (field: keyof CreateEmployeeData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Edit className="h-5 w-5 text-primary" />
                Chỉnh sửa nhân viên
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 text-primary" />
                Thêm nhân viên mới
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Cập nhật thông tin nhân viên."
              : "Nhập thông tin chi tiết cho nhân viên mới."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="last_name">Họ <span className="text-destructive">*</span></Label>
                <Input
                  id="last_name"
                  placeholder="Nguyễn"
                  value={formData.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="first_name">Tên <span className="text-destructive">*</span></Label>
                <Input
                  id="first_name"
                  placeholder="Văn A"
                  value={formData.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ten@congty.vn"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="0901 234 567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>

            {/* Department & Position */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Phòng ban</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phòng ban" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Chức vụ</Label>
                <Input
                  id="position"
                  placeholder="Lập trình viên"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                />
              </div>
            </div>

            {/* Status & Join Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang làm</SelectItem>
                    <SelectItem value="inactive">Nghỉ việc</SelectItem>
                    <SelectItem value="on-leave">Nghỉ phép</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="join_date">Ngày vào làm</Label>
                <Input
                  id="join_date"
                  type="date"
                  value={formData.join_date}
                  onChange={(e) => handleChange("join_date", e.target.value)}
                />
              </div>
            </div>

            {/* Birth Date & Salary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birth_date">Ngày sinh</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => handleChange("birth_date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Lương (VNĐ)</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="15000000"
                  value={formData.salary || ""}
                  onChange={(e) => handleChange("salary", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Textarea
                id="address"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Cập nhật" : "Thêm nhân viên"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
