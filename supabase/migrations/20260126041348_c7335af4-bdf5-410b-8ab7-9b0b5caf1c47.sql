-- Create attendance_records table
CREATE TABLE public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in TIMESTAMP WITH TIME ZONE,
  check_out TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half-day')),
  work_hours INTERVAL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

-- Enable RLS
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Policies: Users can view their own records
CREATE POLICY "Users can view their own attendance"
ON public.attendance_records
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own records (check-in)
CREATE POLICY "Users can check in"
ON public.attendance_records
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own records (check-out)
CREATE POLICY "Users can update their own attendance"
ON public.attendance_records
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can view all records
CREATE POLICY "Admins can view all attendance"
ON public.attendance_records
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage all records
CREATE POLICY "Admins can manage all attendance"
ON public.attendance_records
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at
CREATE TRIGGER update_attendance_records_updated_at
BEFORE UPDATE ON public.attendance_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for attendance updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance_records;