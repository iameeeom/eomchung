ALTER TABLE public.guestbook_messages
  ADD CONSTRAINT chk_author_len CHECK (length(author) <= 50),
  ADD CONSTRAINT chk_content_len CHECK (length(content) <= 500);