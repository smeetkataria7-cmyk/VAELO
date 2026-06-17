-- Vaelo — invoices table
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).

create table if not exists public.invoices (
  id           uuid primary key default gen_random_uuid(),
  number       text not null,
  client_name  text not null,
  client_email text default '',
  proposal_id  uuid,
  items        jsonb not null default '[]',   -- [{ desc, amount }]
  subtotal     numeric not null default 0,
  gst_percent  numeric not null default 0,
  total        numeric not null default 0,
  due_date     date,
  notes        text default '',
  public_token text unique not null,
  status       text not null default 'sent',  -- draft | sent | paid | overdue | void
  paid_at      timestamptz,
  created_at   timestamptz not null default now()
);

create index if not exists invoices_created_at_idx on public.invoices (created_at desc);
create index if not exists invoices_email_idx on public.invoices (client_email);
create index if not exists invoices_token_idx on public.invoices (public_token);

alter table public.invoices enable row level security;
grant usage on schema public to service_role;
grant all privileges on table public.invoices to service_role;
