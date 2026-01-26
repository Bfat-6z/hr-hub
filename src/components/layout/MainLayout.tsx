import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider, useSidebarContext } from "@/contexts/SidebarContext";

function MainContent() {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebarContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main 
        className={cn(
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          collapsed ? "pl-[72px]" : "pl-64",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
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
