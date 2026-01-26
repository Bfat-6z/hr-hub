import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Clock, UserCheck, UserX, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  employee: string;
  avatar: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "absent" | "late" | "half-day";
  workHours: string;
}

const attendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    employee: "Trần Thị Hương",
    avatar: "TH",
    date: "2024-01-15",
    checkIn: "09:00",
    checkOut: "18:00",
    status: "present",
    workHours: "9h 00m",
  },
  {
    id: "2",
    employee: "Nguyễn Văn Minh",
    avatar: "NM",
    date: "2024-01-15",
    checkIn: "09:15",
    checkOut: "18:30",
    status: "late",
    workHours: "9h 15m",
  },
  {
    id: "3",
    employee: "Phạm Thị Lan",
    avatar: "PL",
    date: "2024-01-15",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    workHours: "-",
  },
  {
    id: "4",
    employee: "Lê Hoàng Nam",
    avatar: "LN",
    date: "2024-01-15",
    checkIn: "09:00",
    checkOut: "13:00",
    status: "half-day",
    workHours: "4h 00m",
  },
  {
    id: "5",
    employee: "Vũ Thị Hằng",
    avatar: "VH",
    date: "2024-01-15",
    checkIn: "08:45",
    checkOut: "17:45",
    status: "present",
    workHours: "9h 00m",
  },
];

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

export default function Attendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = attendanceRecords.filter((record) =>
    record.employee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between animate-fade-in">
        <div className="space-y-1">
          <h1 className="page-header">Chấm công & Nghỉ phép</h1>
          <p className="page-subheader">
            Theo dõi chấm công và quản lý yêu cầu nghỉ phép.
          </p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { icon: UserCheck, value: 142, label: "Có mặt", color: "success" },
          { icon: UserX, value: 8, label: "Vắng", color: "destructive" },
          { icon: Clock, value: 5, label: "Đi muộn", color: "warning" },
          { icon: Coffee, value: 3, label: "Nghỉ phép", color: "info" },
        ].map((stat, index) => (
          <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="p-4 sm:pt-6">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-${stat.color}/10 p-2 shrink-0`}>
                  <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="attendance" className="flex-1 sm:flex-none">Chấm công</TabsTrigger>
          <TabsTrigger value="leave" className="flex-1 sm:flex-none">Yêu cầu nghỉ</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <div className="flex flex-col gap-4 xl:flex-row">
            {/* Calendar - Hidden on small mobile, shown on larger screens */}
            <Card className="xl:w-auto hidden sm:block">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Chọn ngày</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {/* Attendance Table */}
            <div className="flex-1 space-y-4 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm nhân viên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

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
                            {record.avatar}
                          </div>
                          <span className="font-medium text-foreground">{record.employee}</span>
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
                          <p className="font-medium">{record.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Ra</p>
                          <p className="font-medium">{record.checkOut}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Giờ làm</p>
                          <p className="font-medium">{record.workHours}</p>
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
                        <TableHead className="data-table-header hidden md:table-cell">Giờ làm</TableHead>
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
                                {record.avatar}
                              </div>
                              <span className="font-medium truncate">{record.employee}</span>
                            </div>
                          </TableCell>
                          <TableCell>{record.checkIn}</TableCell>
                          <TableCell>{record.checkOut}</TableCell>
                          <TableCell className="hidden md:table-cell">{record.workHours}</TableCell>
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leave">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground py-8">
                Quản lý yêu cầu nghỉ phép sắp ra mắt...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
