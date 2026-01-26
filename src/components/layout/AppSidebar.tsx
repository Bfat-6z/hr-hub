import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Define navigation items with role-based access
const allNavigation = [
  { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "employee", "manager"] },
  { name: "Nhân viên", href: "/employees", icon: Users, roles: ["admin", "manager"] },
  { name: "Phòng ban", href: "/departments", icon: Building2, roles: ["admin", "manager"] },
  { name: "Chấm công", href: "/attendance", icon: CalendarCheck, roles: ["admin", "employee", "manager"] },
  { name: "Bảng lương", href: "/payroll", icon: DollarSign, roles: ["admin", "manager"] },
  { name: "Tuyển dụng", href: "/recruitment", icon: UserPlus, roles: ["admin", "manager"] },
  { name: "Đánh giá", href: "/performance", icon: Award, roles: ["admin", "manager"] },
  { name: "Phân quyền", href: "/roles", icon: Shield, roles: ["admin"] },
  { name: "Cài đặt", href: "/settings", icon: Settings, roles: ["admin", "employee", "manager"] },
];

const roleLabels: Record<string, string> = {
  admin: "Quản trị viên",
  manager: "Trưởng phòng",
  employee: "Nhân viên",
};

const roleColors: Record<string, string> = {
  admin: "bg-destructive/10 text-destructive border-destructive/30",
  manager: "bg-primary/10 text-primary border-primary/30",
  employee: "bg-muted text-muted-foreground border-muted",
};

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, toggle, isMobile, mobileOpen, setMobileOpen } = useSidebarContext();
  const { signOut, user, role } = useAuth();

  // Filter navigation based on user role
  const navigation = allNavigation.filter((item) => {
    if (!role) return false;
    return item.roles.includes(role);
  });

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          !isMobile && collapsed ? "justify-center w-full" : ""
        )}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-info shadow-glow flex-shrink-0">
            <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className={cn(
            "text-lg font-semibold text-sidebar-foreground tracking-tight whitespace-nowrap transition-all duration-300",
            !isMobile && collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}>
            HRM Pro
          </span>
        </div>
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(false)}
            className="h-8 w-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className={cn(
              "h-8 w-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-300 flex-shrink-0",
              collapsed ? "absolute -right-3 top-4 bg-sidebar border border-sidebar-border rounded-full shadow-md hover:shadow-lg" : ""
            )}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform duration-300",
              collapsed ? "rotate-180" : ""
            )} />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto overflow-x-hidden">
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={handleNavClick}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "animate-fade-in",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/30"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                !isMobile && collapsed ? "justify-center px-2" : ""
              )}
              style={{ animationDelay: `${index * 0.03}s` }}
              title={!isMobile && collapsed ? item.name : undefined}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
              <span className={cn(
                "whitespace-nowrap transition-all duration-300",
                !isMobile && collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              )}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div
          className={cn(
            "flex items-center gap-3 transition-all duration-300",
            !isMobile && collapsed && "justify-center"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-accent to-sidebar-primary/20 ring-2 ring-sidebar-primary/30 flex-shrink-0">
            <span className="text-sm font-semibold text-sidebar-foreground">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className={cn(
            "flex-1 min-w-0 transition-all duration-300",
            !isMobile && collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}>
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.user_metadata?.full_name || user?.email || "Người dùng"}
            </p>
            {role && (
              <Badge 
                variant="outline" 
                className={cn("text-[10px] mt-1 px-1.5 py-0", roleColors[role])}
              >
                {roleLabels[role] || role}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Đăng xuất"
            className={cn(
              "h-9 w-9 text-sidebar-foreground/50 hover:bg-destructive/20 hover:text-destructive transition-all duration-300 hover:scale-105 flex-shrink-0",
              !isMobile && collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile: Drawer overlay
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileOpen(false)}
        />
        {/* Sidebar Drawer */}
        <aside
          className={cn(
            "fixed left-0 top-0 z-50 h-screen w-72 bg-sidebar transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hidden lg:block",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {sidebarContent}
    </aside>
  );
}