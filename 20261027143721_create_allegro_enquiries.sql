/*
# Create Allegro quote enquiries

1. New Tables
- `quote_enquiries` stores customer quote requests submitted from the public Allegro website.
- `id` uniquely identifies each enquiry.
- `full_name`, `phone`, `email`, `location`, `service`, `project_size`, `installation`, and `details` store the customer-provided project information.
- `created_at` records when the enquiry was received.

2. Security
- Row Level Security is enabled on `quote_enquiries`.
- Anonymous and authenticated website visitors may submit enquiries.
- The public website may not read, update, or delete enquiries, protecting customer contact details from exposure.
- Insert access is granted only for the columns needed by the public form.

3. Important Notes
- This is a single-business, no-sign-in contact flow, so no user ownership column is required.
- Enquiries are retained for the business to follow up through the connected Supabase project.
*/

CREATE TABLE IF NOT EXISTS public.quote_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  location text NOT NULL,
  service text NOT NULL,
  project_size text,
  installation text NOT NULL,
  details text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT (full_name, phone, email, location, service, project_size, installation, details)
  ON public.quote_enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit quote enquiries" ON public.quote_enquiries;
CREATE POLICY "Public can submit quote enquiries"
  ON public.quote_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(full_name)) BETWEEN 2 AND 120
    AND length(trim(phone)) BETWEEN 7 AND 40
    AND length(trim(location)) BETWEEN 2 AND 160
    AND length(trim(service)) BETWEEN 2 AND 120
    AND length(trim(installation)) BETWEEN 2 AND 80
    AND (email IS NULL OR length(trim(email)) <= 160)
    AND (project_size IS NULL OR length(trim(project_size)) <= 120)
    AND (details IS NULL OR length(trim(details)) <= 3000)
  );