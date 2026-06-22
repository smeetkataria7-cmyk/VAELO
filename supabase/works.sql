-- Vaelo — works (public portfolio) table
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.works (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  image_url    text not null default '',
  accent_color text not null default '#1a1a1a',  -- panel tint, sampled from the brand
  categories   text[] not null default '{}',     -- e.g. {AI Production, Branding}
  case_url     text not null default '',          -- where "See case" links (optional)
  sort_order   int  not null default 0,           -- lower = earlier
  published    boolean not null default true,
  created_by   text default '',
  created_at   timestamptz not null default now()
);

create index if not exists works_order_idx on public.works (sort_order asc, created_at desc);

alter table public.works enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.works to service_role;

-- Public bucket for portfolio images (so /work can render them without signed URLs).
insert into storage.buckets (id, name, public)
values ('works', 'works', true)
on conflict (id) do nothing;

-- Anyone can read objects in the public "works" bucket; service_role manages them.
do $$ begin
  create policy "works public read" on storage.objects
    for select using (bucket_id = 'works');
exception when duplicate_object then null; end $$;
