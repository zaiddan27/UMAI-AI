# Database Schema Documentation

This document describes the database structure used in Supabase (PostgreSQL).

## 🗄️ Tables

### 1. `public.profiles`
Stores user identity and farm information. Syncs with the local SQLite `users` table.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, FK -> `auth.users` | Links to Supabase Auth User ID |
| `full_name` | `text` | | Farmer's display name |
| `farm_name` | `text` | | Name of the farm |
| `region` | `text` | | Geographical region (for future weather/prices) |
| `created_at` | `timestamptz` | Default: `now()` | Record creation time |
| `updated_at` | `timestamptz` | Default: `now()` | Record last update time |

### 2. `public.scans`
Stores history of disease detection scans. Syncs with the local SQLite `scans` table.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, Default: `gen_random_uuid()` | Unique Scan ID |
| `user_id` | `uuid` | FK -> `profiles.id` | Owner of the scan |
| `crop_type` | `text` | Not Null | E.g., 'Corn', 'Rice', 'Banana' |
| `disease_detected`| `text` | | Name of detected disease (or null) |
| `confidence` | `float` | | AI Confidence score (0.0 - 1.0) |
| `image_url` | `text` | | Path to image in Storage Bucket |
| `created_at` | `timestamptz` | Default: `now()` | When the scan happened |

---

## 🔒 Security (Row Level Security)

**RLS is ENABLED** on all tables. This ensures data isolation between users.

### Policies

**`profiles` Table**
- **SELECT**: Public (Everyone can view basic profiles - customizable).
- **INSERT**: Authenticated users can create their own profile (`auth.uid() = id`).
- **UPDATE**: Users can update ONLY their own profile.

**`scans` Table**
- **SELECT**: Users can only view their own scans.
- **INSERT**: Users can only insert scans where they are the owner.

---

## 📦 Storage Buckets

### `scan_images`
- **Public Access**: Enabled (Images can be viewed via URL).
- **Upload Access**: Only authenticated users can upload files.
- **Usage**: Stores the photos taken by the camera during the scan process.
