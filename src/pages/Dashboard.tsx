import { Users, UserCheck, Calendar, DollarSign, TrendingUp, Clock, ArrowUpRight, Loader2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, FileText, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function Dashboard() {
  const { role, roleLoading, user, loading } = useAuth();
  const today = format(new Date(), "EEEE, dd 'tháng' MM yyyy", { locale: vi });

  // Only block rendering while auth is loading.
  // Role lookup can happen in the background to avoid getting stuck on a full-page spinner.
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  const isAdmin = role === "admin" || role === "manager";
  const userName = user?.user_metadata?.full_name || "Nhân viên";

  // Employee dashboard - simplified view
  if (!isAdmin) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-1 animate-fade-in">
          <h1 className="page-header">Xin chào, {userName}!</h1>
          <p className="page-subheader">
            Đây là trang tổng quan cá nhân của bạn.
          </p>
        </div>

        {/* Quick Actions for Employee */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="animate-slide-up hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Chấm công
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Check-in/Check-out và xem lịch sử chấm công của bạn.
              </p>
              <Button asChild className="w-full">
                <Link to="/attendance">Đi tới Chấm công</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-slide-up stagger-1 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-warning" />
                Đơn nghỉ phép
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Tạo đơn xin nghỉ phép và theo dõi trạng thái.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/attendance">Xem đơn nghỉ</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-slide-up stagger-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardList className="h-5 w-5 text-info" />
                Cài đặt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Cập nhật thông tin cá nhân và mật khẩu.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/settings">Đi tới Cài đặt</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Employee Stats */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Thông tin nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-primary">22</p>
                <p className="text-sm text-muted-foreground">Ngày công tháng này</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-success">12</p>
                <p className="text-sm text-muted-foreground">Ngày phép còn lại</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-warning">2</p>
                <p className="text-sm text-muted-foreground">Đơn chờ duyệt</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-info">1</p>
                <p className="text-sm text-muted-foreground">Đánh giá mới</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin/Manager dashboard - full view
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2 animate-fade-in">
        <h1 className="page-header">Tổng quan</h1>
        <p className="page-subheader">
          Chào mừng trở lại! Đây là tình hình nhân sự hôm nay.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="capitalize">{today}</span>
          {roleLoading ? (
            <span className="inline-flex items-center gap-1">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Đang xác định quyền...</span>
            </span>
          ) : null}
        </div>
      </div>

      {/* Stats Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <div className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <StatCard
            title="Tổng nhân viên"
            value={156}
            change="+12 so với tháng trước"
            changeType="positive"
            icon={Users}
            iconColor="bg-primary/10 text-primary"
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <StatCard
            title="Có mặt hôm nay"
            value={142}
            change="91% tỷ lệ chấm công"
            changeType="positive"
            icon={UserCheck}
            iconColor="bg-success/10 text-success"
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <StatCard
            title="Đang nghỉ phép"
            value={8}
            change="3 đơn chờ duyệt"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-warning/10 text-warning"
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <StatCard
            title="Tổng lương tháng"
            value="2.84 tỷ"
            change="+5.2% so với tháng trước"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-info/10 text-info"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <AttendanceChart />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <DepartmentChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <RecentActivity />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <QuickStats />
        </div>
      </div>
    </div>
  );
}

// Quick Stats Component
function QuickStats() {
  const stats = [
    { label: "Nhân viên mới", value: 12, icon: TrendingUp, color: "bg-success/10 text-success" },
    { label: "Nghỉ việc", value: 3, icon: Users, color: "bg-destructive/10 text-destructive" },
    { label: "Chờ duyệt", value: 7, icon: Clock, color: "bg-info/10 text-info" },
    { label: "Đánh giá tới", value: 15, icon: Calendar, color: "bg-warning/10 text-warning" },
  ];

  return (
    <div className="stat-card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Thống kê nhanh
        </h3>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {stats.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:-translate-x-1"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`rounded-lg p-2 ${item.color} shrink-0`}>
                <item.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-foreground truncate">{item.label}</span>
            </div>
            <span className="text-lg font-bold text-foreground shrink-0 ml-2">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
