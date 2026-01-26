import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Plus,
  Users,
  Eye,
  Edit,
  Trash2,
  Settings,
  Database,
  FileText,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  color: string;
  permissions: {
    employees: { view: boolean; edit: boolean; delete: boolean };
    payroll: { view: boolean; edit: boolean; delete: boolean };
    reports: { view: boolean; edit: boolean; delete: boolean };
    settings: { view: boolean; edit: boolean; delete: boolean };
  };
}

const roles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all features and settings",
    users: 2,
    color: "bg-destructive",
    permissions: {
      employees: { view: true, edit: true, delete: true },
      payroll: { view: true, edit: true, delete: true },
      reports: { view: true, edit: true, delete: true },
      settings: { view: true, edit: true, delete: true },
    },
  },
  {
    id: "2",
    name: "HR Manager",
    description: "Manage employees and HR operations",
    users: 5,
    color: "bg-primary",
    permissions: {
      employees: { view: true, edit: true, delete: true },
      payroll: { view: true, edit: true, delete: false },
      reports: { view: true, edit: true, delete: false },
      settings: { view: true, edit: false, delete: false },
    },
  },
  {
    id: "3",
    name: "Payroll Admin",
    description: "Manage payroll and compensation",
    users: 3,
    color: "bg-success",
    permissions: {
      employees: { view: true, edit: false, delete: false },
      payroll: { view: true, edit: true, delete: true },
      reports: { view: true, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "4",
    name: "Department Head",
    description: "View team data and approve requests",
    users: 12,
    color: "bg-info",
    permissions: {
      employees: { view: true, edit: false, delete: false },
      payroll: { view: true, edit: false, delete: false },
      reports: { view: true, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "5",
    name: "Employee",
    description: "Basic access to personal information",
    users: 134,
    color: "bg-muted-foreground",
    permissions: {
      employees: { view: false, edit: false, delete: false },
      payroll: { view: false, edit: false, delete: false },
      reports: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
];

const permissionCategories = [
  { key: "employees", label: "Employees", icon: Users },
  { key: "payroll", label: "Payroll", icon: DollarSign },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

export default function Roles() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-header">Roles & Permissions</h1>
          <p className="page-subheader">
            Manage user roles and access permissions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{roles.length}</p>
                <p className="text-sm text-muted-foreground">Total Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-info/10 p-2">
                <Users className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-semibold">156</p>
                <p className="text-sm text-muted-foreground">Users Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <Database className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">16</p>
                <p className="text-sm text-muted-foreground">Permission Types</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles List */}
      <div className="grid gap-4">
        {roles.map((role, index) => (
          <Card
            key={role.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("h-3 w-3 rounded-full", role.color)} />
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Users className="mr-1 h-3 w-3" />
                    {role.users} users
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {permissionCategories.map(({ key, label, icon: Icon }) => (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {label}
                    </div>
                    <div className="space-y-2">
                      {(["view", "edit", "delete"] as const).map((action) => (
                        <div
                          key={action}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-muted-foreground capitalize">
                            {action === "view" && <Eye className="inline mr-1 h-3 w-3" />}
                            {action === "edit" && <Edit className="inline mr-1 h-3 w-3" />}
                            {action === "delete" && <Trash2 className="inline mr-1 h-3 w-3" />}
                            {action}
                          </span>
                          <Switch
                            checked={role.permissions[key][action]}
                            disabled
                            className="scale-75"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
