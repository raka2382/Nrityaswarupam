-- Run this ONCE in the Supabase SQL Editor to add editable contact details
-- (if you created the schema before this feature existed).

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

alter table public.site_settings enable row level security;

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "admin write settings" on public.site_settings;
create policy "admin write settings" on public.site_settings for all to authenticated using (true) with check (true);
