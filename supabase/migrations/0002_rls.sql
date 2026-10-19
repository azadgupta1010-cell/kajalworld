-- ============================================================================
--  Row Level Security policies
--  Principle: the PUBLIC (anon) role gets read-only access to PUBLIC content
--  (events, approved+public media, public approved guestbook entries) and may
--  INSERT pending RSVPs / guestbook entries / media rows ONLY through the
--  controlled server layer. All privileged writes (approve, hide, delete,
--  guest list, tokens) go through the SERVICE ROLE in server code after the
--  caller is authorized by @/lib/auth. Never trust the client for those.
-- ============================================================================

alter table events               enable row level security;
alter table households           enable row level security;
alter table guests               enable row level security;
alter table guest_event_access   enable row level security;
alter table rsvps                enable row level security;
alter table albums               enable row level security;
alter table media                enable row level security;
alter table upload_tokens        enable row level security;
alter table upload_sessions      enable row level security;
alter table guestbook_entries    enable row level security;
alter table audit_log            enable row level security;
alter table settings             enable row level security;

-- Events: public read
drop policy if exists events_public_read on events;
create policy events_public_read on events
  for select to anon, authenticated using (true);

-- Albums: public can see only public albums
drop policy if exists albums_public_read on albums;
create policy albums_public_read on albums
  for select to anon, authenticated using (visibility = 'public');

-- Media: public can see only approved media in public albums
drop policy if exists media_public_read on media;
create policy media_public_read on media
  for select to anon, authenticated using (
    status = 'approved'
    and album_id in (select id from albums where visibility = 'public')
  );

-- Guestbook: public can read only approved + public entries
drop policy if exists guestbook_public_read on guestbook_entries;
create policy guestbook_public_read on guestbook_entries
  for select to anon, authenticated using (status = 'approved' and is_public = true);

-- NOTE on writes:
--  We intentionally DO NOT grant anon INSERT policies directly on sensitive
--  tables. Guest-facing writes (RSVP submit, guestbook submit, media upload
--  record) are performed by server route handlers using the service-role
--  client AFTER server-side validation, rate limiting and quota checks.
--  This keeps all enforcement server-side, matching the security brief.
--
--  guests, households, guest_event_access, rsvps, upload_tokens,
--  upload_sessions, audit_log, settings:  NO anon/authenticated policies =>
--  not readable or writable by the public at all. Admin access is via the
--  service role in authorized server code only.
