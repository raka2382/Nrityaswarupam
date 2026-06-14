-- Run this ONCE in the Supabase SQL Editor to add editable testimonials
-- (if you created the schema before this feature existed).

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null default '',
  photo text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select to anon, authenticated using (true);
drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials for all to authenticated using (true) with check (true);

-- Optional starter content:
insert into public.testimonials (quote, name, role, photo, sort_order) values
('Training here has been transformative. The meticulous attention to detail and the deep respect for the art form have fundamentally changed how I approach movement and discipline in my life.','Ananya R.','Advanced Batch','https://lh3.googleusercontent.com/aida-public/AB6AXuAtKHzZdag8FC1UoGi1yI9ifqFi3_SM0iz03wYM0HINv4CbWPQRiozwr31osIVfQQlLoZkqiAMd87fO8msERWYDukvd5ALQzVF4jnPbDS-IFI6qFWtYqUt1ErrbQinUs3zGiWMiXp4hMNGnVE_Affz-oyV-YKppZH2O1r2ZuKF1TAD8H4QhLwt2S7A3tKBjRExduWfDRga7wktp_fI03rD8MxUtFUSPxlNrBGOmheYTcKjLr4ZRml7q1_aO559svPhQ1pK8eoQdFutJ',1),
('The instructors don''t just teach steps; they impart the soul of the dance. The environment is challenging yet incredibly supportive, a true sanctuary for artistic growth.','Vikram S.','Alumni','https://lh3.googleusercontent.com/aida-public/AB6AXuCFQJuJagkM-KiuOM40ojCHPO6-ND3a8SlBNnsC2UpQi9KCgB0DZaAMw5DZVp-2xQNVS-82Z_1lLlhgvY_T5iJO-hdRN00VaLvTMjtaafsDiPQjssEWz3McUD_1EUmFEkwnlW8lxSuu49c6eysPtv8XPDqvLQ4DbnFXQwTj_CZG3dguFCBxQD0TyUhYX0zcq7aa-EhFlP5ovWI5Y5Mrx2xaBm7uu2qy5Ae1f71dIYy3a0arpTP3eIWbHXSMhsMFZdT07CJzP1HLE5Ib',2);
