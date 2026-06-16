-- Vaelo — proposals table
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.proposals (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  client_name  text not null,
  client_email text default '',
  items        jsonb not null default '[]',   -- [{ desc, amount }]
  total        numeric not null default 0,    -- INR
  notes        text default '',
  public_token text unique not null,
  status       text not null default 'sent',  -- draft | sent | viewed | accepted | declined
  viewed_at    timestamptz,
  accepted_at  timestamptz,
  created_at   timestamptz not null default now()
);

create index if not exists proposals_created_at_idx on public.proposals (created_at desc);
create index if not exists proposals_token_idx on public.proposals (public_token);

-- Accessed only via the server (service-role key), which bypasses RLS.
alter table public.proposals enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.proposals to service_role;
