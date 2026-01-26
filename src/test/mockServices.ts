// Mock Services - Giả lập các API calls cho testing
// Có thể chuyển đổi qua lại giữa mock và real API

import {
  mockEmployees,
  mockDepartments,
  mockAttendance,
  mockPayroll,
  mockJobPostings,
  mockPerformance,
  mockRoles,
  mockDashboardStats,
  mockRecentActivities,
  mockAttendanceChartData,
  mockDepartmentChartData,
  type MockEmployee,
  type MockDepartment,
  type MockAttendance,
  type MockPayroll,
  type MockJobPosting,
  type MockPerformance,
  type MockRole,
} from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Configuration to toggle between mock and real API
export const USE_MOCK_DATA = true;

// ============ EMPLOYEE SERVICES ============
export const employeeService = {
  getAll: async (): Promise<MockEmployee[]> => {
    await delay(300);
    return [...mockEmployees];
  },

  getById: async (id: string): Promise<MockEmployee | null> => {
    await delay(200);
    return mockEmployees.find((e) => e.id === id) || null;
  },

  create: async (data: Partial<MockEmployee>): Promise<MockEmployee> => {
    await delay(400);
    const newEmployee: MockEmployee = {
      id: `e${Date.now()}`,
      employee_code: `EMP${String(mockEmployees.length + 1).padStart(5, "0")}`,
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      email: data.email || "",
      phone: data.phone || "",
      department: data.department || "",
      position: data.position || "",
      status: data.status || "active",
      join_date: data.join_date || new Date().toISOString().split("T")[0],
      birth_date: data.birth_date || "",
      address: data.address || "",
      avatar_url: null,
      salary: data.salary || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockEmployees.push(newEmployee);
    return newEmployee;
  },

  update: async (id: string, data: Partial<MockEmployee>): Promise<MockEmployee | null> => {
    await delay(300);
    const index = mockEmployees.findIndex((e) => e.id === id);
    if (index === -1) return null;
    mockEmployees[index] = { ...mockEmployees[index], ...data, updated_at: new Date().toISOString() };
    return mockEmployees[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(200);
    const index = mockEmployees.findIndex((e) => e.id === id);
    if (index === -1) return false;
    mockEmployees.splice(index, 1);
    return true;
  },

  getStats: () => {
    const total = mockEmployees.length;
    const active = mockEmployees.filter((e) => e.status === "active").length;
    const inactive = mockEmployees.filter((e) => e.status === "inactive").length;
    const onLeave = mockEmployees.filter((e) => e.status === "on-leave").length;
    return { total, active, inactive, onLeave };
  },
};

// ============ DEPARTMENT SERVICES ============
export const departmentService = {
  getAll: async (): Promise<MockDepartment[]> => {
    await delay(300);
    return [...mockDepartments];
  },

  getById: async (id: string): Promise<MockDepartment | null> => {
    await delay(200);
    return mockDepartments.find((d) => d.id === id) || null;
  },

  create: async (data: Partial<MockDepartment>): Promise<MockDepartment> => {
    await delay(400);
    const newDept: MockDepartment = {
      id: `d${Date.now()}`,
      name: data.name || "",
      head: data.head || "",
      employeeCount: data.employeeCount || 0,
      positions: data.positions || [],
      color: data.color || "bg-primary",
      description: data.description || "",
    };
    mockDepartments.push(newDept);
    return newDept;
  },

  update: async (id: string, data: Partial<MockDepartment>): Promise<MockDepartment | null> => {
    await delay(300);
    const index = mockDepartments.findIndex((d) => d.id === id);
    if (index === -1) return null;
    mockDepartments[index] = { ...mockDepartments[index], ...data };
    return mockDepartments[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(200);
    const index = mockDepartments.findIndex((d) => d.id === id);
    if (index === -1) return false;
    mockDepartments.splice(index, 1);
    return true;
  },
};

// ============ ATTENDANCE SERVICES ============
export const attendanceService = {
  getAll: async (date?: string): Promise<MockAttendance[]> => {
    await delay(300);
    const targetDate = date || new Date().toISOString().split("T")[0];
    return mockAttendance.filter((a) => a.date === targetDate);
  },

  checkIn: async (userId: string, employeeName: string): Promise<MockAttendance> => {
    await delay(400);
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    const isLate = now.getHours() >= 9;
    
    const newRecord: MockAttendance = {
      id: `a${Date.now()}`,
      user_id: userId,
      employee_name: employeeName,
      date: now.toISOString().split("T")[0],
      check_in: timeStr,
      check_out: null,
      status: isLate ? "late" : "present",
      work_hours: null,
    };
    mockAttendance.push(newRecord);
    return newRecord;
  },

  checkOut: async (recordId: string): Promise<MockAttendance | null> => {
    await delay(300);
    const index = mockAttendance.findIndex((a) => a.id === recordId);
    if (index === -1) return null;
    
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    
    // Calculate work hours
    const checkIn = mockAttendance[index].check_in;
    if (checkIn) {
      const [inH, inM] = checkIn.split(":").map(Number);
      const [outH, outM] = timeStr.split(":").map(Number);
      const diffMinutes = (outH * 60 + outM) - (inH * 60 + inM);
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      mockAttendance[index].work_hours = `${hours}h ${minutes}m`;
    }
    
    mockAttendance[index].check_out = timeStr;
    return mockAttendance[index];
  },

  getStats: () => {
    const today = new Date().toISOString().split("T")[0];
    const todayRecords = mockAttendance.filter((a) => a.date === today);
    return {
      present: todayRecords.filter((a) => a.status === "present").length,
      absent: todayRecords.filter((a) => a.status === "absent").length,
      late: todayRecords.filter((a) => a.status === "late").length,
      halfDay: todayRecords.filter((a) => a.status === "half-day").length,
    };
  },
};

// ============ PAYROLL SERVICES ============
export const payrollService = {
  getAll: async (): Promise<MockPayroll[]> => {
    await delay(300);
    return [...mockPayroll];
  },

  getByPeriod: async (period: string): Promise<MockPayroll[]> => {
    await delay(300);
    return mockPayroll.filter((p) => p.pay_period === period);
  },

  updateStatus: async (id: string, status: MockPayroll["status"]): Promise<MockPayroll | null> => {
    await delay(300);
    const index = mockPayroll.findIndex((p) => p.id === id);
    if (index === -1) return null;
    mockPayroll[index].status = status;
    return mockPayroll[index];
  },

  getStats: () => {
    const totalPayroll = mockPayroll.reduce((sum, r) => sum + r.netPay, 0);
    const totalBonus = mockPayroll.reduce((sum, r) => sum + r.bonus, 0);
    const pending = mockPayroll.filter((p) => p.status === "pending" || p.status === "processing").length;
    return { totalPayroll, totalBonus, pending };
  },
};

// ============ RECRUITMENT SERVICES ============
export const recruitmentService = {
  getAll: async (): Promise<MockJobPosting[]> => {
    await delay(300);
    return [...mockJobPostings];
  },

  getById: async (id: string): Promise<MockJobPosting | null> => {
    await delay(200);
    return mockJobPostings.find((j) => j.id === id) || null;
  },

  create: async (data: Partial<MockJobPosting>): Promise<MockJobPosting> => {
    await delay(400);
    const newJob: MockJobPosting = {
      id: `j${Date.now()}`,
      title: data.title || "",
      department: data.department || "",
      location: data.location || "",
      type: data.type || "full-time",
      salary: data.salary || "",
      applicants: 0,
      posted: "Vừa đăng",
      status: "active",
      description: data.description || "",
    };
    mockJobPostings.push(newJob);
    return newJob;
  },

  updateStatus: async (id: string, status: MockJobPosting["status"]): Promise<MockJobPosting | null> => {
    await delay(300);
    const index = mockJobPostings.findIndex((j) => j.id === id);
    if (index === -1) return null;
    mockJobPostings[index].status = status;
    return mockJobPostings[index];
  },

  getStats: () => {
    const activeJobs = mockJobPostings.filter((j) => j.status === "active").length;
    const totalApplicants = mockJobPostings.reduce((sum, j) => sum + j.applicants, 0);
    return { activeJobs, totalApplicants };
  },
};

// ============ PERFORMANCE SERVICES ============
export const performanceService = {
  getAll: async (): Promise<MockPerformance[]> => {
    await delay(300);
    return [...mockPerformance];
  },

  getByEmployee: async (employeeId: string): Promise<MockPerformance | null> => {
    await delay(200);
    return mockPerformance.find((p) => p.employee_id === employeeId) || null;
  },

  updateRating: async (id: string, rating: number): Promise<MockPerformance | null> => {
    await delay(300);
    const index = mockPerformance.findIndex((p) => p.id === id);
    if (index === -1) return null;
    mockPerformance[index].rating = rating;
    return mockPerformance[index];
  },

  getStats: () => {
    const avgRating = mockPerformance.reduce((sum, p) => sum + p.rating, 0) / mockPerformance.length;
    const totalGoals = mockPerformance.reduce((sum, p) => sum + p.goals, 0);
    const completedGoals = mockPerformance.reduce((sum, p) => sum + p.goalsCompleted, 0);
    const pending = mockPerformance.filter((p) => p.status === "pending" || p.status === "overdue").length;
    return { avgRating: avgRating.toFixed(1), goalCompletion: Math.round((completedGoals / totalGoals) * 100), pending };
  },
};

// ============ ROLE SERVICES ============
export const roleService = {
  getAll: async (): Promise<MockRole[]> => {
    await delay(300);
    return [...mockRoles];
  },

  getById: async (id: string): Promise<MockRole | null> => {
    await delay(200);
    return mockRoles.find((r) => r.id === id) || null;
  },

  create: async (data: Partial<MockRole>): Promise<MockRole> => {
    await delay(400);
    const newRole: MockRole = {
      id: `r${Date.now()}`,
      name: data.name || "",
      description: data.description || "",
      users: 0,
      color: data.color || "bg-primary",
      permissions: data.permissions || {
        employees: { view: false, edit: false, delete: false },
        payroll: { view: false, edit: false, delete: false },
        reports: { view: false, edit: false, delete: false },
        settings: { view: false, edit: false, delete: false },
      },
    };
    mockRoles.push(newRole);
    return newRole;
  },

  update: async (id: string, data: Partial<MockRole>): Promise<MockRole | null> => {
    await delay(300);
    const index = mockRoles.findIndex((r) => r.id === id);
    if (index === -1) return null;
    mockRoles[index] = { ...mockRoles[index], ...data };
    return mockRoles[index];
  },
};

// ============ DASHBOARD SERVICES ============
export const dashboardService = {
  getStats: async () => {
    await delay(200);
    return mockDashboardStats;
  },

  getRecentActivities: async () => {
    await delay(300);
    return mockRecentActivities;
  },

  getAttendanceChartData: async () => {
    await delay(200);
    return mockAttendanceChartData;
  },

  getDepartmentChartData: async () => {
    await delay(200);
    return mockDepartmentChartData;
  },
};
