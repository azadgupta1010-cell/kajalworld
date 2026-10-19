-- ============================================================================
--  Kajalworld — Initial schema (Phase 2 foundation)
--  Run against your Supabase project (SQL editor or `supabase db push`).
--  Timezone for all display logic is Asia/Kolkata (handled in app layer).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
--  Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type rsvp_status as enum ('pending', 'attending', 'declined');
exception when duplicate_object then null; end $$;

do $$ begin
  create type media_status as enum ('pending', 'approved', 'hidden', 'rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type media_kind as enum ('image', 'video');
exception when duplicate_object then null; end $$;

do $$ begin
  create type album_visibility as enum ('public', 'guest', 'private');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
--  Events (seeded from weddingConfig; editable via /admin/events)
-- ---------------------------------------------------------------------------
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  starts_at timestamptz,
  time_confirmed boolean not null default false,
  venue text,
  venue_confirmed boolean not null default false,
  city text,
  map_url text,
  description text,
  notes text[],
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  Households & Guests
-- ---------------------------------------------------------------------------
create table if not exists households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references households(id) on delete set null,
  name text not null,
  phone text,
  email text,
  category text,
  plus_one_limit int not null default 0,
  invited boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_guests_household on guests(household_id);

-- Which events a guest is invited to
create table if not exists guest_event_access (
  guest_id uuid references guests(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  primary key (guest_id, event_id)
);

-- ---------------------------------------------------------------------------
--  RSVP responses (one row per guest per event)
-- ---------------------------------------------------------------------------
create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid references guests(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  display_name text not null,
  status rsvp_status not null default 'pending',
  plus_one_count int not null default 0,
  dietary text,
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (guest_id, event_id)
);
create index if not exists idx_rsvps_event on rsvps(event_id);

-- ---------------------------------------------------------------------------
--  Albums & Media
-- ---------------------------------------------------------------------------
create table if not exists albums (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete set null,
  slug text unique not null,
  title text not null,
  visibility album_visibility not null default 'public',
  created_at timestamptz not null default now()
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references albums(id) on delete cascade,
  event_id uuid references events(id) on delete set null,
  kind media_kind not null,
  storage_path text not null,            -- path within the storage bucket
  thumb_path text,
  poster_path text,
  width int,
  height int,
  byte_size bigint,
  content_hash text,                      -- for duplicate detection
  uploader_name text,
  uploader_token_id uuid,
  status media_status not null default 'pending',
  caption text,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);
create index if not exists idx_media_album on media(album_id);
create index if not exists idx_media_status on media(status);
create unique index if not exists uq_media_hash on media(album_id, content_hash)
  where content_hash is not null;

-- ---------------------------------------------------------------------------
--  Guest upload access tokens (revocable, scoped to an event/album)
-- ---------------------------------------------------------------------------
create table if not exists upload_tokens (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  album_id uuid references albums(id) on delete cascade,
  code text unique not null,              -- the code embedded in the QR link
  label text,
  max_files int not null default 50,
  max_bytes bigint not null default 524288000, -- 500 MB default per token
  used_files int not null default 0,
  used_bytes bigint not null default 0,
  expires_at timestamptz,
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists upload_sessions (
  id uuid primary key default gen_random_uuid(),
  token_id uuid references upload_tokens(id) on delete cascade,
  uploader_name text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  file_count int not null default 0,
  byte_count bigint not null default 0
);

-- ---------------------------------------------------------------------------
--  Guestbook (Digital Aashirwad Book)
-- ---------------------------------------------------------------------------
create table if not exists guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  message text not null,
  voice_path text,
  consent boolean not null default false,
  is_public boolean not null default true,
  status media_status not null default 'pending',  -- reuse moderation enum
  created_at timestamptz not null default now()
);
create index if not exists idx_guestbook_status on guestbook_entries(status);

-- ---------------------------------------------------------------------------
--  Admin audit log
-- ---------------------------------------------------------------------------
create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_email text,
  action text not null,
  entity text,
  entity_id uuid,
  detail jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  Configurable settings (couple details, quotas, retention)
-- ---------------------------------------------------------------------------
create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
