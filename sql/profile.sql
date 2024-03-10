
create type exam_type as enum ('ssc','railways','bsf','crpf','cisf','other armed forces','Other');

create table profiles (
  id uuid references public.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  exam exam_type,
  
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(username) >= 3)
);


alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create function public.handle_new_profile()
returns trigger as $$
begin
      IF TG_OP = 'INSERT' THEN
        INSERT INTO public.profiles (id, full_name, avatar_url, created_at, updated_at)
        VALUES (NEW.id, NEW.full_name, NEW.avatar_url, NEW.created_at, NEW.updated_at);
      ELSIF TG_OP = 'UPDATE' THEN
        UPDATE public.profiles
        SET full_name = NEW.full_name,
            avatar_url = NEW.avatar_url,
            updated_at = NEW.updated_at
        WHERE id = NEW.id;
      ELSIF TG_OP = 'DELETE' THEN
        DELETE FROM public.profiles
        WHERE id = OLD.id;
      END IF;
      
      return new;
end;
$$ language plpgsql security definer;
create trigger on_public_user_created
  after INSERT OR UPDATE OR DELETE on public.users
  for each row execute procedure public.handle_new_profile();
