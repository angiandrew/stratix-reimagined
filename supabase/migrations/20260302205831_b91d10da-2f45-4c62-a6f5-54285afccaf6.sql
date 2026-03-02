
-- Add user_sentiment column to store Retell's sentiment analysis
ALTER TABLE public.calls ADD COLUMN user_sentiment text NULL;

-- Add appointment_booked flag (determined from transcript analysis)
ALTER TABLE public.calls ADD COLUMN appointment_booked boolean NOT NULL DEFAULT false;
