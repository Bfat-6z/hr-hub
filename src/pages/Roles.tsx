import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Shield,
  Users,
  Database,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRoles, AppRole } from "@/hooks/useRoles";
import { useAuth } from "@/contexts/AuthContext";

export default function Roles() {
  const { role: currentUserRole } = useAuth();
  const isAdmin = currentUserRole === "admin";
  const {
    userRoles,
    loading,
    updateUserRole,
    getRoleName,
    getRoleColor,
    getStats,
  } = useRoles();

  const stats = getStats();

  const handleRoleChange = async (userId: string, newRole: string) => {
    await updateUserRole(userId, newRole as AppRole);
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Không có quyền truy cập</h2>
          <p className="text-muted-foreground">
            Bạn cần quyền quản trị để xem trang này.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="page-header">Phân quyền & Vai trò</h1>
          <p className="page-subheader">
            Quản lý vai trò và quyền truy cập của người dùng.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="animate-slide-up" style={{ animationDelay: "0ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Tổng người dùng</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-destructive/10 p-2">
                <Shield className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.admins}</p>
                <p className="text-sm text-muted-foreground">Quản trị viên</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <UserCog className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.managers}</p>
                <p className="text-sm text-muted-foreground">Trưởng phòng</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Database className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.employees}</p>
                <p className="text-sm text-muted-foreground">Nhân viên</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          {userRoles.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Chưa có người dùng nào</p>
            </div>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="data-table-header">Người dùng</TableHead>
                    <TableHead className="data-table-header">Phòng ban</TableHead>
                    <TableHead className="data-table-header">Chức vụ</TableHead>
                    <TableHead className="data-table-header">Vai trò hiện tại</TableHead>
                    <TableHead className="data-table-header">Thay đổi vai trò</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRoles.map((userRole, index) => (
                    <TableRow
                      key={userRole.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                              {userRole.profile?.full_name
                                ? userRole.profile.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                                : "??"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {userRole.profile?.full_name || "Chưa cập nhật"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {userRole.profile?.department || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {userRole.profile?.position || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(getRoleColor(userRole.role))}>
                          {getRoleName(userRole.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={userRole.role}
                          onValueChange={(value) => handleRoleChange(userRole.user_id, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Quản trị viên</SelectItem>
                            <SelectItem value="manager">Trưởng phòng</SelectItem>
                            <SelectItem value="employee">Nhân viên</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
