import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Briefcase,
  Users,
  Clock,
  CheckCircle,
  MapPin,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  salary: string;
  applicants: number;
  posted: string;
  status: "active" | "closed" | "draft";
}

const jobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    salary: "$120k - $150k",
    applicants: 45,
    posted: "5 days ago",
    status: "active",
  },
  {
    id: "2",
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "full-time",
    salary: "$80k - $100k",
    applicants: 32,
    posted: "1 week ago",
    status: "active",
  },
  {
    id: "3",
    title: "Sales Representative",
    department: "Sales",
    location: "Chicago, IL",
    type: "full-time",
    salary: "$50k - $70k + Commission",
    applicants: 28,
    posted: "2 weeks ago",
    status: "active",
  },
  {
    id: "4",
    title: "HR Specialist",
    department: "Human Resources",
    location: "Remote",
    type: "full-time",
    salary: "$55k - $70k",
    applicants: 18,
    posted: "3 days ago",
    status: "active",
  },
  {
    id: "5",
    title: "UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "contract",
    salary: "$90k - $110k",
    applicants: 52,
    posted: "1 day ago",
    status: "active",
  },
  {
    id: "6",
    title: "Financial Analyst",
    department: "Finance",
    location: "Boston, MA",
    type: "full-time",
    salary: "$70k - $85k",
    applicants: 15,
    posted: "2 weeks ago",
    status: "closed",
  },
];

const statusStyles = {
  active: "bg-success/10 text-success",
  closed: "bg-muted text-muted-foreground",
  draft: "bg-warning/10 text-warning",
};

const typeStyles = {
  "full-time": "bg-primary/10 text-primary",
  "part-time": "bg-info/10 text-info",
  contract: "bg-warning/10 text-warning",
};

export default function Recruitment() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-header">Recruitment</h1>
          <p className="page-subheader">
            Manage job postings and track applicants.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">5</p>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
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
                <p className="text-2xl font-semibold">190</p>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">12</p>
                <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">8</p>
                <p className="text-sm text-muted-foreground">Hired This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search job postings..." className="pl-9" />
      </div>

      {/* Job Listings */}
      <div className="grid gap-4">
        {jobPostings.map((job, index) => (
          <Card
            key={job.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {job.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={cn(statusStyles[job.status])}
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.department}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(typeStyles[job.type])}
                    >
                      {job.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <div className="text-center sm:text-right">
                    <p className="text-2xl font-semibold text-foreground">
                      {job.applicants}
                    </p>
                    <p className="text-sm text-muted-foreground">applicants</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Posted {job.posted}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
