import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  DollarSign,
  UserPlus,
  Award,
  Shield,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
  { name: "Nhân viên", href: "/employees", icon: Users },
  { name: "Phòng ban", href: "/departments", icon: Building2 },
  { name: "Chấm công", href: "/attendance", icon: CalendarCheck },
  { name: "Bảng lương", href: "/payroll", icon: DollarSign },
  { name: "Tuyển dụng", href: "/recruitment", icon: UserPlus },
  { name: "Đánh giá", href: "/performance", icon: Award },
  { name: "Phân quyền", href: "/roles", icon: Shield },
  { name: "Cài đặt", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-out",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-info shadow-glow">
                <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground tracking-tight">
                HRM Pro
              </span>
            </div>
          )}
          {collapsed && (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-info shadow-glow mx-auto">
              <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  "animate-fade-in",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/30"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse button when collapsed */}
        {collapsed && (
          <div className="px-3 py-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(false)}
              className="w-full h-10 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div
            className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center"
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-accent to-sidebar-primary/20 ring-2 ring-sidebar-primary/30">
              <span className="text-sm font-semibold text-sidebar-foreground">
                JD
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Nguyễn Văn A
                </p>
                <p className="text-xs text-sidebar-foreground/50 truncate">
                  Quản lý nhân sự
                </p>
              </div>
            )}
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200 hover:scale-105"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
