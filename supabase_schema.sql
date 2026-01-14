-- Enable Row Level Security
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- 1. PROFILES Table (Syncs with Local User)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  farm_name text,
  region text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 2. SCANS Table (Syncs with Local Scans)
create table public.scans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  crop_type text not null,
  disease_detected text,
  confidence float,
  image_url text, -- Storage path
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Scans
alter table public.scans enable row level security;
create policy "Users can view own scans." on public.scans for select using (auth.uid() = user_id);
create policy "Users can insert own scans." on public.scans for insert with check (auth.uid() = user_id);

-- 3. STORAGE BUCKET (for Scan Images)
insert into storage.buckets (id, name) values ('scan_images', 'scan_images');
create policy "Scan images are publicly accessible." on storage.objects for select using ( bucket_id = 'scan_images' );
create policy "Users can upload scan images." on storage.objects for insert with check ( bucket_id = 'scan_images' and auth.uid() = owner );
