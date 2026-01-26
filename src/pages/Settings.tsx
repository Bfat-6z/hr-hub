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
      <div className="space-y-1">
        <h1 className="page-header">Settings</h1>
        <p className="page-subheader">
          Manage your account and application preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="profile" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-2xl font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@company.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      defaultValue="+1 234 567 890"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="address"
                      defaultValue="123 Main Street, New York, NY"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Manage your organization's details and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="website"
                      defaultValue="https://acme.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input id="employees" defaultValue="150-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                {
                  title: "Email Notifications",
                  description: "Receive email updates about important events",
                  enabled: true,
                },
                {
                  title: "Leave Requests",
                  description: "Get notified when employees request time off",
                  enabled: true,
                },
                {
                  title: "Payroll Alerts",
                  description: "Receive alerts about payroll processing",
                  enabled: true,
                },
                {
                  title: "New Applicants",
                  description: "Get notified about new job applications",
                  enabled: false,
                },
                {
                  title: "Performance Reviews",
                  description: "Reminders for upcoming performance reviews",
                  enabled: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200"
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
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  <Shield className="h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the application looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                <div>
                  <p className="font-medium text-foreground">Compact Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Reduce spacing for a more compact view
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                <div>
                  <p className="font-medium text-foreground">
                    Sidebar Collapsed by Default
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start with a collapsed sidebar
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
