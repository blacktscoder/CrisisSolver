--! Previous: sha1:eaf2866060caa0bba319236017c15a40d37a7815
--! Hash: sha1:6b71bcc44a9c6e40d5a459cfca9c27dbce719499

--! split: 1-current.sql
-- Drop existing tables (if necessary, in reverse order)
drop table if exists app_public.allocations;
drop table if exists app_public.requests;
drop table if exists app_public.resources;

-- Create the `resources` table
create table app_public.resources (
  id serial primary key,
  name text not null,
  type text not null check (type in ('food', 'medical', 'shelter', 'other')),
  quantity int not null check (quantity >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.resources enable row level security;

-- Create the `requests` table
create table app_public.requests (
  id serial primary key,
  requester_id uuid not null references app_public.users(id),
  resource_type text not null check (resource_type in ('food', 'medical', 'shelter', 'other')),
  priority int not null check (priority between 1 and 5), -- 1 is highest priority
  quantity int not null check (quantity > 0),
  status text not null default 'pending' check (status in ('pending', 'approved', 'fulfilled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.requests enable row level security;

-- Create the `allocations` table
create table app_public.allocations (
  id serial primary key,
  resource_id int not null references app_public.resources(id),
  request_id int not null references app_public.requests(id),
  allocated_quantity int not null check (allocated_quantity > 0),
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'canceled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.allocations enable row level security;

-- Indexes for optimization
create index on app_public.requests (priority);
create index on app_public.allocations (status);

-- Policies (replace `current_user_id()` with your RLS function)
create policy select_all_resources on app_public.resources for select using (true);
create policy select_own_requests on app_public.requests for select using (requester_id = app_public.current_user_id());
create policy manage_allocations on app_public.allocations for all using (true);

-- Grant permissions
grant select, insert, update, delete on app_public.resources to :DATABASE_VISITOR;
grant select, insert, update, delete on app_public.requests to :DATABASE_VISITOR;
grant select, insert, update, delete on app_public.allocations to :DATABASE_VISITOR;

-- Comments for documentation
comment on table app_public.resources is 'Tracks available resources for allocation.';
comment on column app_public.resources.type is 'The type of resource (e.g., food, medical supplies).';
comment on column app_public.resources.quantity is 'The quantity of the resource available.';
comment on table app_public.requests is 'Tracks requests for resources from crisis zones.';
comment on column app_public.requests.priority is 'The priority level of the request (1 is highest).';
comment on table app_public.allocations is 'Tracks the allocation of resources to requests.';
