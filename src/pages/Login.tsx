import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Eye, EyeOff, ArrowRight, Users, Shield, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu");
      return;
    }

    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    setIsLoading(false);
    
    if (error) {
      toast.error(error.message || "Đăng nhập thất bại");
      return;
    }

    toast.success("Đăng nhập thành công!");
    navigate("/dashboard");
  };

  const features = [
    { icon: Users, label: "Quản lý nhân sự" },
    { icon: BarChart3, label: "Phân tích thông minh" },
    { icon: Shield, label: "Bảo mật cao" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar items-center justify-center p-12 relative overflow-hidden">
        {/* Animated background decorations */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-sidebar-primary/15 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-info/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-chart-3/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        
        <div className="max-w-md text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sidebar-primary to-info shadow-glow-lg animate-scale-in">
              <Sparkles className="h-10 w-10 text-sidebar-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-sidebar-foreground mb-4 tracking-tight animate-slide-up">
            HRM Pro
          </h1>
          <p className="text-lg text-sidebar-foreground/70 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Giải pháp quản lý nhân sự toàn diện. Quản lý nhân viên, lương bổng, chấm công và nhiều hơn nữa.
          </p>
          
          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-sidebar-accent/50 backdrop-blur-sm border border-sidebar-border/50 hover:bg-sidebar-accent transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <feature.icon className="h-5 w-5 text-sidebar-primary mx-auto mb-2" />
                <p className="text-xs font-medium text-sidebar-foreground/80">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-gradient-subtle">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-info shadow-glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">
                HRM Pro
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left space-y-2 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Chào mừng trở lại
            </h2>
            <p className="text-muted-foreground">
              Đăng nhập vào tài khoản của bạn để tiếp tục
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Label htmlFor="email">Địa chỉ email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ten@congty.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Checkbox id="remember" className="rounded" />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Ghi nhớ đăng nhập trong 30 ngày
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base gap-2 group animate-slide-up" 
              style={{ animationDelay: "0.25s" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Đang đăng nhập...
                </div>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Tạo tài khoản mới
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
