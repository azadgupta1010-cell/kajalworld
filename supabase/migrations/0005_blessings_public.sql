-- ============================================================================
--  Blessings go live immediately and are shown publicly by default. A guest
--  may opt to keep a message private (hidden from the public list) via a
--  checkbox. We add an is_public flag and auto-approve new blessings.
-- ============================================================================

alter table public_blessings
  add column if not exists is_public boolean not null default true;

-- Approve existing rows so they appear now (previously defaulted to pending).
update public_blessings set status = 'approved' where status = 'pending';

-- A public, read-only view the website can query with the anon key: only
-- approved + public blessings, newest first, exposing just the safe fields.
create or replace view public_blessings_feed as
  select id, name, message, created_at
  from public_blessings
  where status = 'approved' and is_public = true
  order by created_at desc;

-- Allow the anon/public role to read the feed view.
grant select on public_blessings_feed to anon, authenticated;
