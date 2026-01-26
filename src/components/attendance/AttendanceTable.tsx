import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AttendanceRecord } from "@/hooks/useAttendanceRecords";
import { format } from "date-fns";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  loading: boolean;
  searchQuery: string;
}

const statusStyles = {
  present: "bg-success/10 text-success",
  absent: "bg-destructive/10 text-destructive",
  late: "bg-warning/10 text-warning",
  "half-day": "bg-info/10 text-info",
};

const statusLabels = {
  present: "Có mặt",
  absent: "Vắng",
  late: "Đi muộn",
  "half-day": "Nửa ngày",
};

function formatWorkHours(workHours: string | null): string {
  if (!workHours) return "-";
  // Parse PostgreSQL interval format
  const hoursMatch = workHours.match(/(\d+)\s*hour/);
  const minutesMatch = workHours.match(/(\d+)\s*min/);
  const hours = hoursMatch ? hoursMatch[1] : "0";
  const minutes = minutesMatch ? minutesMatch[1].padStart(2, "0") : "00";
  return `${hours}h ${minutes}m`;
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export function AttendanceTable({
  records,
  loading,
  searchQuery,
}: AttendanceTableProps) {
  const filteredRecords = records.filter((record) =>
    (record.profile?.full_name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (filteredRecords.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            {searchQuery
              ? "Không tìm thấy nhân viên phù hợp"
              : "Chưa có dữ liệu chấm công"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile: Card view */}
      <div className="space-y-3 sm:hidden">
        {filteredRecords.map((record, index) => (
          <Card
            key={record.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-medium text-primary">
                    {getInitials(record.profile?.full_name)}
                  </div>
                  <span className="font-medium text-foreground">
                    {record.profile?.full_name || "Không rõ"}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(statusStyles[record.status])}
                >
                  {statusLabels[record.status]}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Vào</p>
                  <p className="font-medium">
                    {record.check_in
                      ? format(new Date(record.check_in), "HH:mm")
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Ra</p>
                  <p className="font-medium">
                    {record.check_out
                      ? format(new Date(record.check_out), "HH:mm")
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Giờ làm</p>
                  <p className="font-medium">
                    {formatWorkHours(record.work_hours)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Table view */}
      <div className="rounded-xl border bg-card overflow-hidden shadow-soft hidden sm:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-muted/30">
                <TableHead className="data-table-header">Nhân viên</TableHead>
                <TableHead className="data-table-header">Vào</TableHead>
                <TableHead className="data-table-header">Ra</TableHead>
                <TableHead className="data-table-header hidden md:table-cell">
                  Giờ làm
                </TableHead>
                <TableHead className="data-table-header">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record, index) => (
                <TableRow
                  key={record.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-sm font-medium text-primary shrink-0">
                        {getInitials(record.profile?.full_name)}
                      </div>
                      <span className="font-medium truncate">
                        {record.profile?.full_name || "Không rõ"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.check_in
                      ? format(new Date(record.check_in), "HH:mm")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {record.check_out
                      ? format(new Date(record.check_out), "HH:mm")
                      : "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatWorkHours(record.work_hours)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(statusStyles[record.status])}
                    >
                      {statusLabels[record.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
