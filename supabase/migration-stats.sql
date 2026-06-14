-- Run this ONCE in the Supabase SQL Editor to add editable homepage stats.

create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.stats enable row level security;

drop policy if exists "public read stats" on public.stats;
create policy "public read stats" on public.stats for select to anon, authenticated using (true);
drop policy if exists "admin write stats" on public.stats;
create policy "admin write stats" on public.stats for all to authenticated using (true) with check (true);

-- Optional starter content (edit/remove these in the admin afterwards):
insert into public.stats (value, label, sort_order) values
('500', 'Active Students', 1),
('20', 'Years of Excellence', 2);
