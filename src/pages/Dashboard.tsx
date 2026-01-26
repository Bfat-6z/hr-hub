import { Users, UserCheck, Clock, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subheader">
          Welcome back! Here's what's happening with your team.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={156}
          change="+12 from last month"
          changeType="positive"
          icon={Users}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Present Today"
          value={142}
          change="91% attendance rate"
          changeType="positive"
          icon={UserCheck}
          iconColor="bg-success/10 text-success"
        />
        <StatCard
          title="On Leave"
          value={8}
          change="3 pending requests"
          changeType="neutral"
          icon={Calendar}
          iconColor="bg-warning/10 text-warning"
        />
        <StatCard
          title="Monthly Payroll"
          value="$284,500"
          change="+5.2% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-info/10 text-info"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <AttendanceChart />
        <DepartmentChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-success/10 p-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm text-foreground">New Hires (Month)</span>
              </div>
              <span className="text-lg font-semibold text-foreground">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-destructive/10 p-2">
                  <Users className="h-4 w-4 text-destructive" />
                </div>
                <span className="text-sm text-foreground">Resignations</span>
              </div>
              <span className="text-lg font-semibold text-foreground">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-info/10 p-2">
                  <Clock className="h-4 w-4 text-info" />
                </div>
                <span className="text-sm text-foreground">Pending Approvals</span>
              </div>
              <span className="text-lg font-semibold text-foreground">7</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-warning/10 p-2">
                  <Calendar className="h-4 w-4 text-warning" />
                </div>
                <span className="text-sm text-foreground">Upcoming Reviews</span>
              </div>
              <span className="text-lg font-semibold text-foreground">15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
