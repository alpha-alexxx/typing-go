create table users (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  email text,
  billing_address jsonb,
  payment_method jsonb,
  provider jsonb, -- information about the OAuth2 provider that authenticated this user
  created_at timestamp with time zone,
  updated_at timestamp with time zone
);

alter table users
  enable row level security;
create policy "Can view own user data." on users
  for select using (auth.uid() = id);
create policy "Can update own user data." on users
  for update using (auth.uid() = id);

create function public.handle_new_user()
returns trigger as
$$
  begin
    insert into public.users (id,email, full_name, avatar_url, provider, created_at)
    values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_app_meta_data, new.created_at);
    return new;
  end;
$$

language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
    execute procedure public.handle_new_user();

