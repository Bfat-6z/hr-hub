import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sidebar-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-info/10 rounded-full blur-3xl" />
        
        <div className="max-w-md text-center relative z-10">
          <div className="flex justify-center mb-8 animate-bounce-soft">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sidebar-primary to-info shadow-glow-lg">
              <Sparkles className="h-10 w-10 text-sidebar-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-sidebar-foreground mb-4 tracking-tight">
            HRM Pro
          </h1>
          <p className="text-lg text-sidebar-foreground/70 leading-relaxed">
            Streamline your human resource management with our comprehensive
            solution. Manage employees, payroll, attendance, and more.
          </p>
          
          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {["Employee Management", "Smart Analytics", "Secure Platform"].map((feature, i) => (
              <div key={i} className="p-4 rounded-xl bg-sidebar-accent/50 backdrop-blur-sm">
                <p className="text-xs font-medium text-sidebar-foreground/80">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-gradient-subtle">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-info shadow-glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">
                HRM Pro
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Welcome back
            </h2>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" className="rounded" />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Remember me for 30 days
              </Label>
            </div>

            <Button type="submit" className="w-full h-12 text-base gap-2 group">
              Sign in
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
