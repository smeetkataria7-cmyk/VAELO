-- Vaelo — contracts (sign / waiting-to-sign)
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.contracts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  client_name  text not null,
  client_email text default '',
  body         text default '',
  public_token text unique not null,
  status       text not null default 'sent',  -- sent | signed
  signer_name  text default '',
  signed_at    timestamptz,
  created_at   timestamptz not null default now()
);

create index if not exists contracts_email_idx on public.contracts (client_email);
create index if not exists contracts_token_idx on public.contracts (public_token);

alter table public.contracts enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.contracts to service_role;
