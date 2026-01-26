import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Camera,
  Check,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1 animate-fade-in">
        <h1 className="page-header">Cài đặt</h1>
        <p className="page-subheader">
          Quản lý tài khoản và tùy chỉnh ứng dụng của bạn.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="profile" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Hồ sơ</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Công ty</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Thông báo</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Bảo mật</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Giao diện</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân và liên hệ của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-2xl font-semibold">
                      NA
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Đổi ảnh đại diện
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF hoặc PNG. Kích thước tối đa 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Họ</Label>
                  <Input id="firstName" defaultValue="Nguyễn" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Tên</Label>
                  <Input id="lastName" defaultValue="Văn A" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue="nguyenvana@congty.vn"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      defaultValue="0901 234 567"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="address"
                      defaultValue="123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Hủy bỏ</Button>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin công ty</CardTitle>
              <CardDescription>
                Quản lý thông tin và nhận diện thương hiệu của tổ chức.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Tên công ty</Label>
                  <Input id="companyName" defaultValue="Công ty ABC" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Ngành nghề</Label>
                  <Input id="industry" defaultValue="Công nghệ thông tin" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="website"
                      defaultValue="https://congtyabc.vn"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Số lượng nhân viên</Label>
                  <Input id="employees" defaultValue="150-500" className="h-11" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Hủy bỏ</Button>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>
                Chọn loại thông báo bạn muốn nhận.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                {
                  title: "Thông báo qua Email",
                  description: "Nhận cập nhật qua email về các sự kiện quan trọng",
                  enabled: true,
                },
                {
                  title: "Yêu cầu nghỉ phép",
                  description: "Thông báo khi nhân viên gửi yêu cầu nghỉ phép",
                  enabled: true,
                },
                {
                  title: "Cảnh báo bảng lương",
                  description: "Nhận thông báo về việc xử lý bảng lương",
                  enabled: true,
                },
                {
                  title: "Ứng viên mới",
                  description: "Thông báo về các đơn ứng tuyển mới",
                  enabled: false,
                },
                {
                  title: "Đánh giá hiệu suất",
                  description: "Nhắc nhở về các buổi đánh giá hiệu suất sắp tới",
                  enabled: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
              <CardDescription>
                Quản lý mật khẩu và tùy chọn bảo mật của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" className="h-11" />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">
                    Xác thực hai yếu tố
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Thêm một lớp bảo mật cho tài khoản của bạn
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Hủy bỏ</Button>
                <Button className="gap-2">
                  <Shield className="h-4 w-4" />
                  Cập nhật mật khẩu
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt giao diện</CardTitle>
              <CardDescription>
                Tùy chỉnh giao diện và trải nghiệm ứng dụng.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-300">
                <div>
                  <p className="font-medium text-foreground">Chế độ gọn</p>
                  <p className="text-sm text-muted-foreground">
                    Giảm khoảng cách để có giao diện gọn gàng hơn
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-300">
                <div>
                  <p className="font-medium text-foreground">
                    Thu gọn thanh bên mặc định
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Bắt đầu với thanh bên ở trạng thái thu gọn
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
