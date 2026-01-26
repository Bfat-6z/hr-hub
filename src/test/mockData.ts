// Mock Data cho toàn bộ hệ thống HRM
// Sử dụng để test UI mà không cần backend thực

export interface MockEmployee {
  id: string;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "on-leave";
  join_date: string;
  birth_date: string;
  address: string;
  avatar_url: string | null;
  salary: number;
  created_at: string;
  updated_at: string;
}

export interface MockDepartment {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  positions: string[];
  color: string;
  description: string;
}

export interface MockAttendance {
  id: string;
  user_id: string;
  employee_name: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: "present" | "absent" | "late" | "half-day";
  work_hours: string | null;
}

export interface MockPayroll {
  id: string;
  employee_id: string;
  employee: string;
  avatar: string;
  department: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: "paid" | "pending" | "processing";
  pay_period: string;
}

export interface MockJobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  salary: string;
  applicants: number;
  posted: string;
  status: "active" | "closed" | "draft";
  description: string;
}

export interface MockPerformance {
  id: string;
  employee_id: string;
  employee: string;
  avatar: string;
  department: string;
  rating: number;
  goals: number;
  goalsCompleted: number;
  lastReview: string;
  status: "completed" | "pending" | "overdue";
}

export interface MockRole {
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

// ============ EMPLOYEES ============
export const mockEmployees: MockEmployee[] = [
  {
    id: "e1",
    employee_code: "EMP00001",
    first_name: "Nguyễn",
    last_name: "Văn An",
    email: "an.nguyen@company.com",
    phone: "0901234567",
    department: "Kỹ thuật",
    position: "Senior Developer",
    status: "active",
    join_date: "2022-01-15",
    birth_date: "1992-05-20",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    avatar_url: null,
    salary: 35000000,
    created_at: "2022-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "e2",
    employee_code: "EMP00002",
    first_name: "Trần",
    last_name: "Thị Bình",
    email: "binh.tran@company.com",
    phone: "0902345678",
    department: "Marketing",
    position: "Marketing Manager",
    status: "active",
    join_date: "2021-06-01",
    birth_date: "1990-08-15",
    address: "456 Lê Lợi, Q3, TP.HCM",
    avatar_url: null,
    salary: 40000000,
    created_at: "2021-06-01T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "e3",
    employee_code: "EMP00003",
    first_name: "Lê",
    last_name: "Minh Châu",
    email: "chau.le@company.com",
    phone: "0903456789",
    department: "Nhân sự",
    position: "HR Specialist",
    status: "active",
    join_date: "2023-03-20",
    birth_date: "1995-12-10",
    address: "789 Trần Hưng Đạo, Q5, TP.HCM",
    avatar_url: null,
    salary: 25000000,
    created_at: "2023-03-20T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "e4",
    employee_code: "EMP00004",
    first_name: "Phạm",
    last_name: "Đức Dũng",
    email: "dung.pham@company.com",
    phone: "0904567890",
    department: "Tài chính",
    position: "Financial Analyst",
    status: "on-leave",
    join_date: "2020-11-10",
    birth_date: "1988-03-25",
    address: "321 Hai Bà Trưng, Q1, TP.HCM",
    avatar_url: null,
    salary: 32000000,
    created_at: "2020-11-10T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: "e5",
    employee_code: "EMP00005",
    first_name: "Hoàng",
    last_name: "Thị Em",
    email: "em.hoang@company.com",
    phone: "0905678901",
    department: "Bán hàng",
    position: "Sales Executive",
    status: "active",
    join_date: "2022-07-01",
    birth_date: "1993-07-18",
    address: "654 Điện Biên Phủ, Bình Thạnh, TP.HCM",
    avatar_url: null,
    salary: 28000000,
    created_at: "2022-07-01T00:00:00Z",
    updated_at: "2024-01-18T00:00:00Z",
  },
  {
    id: "e6",
    employee_code: "EMP00006",
    first_name: "Vũ",
    last_name: "Quang Phúc",
    email: "phuc.vu@company.com",
    phone: "0906789012",
    department: "Kỹ thuật",
    position: "DevOps Engineer",
    status: "active",
    join_date: "2023-01-10",
    birth_date: "1994-11-30",
    address: "987 Võ Văn Tần, Q3, TP.HCM",
    avatar_url: null,
    salary: 38000000,
    created_at: "2023-01-10T00:00:00Z",
    updated_at: "2024-01-22T00:00:00Z",
  },
  {
    id: "e7",
    employee_code: "EMP00007",
    first_name: "Đỗ",
    last_name: "Thu Giang",
    email: "giang.do@company.com",
    phone: "0907890123",
    department: "Marketing",
    position: "Content Writer",
    status: "inactive",
    join_date: "2021-09-15",
    birth_date: "1996-04-22",
    address: "147 Nguyễn Thị Minh Khai, Q1, TP.HCM",
    avatar_url: null,
    salary: 18000000,
    created_at: "2021-09-15T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "e8",
    employee_code: "EMP00008",
    first_name: "Bùi",
    last_name: "Văn Hải",
    email: "hai.bui@company.com",
    phone: "0908901234",
    department: "Vận hành",
    position: "Operations Manager",
    status: "active",
    join_date: "2019-05-20",
    birth_date: "1985-09-08",
    address: "258 Lý Thường Kiệt, Q10, TP.HCM",
    avatar_url: null,
    salary: 45000000,
    created_at: "2019-05-20T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z",
  },
];

// ============ DEPARTMENTS ============
export const mockDepartments: MockDepartment[] = [
  {
    id: "d1",
    name: "Kỹ thuật",
    head: "Nguyễn Văn An",
    employeeCount: 45,
    positions: ["Senior Developer", "Junior Developer", "Tech Lead", "DevOps", "QA Engineer"],
    color: "bg-primary",
    description: "Phòng phát triển phần mềm và hạ tầng kỹ thuật",
  },
  {
    id: "d2",
    name: "Marketing",
    head: "Trần Thị Bình",
    employeeCount: 20,
    positions: ["Marketing Manager", "Content Writer", "SEO Specialist", "Designer", "Social Media"],
    color: "bg-info",
    description: "Phòng tiếp thị và truyền thông",
  },
  {
    id: "d3",
    name: "Bán hàng",
    head: "Hoàng Thị Em",
    employeeCount: 25,
    positions: ["Sales Manager", "Sales Executive", "Account Manager", "SDR"],
    color: "bg-success",
    description: "Phòng kinh doanh và bán hàng",
  },
  {
    id: "d4",
    name: "Nhân sự",
    head: "Lê Minh Châu",
    employeeCount: 10,
    positions: ["HR Manager", "Recruiter", "HR Specialist", "Training Lead"],
    color: "bg-warning",
    description: "Phòng quản lý nhân sự và tuyển dụng",
  },
  {
    id: "d5",
    name: "Tài chính",
    head: "Phạm Đức Dũng",
    employeeCount: 15,
    positions: ["CFO", "Financial Analyst", "Accountant", "Payroll Specialist"],
    color: "bg-destructive",
    description: "Phòng tài chính kế toán",
  },
  {
    id: "d6",
    name: "Vận hành",
    head: "Bùi Văn Hải",
    employeeCount: 12,
    positions: ["Operations Manager", "Project Manager", "Admin", "Coordinator"],
    color: "bg-accent-foreground",
    description: "Phòng vận hành và điều phối",
  },
];

// ============ ATTENDANCE ============
export const mockAttendance: MockAttendance[] = [
  {
    id: "a1",
    user_id: "e1",
    employee_name: "Nguyễn Văn An",
    date: new Date().toISOString().split("T")[0],
    check_in: "08:30:00",
    check_out: "17:45:00",
    status: "present",
    work_hours: "9h 15m",
  },
  {
    id: "a2",
    user_id: "e2",
    employee_name: "Trần Thị Bình",
    date: new Date().toISOString().split("T")[0],
    check_in: "09:15:00",
    check_out: "18:00:00",
    status: "late",
    work_hours: "8h 45m",
  },
  {
    id: "a3",
    user_id: "e3",
    employee_name: "Lê Minh Châu",
    date: new Date().toISOString().split("T")[0],
    check_in: "08:00:00",
    check_out: null,
    status: "present",
    work_hours: null,
  },
  {
    id: "a4",
    user_id: "e4",
    employee_name: "Phạm Đức Dũng",
    date: new Date().toISOString().split("T")[0],
    check_in: null,
    check_out: null,
    status: "absent",
    work_hours: null,
  },
  {
    id: "a5",
    user_id: "e5",
    employee_name: "Hoàng Thị Em",
    date: new Date().toISOString().split("T")[0],
    check_in: "08:45:00",
    check_out: "12:30:00",
    status: "half-day",
    work_hours: "3h 45m",
  },
  {
    id: "a6",
    user_id: "e6",
    employee_name: "Vũ Quang Phúc",
    date: new Date().toISOString().split("T")[0],
    check_in: "07:55:00",
    check_out: "17:30:00",
    status: "present",
    work_hours: "9h 35m",
  },
  {
    id: "a7",
    user_id: "e8",
    employee_name: "Bùi Văn Hải",
    date: new Date().toISOString().split("T")[0],
    check_in: "08:10:00",
    check_out: "18:20:00",
    status: "present",
    work_hours: "10h 10m",
  },
];

// ============ PAYROLL ============
export const mockPayroll: MockPayroll[] = [
  {
    id: "p1",
    employee_id: "e1",
    employee: "Nguyễn Văn An",
    avatar: "NA",
    department: "Kỹ thuật",
    baseSalary: 35000000,
    bonus: 5000000,
    deductions: 3500000,
    netPay: 36500000,
    status: "paid",
    pay_period: "01/2024",
  },
  {
    id: "p2",
    employee_id: "e2",
    employee: "Trần Thị Bình",
    avatar: "TB",
    department: "Marketing",
    baseSalary: 40000000,
    bonus: 3000000,
    deductions: 4000000,
    netPay: 39000000,
    status: "paid",
    pay_period: "01/2024",
  },
  {
    id: "p3",
    employee_id: "e3",
    employee: "Lê Minh Châu",
    avatar: "LC",
    department: "Nhân sự",
    baseSalary: 25000000,
    bonus: 2000000,
    deductions: 2500000,
    netPay: 24500000,
    status: "processing",
    pay_period: "01/2024",
  },
  {
    id: "p4",
    employee_id: "e4",
    employee: "Phạm Đức Dũng",
    avatar: "PD",
    department: "Tài chính",
    baseSalary: 32000000,
    bonus: 0,
    deductions: 3200000,
    netPay: 28800000,
    status: "pending",
    pay_period: "01/2024",
  },
  {
    id: "p5",
    employee_id: "e5",
    employee: "Hoàng Thị Em",
    avatar: "HE",
    department: "Bán hàng",
    baseSalary: 28000000,
    bonus: 8000000,
    deductions: 2800000,
    netPay: 33200000,
    status: "paid",
    pay_period: "01/2024",
  },
  {
    id: "p6",
    employee_id: "e6",
    employee: "Vũ Quang Phúc",
    avatar: "VP",
    department: "Kỹ thuật",
    baseSalary: 38000000,
    bonus: 4000000,
    deductions: 3800000,
    netPay: 38200000,
    status: "paid",
    pay_period: "01/2024",
  },
  {
    id: "p7",
    employee_id: "e8",
    employee: "Bùi Văn Hải",
    avatar: "BH",
    department: "Vận hành",
    baseSalary: 45000000,
    bonus: 5000000,
    deductions: 4500000,
    netPay: 45500000,
    status: "paid",
    pay_period: "01/2024",
  },
];

// ============ RECRUITMENT ============
export const mockJobPostings: MockJobPosting[] = [
  {
    id: "j1",
    title: "Senior Software Engineer",
    department: "Kỹ thuật",
    location: "TP.HCM (Hybrid)",
    type: "full-time",
    salary: "40-50 triệu",
    applicants: 45,
    posted: "5 ngày trước",
    status: "active",
    description: "Tìm kiếm kỹ sư phần mềm có kinh nghiệm 5+ năm",
  },
  {
    id: "j2",
    title: "Marketing Manager",
    department: "Marketing",
    location: "TP.HCM",
    type: "full-time",
    salary: "35-45 triệu",
    applicants: 32,
    posted: "1 tuần trước",
    status: "active",
    description: "Quản lý đội ngũ marketing và chiến lược thương hiệu",
  },
  {
    id: "j3",
    title: "Sales Executive",
    department: "Bán hàng",
    location: "Hà Nội",
    type: "full-time",
    salary: "20-30 triệu + Hoa hồng",
    applicants: 28,
    posted: "2 tuần trước",
    status: "active",
    description: "Phát triển khách hàng mới và chăm sóc khách hàng hiện tại",
  },
  {
    id: "j4",
    title: "HR Specialist",
    department: "Nhân sự",
    location: "Remote",
    type: "full-time",
    salary: "18-25 triệu",
    applicants: 18,
    posted: "3 ngày trước",
    status: "active",
    description: "Hỗ trợ tuyển dụng và quản lý nhân sự",
  },
  {
    id: "j5",
    title: "UX/UI Designer",
    department: "Kỹ thuật",
    location: "TP.HCM",
    type: "contract",
    salary: "25-35 triệu",
    applicants: 52,
    posted: "1 ngày trước",
    status: "active",
    description: "Thiết kế giao diện người dùng cho các sản phẩm số",
  },
  {
    id: "j6",
    title: "Financial Analyst",
    department: "Tài chính",
    location: "TP.HCM",
    type: "full-time",
    salary: "28-35 triệu",
    applicants: 15,
    posted: "2 tuần trước",
    status: "closed",
    description: "Phân tích tài chính và lập báo cáo",
  },
];

// ============ PERFORMANCE ============
export const mockPerformance: MockPerformance[] = [
  {
    id: "pf1",
    employee_id: "e1",
    employee: "Nguyễn Văn An",
    avatar: "NA",
    department: "Kỹ thuật",
    rating: 4.8,
    goals: 5,
    goalsCompleted: 4,
    lastReview: "12/2023",
    status: "completed",
  },
  {
    id: "pf2",
    employee_id: "e2",
    employee: "Trần Thị Bình",
    avatar: "TB",
    department: "Marketing",
    rating: 4.2,
    goals: 4,
    goalsCompleted: 3,
    lastReview: "12/2023",
    status: "completed",
  },
  {
    id: "pf3",
    employee_id: "e3",
    employee: "Lê Minh Châu",
    avatar: "LC",
    department: "Nhân sự",
    rating: 4.5,
    goals: 6,
    goalsCompleted: 5,
    lastReview: "11/2023",
    status: "pending",
  },
  {
    id: "pf4",
    employee_id: "e4",
    employee: "Phạm Đức Dũng",
    avatar: "PD",
    department: "Tài chính",
    rating: 3.9,
    goals: 4,
    goalsCompleted: 2,
    lastReview: "10/2023",
    status: "overdue",
  },
  {
    id: "pf5",
    employee_id: "e5",
    employee: "Hoàng Thị Em",
    avatar: "HE",
    department: "Bán hàng",
    rating: 4.6,
    goals: 5,
    goalsCompleted: 5,
    lastReview: "12/2023",
    status: "completed",
  },
  {
    id: "pf6",
    employee_id: "e6",
    employee: "Vũ Quang Phúc",
    avatar: "VP",
    department: "Kỹ thuật",
    rating: 4.4,
    goals: 4,
    goalsCompleted: 4,
    lastReview: "12/2023",
    status: "completed",
  },
  {
    id: "pf7",
    employee_id: "e8",
    employee: "Bùi Văn Hải",
    avatar: "BH",
    department: "Vận hành",
    rating: 4.7,
    goals: 5,
    goalsCompleted: 4,
    lastReview: "12/2023",
    status: "completed",
  },
];

// ============ ROLES ============
export const mockRoles: MockRole[] = [
  {
    id: "r1",
    name: "Super Admin",
    description: "Toàn quyền truy cập tất cả tính năng và cài đặt",
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
    id: "r2",
    name: "HR Manager",
    description: "Quản lý nhân viên và các hoạt động HR",
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
    id: "r3",
    name: "Payroll Admin",
    description: "Quản lý lương và phúc lợi",
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
    id: "r4",
    name: "Trưởng phòng",
    description: "Xem dữ liệu team và phê duyệt yêu cầu",
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
    id: "r5",
    name: "Nhân viên",
    description: "Quyền cơ bản xem thông tin cá nhân",
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

// ============ DASHBOARD STATS ============
export const mockDashboardStats = {
  totalEmployees: 156,
  presentToday: 142,
  onLeave: 8,
  monthlySalary: "2.84 tỷ",
  newEmployees: 12,
  resigned: 3,
  pendingApprovals: 7,
  upcomingReviews: 15,
};

// ============ RECENT ACTIVITIES ============
export const mockRecentActivities = [
  {
    id: "act1",
    type: "join",
    user: "Nguyễn Thị Mai",
    action: "đã gia nhập công ty",
    department: "Kỹ thuật",
    time: "2 giờ trước",
  },
  {
    id: "act2",
    type: "leave",
    user: "Trần Văn Bảo",
    action: "đã gửi đơn xin nghỉ phép",
    department: "Marketing",
    time: "4 giờ trước",
  },
  {
    id: "act3",
    type: "promotion",
    user: "Lê Hoàng Nam",
    action: "đã được thăng chức",
    department: "Bán hàng",
    time: "1 ngày trước",
  },
  {
    id: "act4",
    type: "review",
    user: "Phạm Thị Hoa",
    action: "hoàn thành đánh giá hiệu suất",
    department: "Nhân sự",
    time: "1 ngày trước",
  },
  {
    id: "act5",
    type: "payroll",
    user: "Hệ thống",
    action: "đã xử lý lương tháng 12",
    department: "",
    time: "2 ngày trước",
  },
];

// ============ ATTENDANCE CHART DATA ============
export const mockAttendanceChartData = [
  { day: "T2", present: 145, absent: 8, late: 3 },
  { day: "T3", present: 148, absent: 5, late: 3 },
  { day: "T4", present: 142, absent: 10, late: 4 },
  { day: "T5", present: 150, absent: 4, late: 2 },
  { day: "T6", present: 138, absent: 12, late: 6 },
  { day: "T7", present: 45, absent: 0, late: 1 },
  { day: "CN", present: 0, absent: 0, late: 0 },
];

// ============ DEPARTMENT CHART DATA ============
export const mockDepartmentChartData = [
  { name: "Kỹ thuật", value: 45, color: "#8B5CF6" },
  { name: "Marketing", value: 20, color: "#0EA5E9" },
  { name: "Bán hàng", value: 25, color: "#22C55E" },
  { name: "Nhân sự", value: 10, color: "#F59E0B" },
  { name: "Tài chính", value: 15, color: "#EF4444" },
  { name: "Vận hành", value: 12, color: "#6366F1" },
];
