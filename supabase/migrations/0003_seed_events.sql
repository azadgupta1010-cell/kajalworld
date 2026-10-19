-- ============================================================================
--  Seed the confirmed event schedule for Kajal Gupta & Daya Sagar.
--  Idempotent: upserts by slug. Times are stored in UTC (Asia/Kolkata +05:30).
-- ============================================================================

insert into events (slug, name, starts_at, time_confirmed, venue, venue_confirmed, city, map_url, description, notes, icon, sort_order)
values
  ('tilak', 'Tilak Ceremony', null, false, null, false, null, null,
   'The ceremonial beginning of the wedding celebrations.',
   array['Venue and time to be confirmed.'], 'tilak', 10),

  ('sangeet', 'Sangeet', timestamptz '2026-11-27 16:00:00+05:30', true, 'Apar Hotel', true,
   'Narnaul, Haryana', 'https://maps.app.goo.gl/SqBKoFZ7F9kwWWA98',
   'An evening of music, dance and celebration.',
   array['4:00 PM onwards', 'Dinner at 7:00 PM'], 'sangeet', 20),

  ('mehndi', 'Mehndi Night', timestamptz '2026-12-02 18:00:00+05:30', true, 'Gorakhpur', false,
   'Gorakhpur, Uttar Pradesh', 'https://maps.app.goo.gl/a6v4Y1LwZQnUiRD16',
   'A colourful night of henna and song.',
   array['6:00 PM onwards', 'Exact venue to be confirmed'], 'mehndi', 30),

  ('haldi', 'Haldi Ceremony', timestamptz '2026-12-03 11:00:00+05:30', true, 'Gorakhpur', false,
   'Gorakhpur, Uttar Pradesh', 'https://maps.app.goo.gl/a6v4Y1LwZQnUiRD16',
   'The auspicious turmeric ceremony.',
   array['11:00 AM onwards', 'Exact venue to be confirmed'], 'haldi', 40),

  ('wedding', 'Wedding Ceremony', timestamptz '2026-12-04 19:00:00+05:30', true, 'Manorma Resort', true,
   'Kaudiya, Gorakhpur, Uttar Pradesh', 'https://maps.app.goo.gl/y7v3R611UPaWxFMD9',
   'The sacred vows, under the winter stars.',
   array['Dinner at 7:00 PM', 'Baraat arrival at 9:00 PM'], 'wedding', 50)
on conflict (slug) do update set
  name = excluded.name,
  starts_at = excluded.starts_at,
  time_confirmed = excluded.time_confirmed,
  venue = excluded.venue,
  venue_confirmed = excluded.venue_confirmed,
  city = excluded.city,
  map_url = excluded.map_url,
  description = excluded.description,
  notes = excluded.notes,
  icon = excluded.icon,
  sort_order = excluded.sort_order,
  updated_at = now();
