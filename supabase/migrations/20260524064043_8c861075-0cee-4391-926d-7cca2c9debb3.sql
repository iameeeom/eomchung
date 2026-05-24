
CREATE TABLE public.rsvp_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  side TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  attendance TEXT NOT NULL,
  guest_count INT DEFAULT 1,
  companion TEXT,
  meal_preference TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.guestbook_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  color_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert rsvp" ON public.rsvp_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read rsvp" ON public.rsvp_submissions FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can insert guestbook" ON public.guestbook_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read guestbook" ON public.guestbook_messages FOR SELECT TO anon, authenticated USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.guestbook_messages;
ALTER TABLE public.guestbook_messages REPLICA IDENTITY FULL;
