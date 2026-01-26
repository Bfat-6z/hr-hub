import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Users,
  Building2,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  positions: string[];
  color: string;
}

const departments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    head: "Robert Taylor",
    employeeCount: 45,
    positions: ["Software Engineer", "Tech Lead", "DevOps", "QA Engineer"],
    color: "bg-primary",
  },
  {
    id: "2",
    name: "Marketing",
    head: "Sarah Chen",
    employeeCount: 20,
    positions: ["Marketing Manager", "Content Writer", "SEO Specialist", "Designer"],
    color: "bg-info",
  },
  {
    id: "3",
    name: "Sales",
    head: "Michael Brown",
    employeeCount: 25,
    positions: ["Sales Manager", "Account Executive", "Sales Rep", "SDR"],
    color: "bg-success",
  },
  {
    id: "4",
    name: "Human Resources",
    head: "Lisa Anderson",
    employeeCount: 10,
    positions: ["HR Manager", "Recruiter", "HR Specialist", "Training Lead"],
    color: "bg-warning",
  },
  {
    id: "5",
    name: "Finance",
    head: "James Wilson",
    employeeCount: 15,
    positions: ["CFO", "Financial Analyst", "Accountant", "Payroll Specialist"],
    color: "bg-destructive",
  },
  {
    id: "6",
    name: "Operations",
    head: "Emily Davis",
    employeeCount: 12,
    positions: ["Operations Manager", "Project Manager", "Admin", "Coordinator"],
    color: "bg-accent-foreground",
  },
];

export default function Departments() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-header">Departments & Positions</h1>
          <p className="page-subheader">
            Manage your organization's structure and positions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search departments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Department Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((dept, index) => (
          <Card
            key={dept.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${dept.color}/10`}>
                  <Building2 className={`h-5 w-5 ${dept.color.replace('bg-', 'text-')}`} />
                </div>
                <CardTitle className="text-lg">{dept.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{dept.employeeCount} employees</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Department Head
                </p>
                <p className="text-sm font-medium text-foreground">
                  {dept.head}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Positions</p>
                <div className="flex flex-wrap gap-1">
                  {dept.positions.map((position) => (
                    <Badge key={position} variant="secondary" className="text-xs">
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
