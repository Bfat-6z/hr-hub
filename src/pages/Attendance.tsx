import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, Clock, UserCheck, UserX, Coffee } from "lucide-react";
import { CheckInOut } from "@/components/attendance/CheckInOut";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { useAttendanceRecords } from "@/hooks/useAttendanceRecords";
import { useAuth } from "@/contexts/AuthContext";

export default function Attendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const { role } = useAuth();
  const { records, loading, stats } = useAttendanceRecords(date);

  const isAdmin = role === "admin";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between animate-fade-in">
        <div className="space-y-1">
          <h1 className="page-header">Chấm công & Nghỉ phép</h1>
          <p className="page-subheader">
            {isAdmin 
              ? "Theo dõi chấm công và quản lý yêu cầu nghỉ phép."
              : "Chấm công hàng ngày và xem lịch sử chấm công của bạn."}
          </p>
        </div>
        {isAdmin && (
          <Button variant="outline" className="w-full sm:w-auto shrink-0">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        )}
      </div>

      {/* Stats - Only show for admin */}
      {isAdmin && (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {[
            { icon: UserCheck, value: stats.present || records.filter(r => r.status === 'present').length, label: "Có mặt", color: "success" },
            { icon: UserX, value: stats.absent, label: "Vắng", color: "destructive" },
            { icon: Clock, value: stats.late || records.filter(r => r.status === 'late').length, label: "Đi muộn", color: "warning" },
            { icon: Coffee, value: stats.onLeave || records.filter(r => r.status === 'half-day').length, label: "Nghỉ phép", color: "info" },
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
      )}

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="attendance" className="flex-1 sm:flex-none">Chấm công</TabsTrigger>
          <TabsTrigger value="leave" className="flex-1 sm:flex-none">Yêu cầu nghỉ</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <div className="flex flex-col gap-4 xl:flex-row">
            {/* Left column: Check-in/out + Calendar */}
            <div className="xl:w-auto space-y-4">
              {/* Check-in/out card for employees */}
              <CheckInOut />

              {/* Calendar - Hidden on small mobile, shown on larger screens */}
              <Card className="hidden sm:block">
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
            </div>

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

              <AttendanceTable 
                records={records}
                loading={loading}
                searchQuery={searchQuery}
              />
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
