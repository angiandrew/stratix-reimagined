
-- Secure key-value settings table for admin configuration
CREATE TABLE public.app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can read settings
CREATE POLICY "Admins can view settings"
  ON public.app_settings FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert settings
CREATE POLICY "Admins can insert settings"
  ON public.app_settings FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update settings
CREATE POLICY "Admins can update settings"
  ON public.app_settings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete settings
CREATE POLICY "Admins can delete settings"
  ON public.app_settings FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));
