import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className={cn(
        "pl-64 transition-all duration-300",
        mounted ? "opacity-100" : "opacity-0"
      )}>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
