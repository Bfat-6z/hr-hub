import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileHeader } from "./MobileHeader";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider, useSidebarContext } from "@/contexts/SidebarContext";

function MainContent() {
  const [mounted, setMounted] = useState(false);
  const { collapsed, isMobile } = useSidebarContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      {/* Mobile Header */}
      {isMobile && <MobileHeader />}
      
      <main 
        className={cn(
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-screen",
          // Desktop: adjust padding based on sidebar state
          !isMobile && (collapsed ? "lg:pl-[72px]" : "lg:pl-64"),
          // Mobile: no left padding, but add top padding for mobile header
          isMobile ? "pt-16" : "",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export function MainLayout() {
  return (
    <SidebarProvider>
      <MainContent />
    </SidebarProvider>
  );
}
