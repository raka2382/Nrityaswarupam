-- Run this ONCE in the Supabase SQL Editor if you already created the schema
-- before this change. It removes the fixed list of dance forms so you can add
-- your own (e.g. Kuchipudi, Mohiniyattam, Kathakali, Contemporary…).
alter table public.classes drop constraint if exists classes_dance_form_check;
