-- ============================================================================
--  Public, self-service submissions from the website (no pre-registered guest
--  list needed). These are written by the SERVER using the service role after
--  validation, so no anon policies are added — the public cannot read/write
--  them directly. The couple reviews them in /admin.
-- ============================================================================

-- Free-form RSVPs submitted from the public RSVP form.
create table if not exists public_rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attending boolean not null,
  events text[] not null default '{}',
  plus_ones int not null default 0,
  dietary text,
  message text,
  created_at timestamptz not null default now()
);
create index if not exists idx_public_rsvps_created on public_rsvps(created_at desc);

-- Blessings submitted from the public guestbook form (await moderation).
create table if not exists public_blessings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  consent boolean not null default false,
  status media_status not null default 'pending',  -- reuse moderation enum
  created_at timestamptz not null default now()
);
create index if not exists idx_public_blessings_created on public_blessings(created_at desc);

alter table public_rsvps     enable row level security;
alter table public_blessings enable row level security;
-- No anon/authenticated policies: public cannot read/write; server-only access
-- via the service role. (Public guestbook display, if added later, will read
-- from a dedicated approved-only view/policy.)
