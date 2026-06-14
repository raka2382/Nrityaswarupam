-- Nrityaswarupam — Supabase schema, security policies and storage.
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query) once.

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  dance_form text not null default 'kathak',
  level text not null default 'beginner'
    check (level in ('beginner','intermediate','advanced','all')),
  day text not null default 'Monday'
    check (day in ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  time text not null default '',
  duration text not null default '',
  instructor text not null default '',
  room text not null default '',
  instructor_image text,
  sort_order int not null default 0,
  featured boolean not null default false,
  blurb text,
  image text,
  created_at timestamptz not null default now()
);

create table if not exists public.instructors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null default '',
  bio text,
  photo text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Performance',
  caption text,
  image text not null,
  aspect text not null default 'aspect-[3/4]',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  dance_form text,
  level text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null default '',
  photo text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Single-row table for editable site/contact details.
create table if not exists public.site_settings (
  id int primary key default 1,
  address text not null default '',
  phone text not null default '',
  email text not null default '',
  hours text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);
insert into public.site_settings (id, address, phone, email, hours)
values (1, '123 Heritage Lane, Bengaluru, Karnataka 560001', '+91 00000 00000', 'hello@nrityaswarupam.com', 'Mon–Sat · 7:00 AM – 8:00 PM')
on conflict (id) do nothing;

-- ----------------------------------------------------------------------------
-- Row Level Security
--   * anyone (anon) can READ the public content tables
--   * anyone can INSERT an enquiry, but only admins can read them
--   * any logged-in (authenticated) user is treated as an admin
-- ----------------------------------------------------------------------------
alter table public.classes enable row level security;
alter table public.instructors enable row level security;
alter table public.gallery_items enable row level security;
alter table public.enquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.stats enable row level security;
alter table public.site_settings enable row level security;

-- Public read of content (drop-then-create so this script is safe to re-run)
drop policy if exists "public read classes" on public.classes;
create policy "public read classes" on public.classes for select to anon, authenticated using (true);
drop policy if exists "public read instructors" on public.instructors;
create policy "public read instructors" on public.instructors for select to anon, authenticated using (true);
drop policy if exists "public read gallery" on public.gallery_items;
create policy "public read gallery" on public.gallery_items for select to anon, authenticated using (true);

-- Admin (authenticated) full write on content
drop policy if exists "admin write classes" on public.classes;
create policy "admin write classes" on public.classes for all to authenticated using (true) with check (true);
drop policy if exists "admin write instructors" on public.instructors;
create policy "admin write instructors" on public.instructors for all to authenticated using (true) with check (true);
drop policy if exists "admin write gallery" on public.gallery_items;
create policy "admin write gallery" on public.gallery_items for all to authenticated using (true) with check (true);

-- Enquiries: public can insert, only admins can read/manage
drop policy if exists "public insert enquiries" on public.enquiries;
create policy "public insert enquiries" on public.enquiries for insert to anon, authenticated with check (true);
drop policy if exists "admin read enquiries" on public.enquiries;
create policy "admin read enquiries" on public.enquiries for select to authenticated using (true);
drop policy if exists "admin manage enquiries" on public.enquiries;
create policy "admin manage enquiries" on public.enquiries for delete to authenticated using (true);

-- Testimonials: public read, admin write
drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select to anon, authenticated using (true);
drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials for all to authenticated using (true) with check (true);

-- Stats: public read, admin write
drop policy if exists "public read stats" on public.stats;
create policy "public read stats" on public.stats for select to anon, authenticated using (true);
drop policy if exists "admin write stats" on public.stats;
create policy "admin write stats" on public.stats for all to authenticated using (true) with check (true);

-- Site settings: public read, admin write
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "admin write settings" on public.site_settings;
create policy "admin write settings" on public.site_settings for all to authenticated using (true) with check (true);

-- ----------------------------------------------------------------------------
-- Storage bucket for gallery / instructor photo uploads
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');
drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects
  for update to authenticated using (bucket_id = 'media');
drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
