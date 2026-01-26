-- Create employees table
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  employee_code TEXT UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT,
  position TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on-leave')),
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  birth_date DATE,
  address TEXT,
  avatar_url TEXT,
  salary NUMERIC(15, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Only admins can manage employees
CREATE POLICY "Admins can view all employees"
ON public.employees
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert employees"
ON public.employees
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update employees"
ON public.employees
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete employees"
ON public.employees
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Employees can view their own record
CREATE POLICY "Employees can view their own record"
ON public.employees
FOR SELECT
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate employee code
CREATE OR REPLACE FUNCTION public.generate_employee_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.employee_code IS NULL THEN
    NEW.employee_code := 'EMP' || LPAD(
      (SELECT COALESCE(MAX(CAST(SUBSTRING(employee_code FROM 4) AS INTEGER)), 0) + 1 
       FROM public.employees)::TEXT, 
      5, '0'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for auto-generating employee code
CREATE TRIGGER auto_generate_employee_code
BEFORE INSERT ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.generate_employee_code();

-- Insert sample employees
INSERT INTO public.employees (first_name, last_name, email, phone, department, position, status, join_date) VALUES
('Thị Hương', 'Trần', 'huong.tran@congty.vn', '0901234567', 'Kỹ thuật', 'Lập trình viên cao cấp', 'active', '2022-03-15'),
('Văn Minh', 'Nguyễn', 'minh.nguyen@congty.vn', '0902345678', 'Marketing', 'Trưởng phòng Marketing', 'active', '2021-08-22'),
('Thị Lan', 'Phạm', 'lan.pham@congty.vn', '0903456789', 'Kinh doanh', 'Nhân viên kinh doanh', 'on-leave', '2023-01-10'),
('Hoàng Nam', 'Lê', 'nam.le@congty.vn', '0904567890', 'Nhân sự', 'Chuyên viên nhân sự', 'active', '2020-11-05'),
('Thị Hằng', 'Vũ', 'hang.vu@congty.vn', '0905678901', 'Tài chính', 'Chuyên viên tài chính', 'inactive', '2022-06-18'),
('Văn Đức', 'Hoàng', 'duc.hoang@congty.vn', '0906789012', 'Kỹ thuật', 'Trưởng nhóm kỹ thuật', 'active', '2019-04-25');