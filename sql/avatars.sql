insert into storage.buckets (id, name, pubic)
  values ('avatars', 'avatars',true);

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

  create policy object_select_policy on storage.objects for select using (auth.role()='authenticated');


create policy object_insert_policy on storage.objects for insert with check (auth.role()='authenticated');


create policy object_update_policy on storage.objects for update using (auth.role()='authenticated');


create policy object_delete_policy on storage.objects for delete using (auth.role()='authenticated');
