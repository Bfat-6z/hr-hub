import { Users, UserCheck, Clock, DollarSign, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subheader">
          Welcome back! Here's what's happening with your team today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-slide-up stagger-1">
          <StatCard
            title="Total Employees"
            value={156}
            change="+12 from last month"
            changeType="positive"
            icon={Users}
            iconColor="bg-primary/10 text-primary"
          />
        </div>
        <div className="animate-slide-up stagger-2">
          <StatCard
            title="Present Today"
            value={142}
            change="91% attendance rate"
            changeType="positive"
            icon={UserCheck}
            iconColor="bg-success/10 text-success"
          />
        </div>
        <div className="animate-slide-up stagger-3">
          <StatCard
            title="On Leave"
            value={8}
            change="3 pending requests"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-warning/10 text-warning"
          />
        </div>
        <div className="animate-slide-up stagger-4">
          <StatCard
            title="Monthly Payroll"
            value="$284,500"
            change="+5.2% from last month"
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
                Quick Stats
              </h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-5">
              {[
                { label: "New Hires (Month)", value: 12, icon: TrendingUp, color: "bg-success/10 text-success" },
                { label: "Resignations", value: 3, icon: Users, color: "bg-destructive/10 text-destructive" },
                { label: "Pending Approvals", value: 7, icon: Clock, color: "bg-info/10 text-info" },
                { label: "Upcoming Reviews", value: 15, icon: Calendar, color: "bg-warning/10 text-warning" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${item.color}`}>
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
