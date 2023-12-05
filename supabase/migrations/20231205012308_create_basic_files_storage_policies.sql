create policy "Files are publicly accessible." on storage.objects
  for select using (bucket_id = 'files');

create policy "Anyone can upload a file." on storage.objects
  for insert with check (bucket_id = 'files');

create policy "Anyone can update their own file." on storage.objects
  for update using (auth.uid() = owner) with check (bucket_id = 'files');
