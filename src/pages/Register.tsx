import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (!agreed) {
      toast.error("Vui lòng đồng ý với điều khoản dịch vụ");
      return;
    }

    setIsLoading(true);
    
    const fullName = `${firstName} ${lastName}`;
    const { error } = await signUp(email, password, fullName);
    
    if (error) {
      toast.error(error.message || "Đăng ký thất bại");
      setIsLoading(false);
      return;
    }

    toast.success("Đăng ký thành công! Đang chuyển hướng...");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar items-center justify-center p-12 relative overflow-hidden">
        {/* Animated background decorations */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-sidebar-primary/15 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-info/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        
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
            Tham gia cùng hàng nghìn doanh nghiệp tin tưởng HRM Pro để quản lý nguồn nhân lực hiệu quả.
          </p>
        </div>
      </div>

      {/* Right side - Register form */}
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
              Tạo tài khoản mới
            </h2>
            <p className="text-muted-foreground">
              Bắt đầu với tài khoản miễn phí của bạn
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-2">
                <Label htmlFor="firstName">Họ</Label>
                <Input 
                  id="firstName" 
                  placeholder="Nguyễn" 
                  className="h-12" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Tên</Label>
                <Input 
                  id="lastName" 
                  placeholder="Văn A" 
                  className="h-12"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <Label htmlFor="email">Email công ty</Label>
              <Input
                id="email"
                type="email"
                placeholder="ten@congty.com"
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.25s" }}>
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <p className="text-xs text-muted-foreground">
                Mật khẩu phải có ít nhất 6 ký tự
              </p>
            </div>

            <div className="flex items-start gap-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Checkbox 
                id="terms" 
                className="mt-0.5 rounded" 
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-relaxed">
                Tôi đồng ý với{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Chính sách bảo mật
                </Link>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base gap-2 group animate-slide-up" 
              style={{ animationDelay: "0.35s" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Đang tạo tài khoản...
                </div>
              ) : (
                <>
                  Tạo tài khoản
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
