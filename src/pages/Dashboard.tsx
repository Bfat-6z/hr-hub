import { Users, UserCheck, Clock, DollarSign, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1 animate-fade-in">
        <h1 className="page-header">Tổng quan</h1>
        <p className="page-subheader">
          Chào mừng trở lại! Đây là tình hình nhân sự hôm nay.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-slide-up stagger-1">
          <StatCard
            title="Tổng nhân viên"
            value={156}
            change="+12 so với tháng trước"
            changeType="positive"
            icon={Users}
            iconColor="bg-primary/10 text-primary"
          />
        </div>
        <div className="animate-slide-up stagger-2">
          <StatCard
            title="Có mặt hôm nay"
            value={142}
            change="Tỷ lệ chấm công 91%"
            changeType="positive"
            icon={UserCheck}
            iconColor="bg-success/10 text-success"
          />
        </div>
        <div className="animate-slide-up stagger-3">
          <StatCard
            title="Đang nghỉ phép"
            value={8}
            change="3 yêu cầu chờ duyệt"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-warning/10 text-warning"
          />
        </div>
        <div className="animate-slide-up stagger-4">
          <StatCard
            title="Tổng lương tháng"
            value="2.84 tỷ ₫"
            change="+5.2% so với tháng trước"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-info/10 text-info"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-slide-up stagger-5">
          <AttendanceChart />
        </div>
        <div className="animate-slide-up stagger-6">
          <DepartmentChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in">
          <RecentActivity />
        </div>
        <div className="animate-fade-in">
          <div className="stat-card h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Thống kê nhanh
              </h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-5">
              {[
                { label: "Nhân viên mới (tháng)", value: 12, icon: TrendingUp, color: "bg-success/10 text-success" },
                { label: "Nghỉ việc", value: 3, icon: Users, color: "bg-destructive/10 text-destructive" },
                { label: "Chờ phê duyệt", value: 7, icon: Clock, color: "bg-info/10 text-info" },
                { label: "Đánh giá sắp tới", value: 15, icon: Calendar, color: "bg-warning/10 text-warning" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:-translate-x-1 animate-slide-up"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
