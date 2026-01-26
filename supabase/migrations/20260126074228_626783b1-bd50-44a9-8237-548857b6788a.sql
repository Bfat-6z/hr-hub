-- Create enum for leave types
CREATE TYPE public.leave_type AS ENUM ('annual', 'sick', 'personal', 'maternity', 'paternity', 'unpaid');

-- Create enum for leave status
CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');

-- Create enum for payroll status
CREATE TYPE public.payroll_status AS ENUM ('draft', 'pending', 'approved', 'paid');

-- Create enum for performance rating
CREATE TYPE public.performance_rating AS ENUM ('excellent', 'good', 'satisfactory', 'needs_improvement', 'unsatisfactory');

-- Extend app_role enum to include manager
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'manager';

-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  leave_type leave_type NOT NULL DEFAULT 'annual',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_count INTEGER NOT NULL DEFAULT 1,
  reason TEXT,
  status leave_status NOT NULL DEFAULT 'pending',
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payroll table
CREATE TABLE public.payroll (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL CHECK (year >= 2000),
  base_salary NUMERIC(15,2) NOT NULL DEFAULT 0,
  overtime_hours NUMERIC(5,2) DEFAULT 0,
  overtime_pay NUMERIC(15,2) DEFAULT 0,
  bonus NUMERIC(15,2) DEFAULT 0,
  bonus_reason TEXT,
  deductions NUMERIC(15,2) DEFAULT 0,
  deduction_reason TEXT,
  insurance NUMERIC(15,2) DEFAULT 0,
  tax NUMERIC(15,2) DEFAULT 0,
  net_salary NUMERIC(15,2) NOT NULL DEFAULT 0,
  status payroll_status NOT NULL DEFAULT 'draft',
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, month, year)
);

-- Create performance_reviews table
CREATE TABLE public.performance_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL,
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  overall_rating performance_rating NOT NULL,
  goals_achieved INTEGER CHECK (goals_achieved >= 0 AND goals_achieved <= 100),
  strengths TEXT,
  areas_for_improvement TEXT,
  goals_for_next_period TEXT,
  comments TEXT,
  employee_comments TEXT,
  is_acknowledged BOOLEAN DEFAULT false,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;

-- Leave requests policies
CREATE POLICY "Admins can manage all leave requests" ON public.leave_requests
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Employees can view their own leave requests" ON public.leave_requests
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Employees can create their own leave requests" ON public.leave_requests
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Employees can update their pending leave requests" ON public.leave_requests
FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Payroll policies
CREATE POLICY "Admins can manage all payroll" ON public.payroll
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Employees can view their own payroll" ON public.payroll
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.employees e 
    WHERE e.id = payroll.employee_id 
    AND e.user_id = auth.uid()
  )
);

-- Performance reviews policies
CREATE POLICY "Admins can manage all performance reviews" ON public.performance_reviews
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Employees can view their own reviews" ON public.performance_reviews
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.employees e 
    WHERE e.id = performance_reviews.employee_id 
    AND e.user_id = auth.uid()
  )
);

CREATE POLICY "Employees can acknowledge their reviews" ON public.performance_reviews
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.employees e 
    WHERE e.id = performance_reviews.employee_id 
    AND e.user_id = auth.uid()
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.employees e 
    WHERE e.id = performance_reviews.employee_id 
    AND e.user_id = auth.uid()
  )
);

-- Add triggers for updated_at
CREATE TRIGGER update_leave_requests_updated_at
BEFORE UPDATE ON public.leave_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payroll_updated_at
BEFORE UPDATE ON public.payroll
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_performance_reviews_updated_at
BEFORE UPDATE ON public.performance_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();