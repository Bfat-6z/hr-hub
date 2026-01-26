import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Employee } from "@/hooks/useEmployees";

interface DeleteEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onConfirm: (id: string) => Promise<boolean>;
}

export function DeleteEmployeeDialog({
  open,
  onOpenChange,
  employee,
  onConfirm,
}: DeleteEmployeeDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!employee) return null;

  const fullName = `${employee.last_name} ${employee.first_name}`;

  const handleConfirm = async () => {
    setIsDeleting(true);
    const success = await onConfirm(employee.id);
    setIsDeleting(false);
    
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa nhân viên</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa nhân viên <strong>{fullName}</strong>?
            <br />
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Xóa nhân viên
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
