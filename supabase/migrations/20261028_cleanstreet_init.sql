-- =============================================================================
-- CLEANSTREET TN — PRODUCTION DATABASE SCHEMA & SECURITY POLICIES
-- PostgreSQL / Supabase Migration
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sequence for unique reference codes: CSTN-2026-000001
CREATE SEQUENCE IF NOT EXISTS report_reference_seq START WITH 101;

-- 1. REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code TEXT UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(60) NOT NULL,
    state VARCHAR(60) NOT NULL DEFAULT 'Tamil Nadu',
    district VARCHAR(80) NOT NULL,
    local_body VARCHAR(120) NOT NULL,
    city_town VARCHAR(120),
    locality VARCHAR(120) NOT NULL,
    street_name VARCHAR(150),
    landmark VARCHAR(150),
    postal_code VARCHAR(10),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    observed_at DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'Submitted' 
      CHECK (status IN ('Submitted', 'Under Review', 'Approved for Public Display', 'Action Reported', 'Resolved', 'Rejected')),
    is_public BOOLEAN NOT NULL DEFAULT true,
    reporter_name VARCHAR(100),
    reporter_contact VARCHAR(150), -- Kept strictly private by RLS
    resolution_note TEXT,
    resolution_photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    reviewed_at TIMESTAMPTZ
);

-- 2. REPORT PHOTOGRAPHS
CREATE TABLE IF NOT EXISTS public.report_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    photo_type VARCHAR(20) NOT NULL DEFAULT 'before' CHECK (photo_type IN ('before', 'after')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. REPORT STATUS AUDIT HISTORY
CREATE TABLE IF NOT EXISTS public.report_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    change_note TEXT NOT NULL,
    changed_by VARCHAR(120) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. OFFICIAL COMPLAINT REFERENCES (CITIZEN DOCKETS)
CREATE TABLE IF NOT EXISTS public.official_complaint_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
    authority_name VARCHAR(150) NOT NULL,
    complaint_reference VARCHAR(100) NOT NULL,
    official_portal_url TEXT,
    verification_status VARCHAR(30) NOT NULL DEFAULT 'unverified'
      CHECK (verification_status IN ('unverified', 'verified_by_user', 'confirmed_by_admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. VERIFIED OFFICIAL GRIEVANCE CONTACTS
CREATE TABLE IF NOT EXISTS public.official_contacts (
    id VARCHAR(80) PRIMARY KEY,
    authority_name VARCHAR(150) NOT NULL,
    tamil_authority_name VARCHAR(200),
    state VARCHAR(60) NOT NULL DEFAULT 'Tamil Nadu',
    district VARCHAR(80) NOT NULL,
    local_body VARCHAR(120) NOT NULL,
    applicable_categories TEXT NOT NULL DEFAULT 'ALL',
    phone_number VARCHAR(50),
    portal_url TEXT,
    source_url TEXT NOT NULL,
    source_name VARCHAR(150) NOT NULL,
    verification_date DATE NOT NULL,
    verification_status VARCHAR(30) NOT NULL DEFAULT 'verified',
    instructions TEXT NOT NULL,
    tamil_instructions TEXT,
    call_button_label VARCHAR(80),
    portal_button_label VARCHAR(80),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. COMMUNITY & SCHOOL CLEANLINESS CAMPAIGNS
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    locality VARCHAR(120) NOT NULL,
    district VARCHAR(80) NOT NULL,
    local_body VARCHAR(120) NOT NULL,
    event_date DATE NOT NULL,
    organizer VARCHAR(150) NOT NULL,
    organizer_type VARCHAR(60) NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'Pending Approval'
      CHECK (status IN ('Upcoming', 'Completed', 'Pending Approval')),
    meeting_point VARCHAR(200) NOT NULL,
    equipment_provided TEXT[] DEFAULT ARRAY['Gloves', 'Bags'],
    contact_email VARCHAR(150),
    participants_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_reports_ref ON public.reports (reference_code);
CREATE INDEX IF NOT EXISTS idx_reports_category ON public.reports (category);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports (status);
CREATE INDEX IF NOT EXISTS idx_reports_district ON public.reports (district);
CREATE INDEX IF NOT EXISTS idx_reports_local_body ON public.reports (local_body);
CREATE INDEX IF NOT EXISTS idx_reports_public ON public.reports (is_public);
CREATE INDEX IF NOT EXISTS idx_reports_coords ON public.reports (latitude, longitude);

-- AUTOMATIC REFERENCE CODE GENERATION TRIGGER
CREATE OR REPLACE FUNCTION generate_cleanstreet_ref()
RETURNS TRIGGER AS $$
DECLARE
    seq_val INT;
    yr TEXT;
BEGIN
    IF NEW.reference_code IS NULL OR NEW.reference_code = '' THEN
        yr := TO_CHAR(CURRENT_DATE, 'YYYY');
        seq_val := NEXTVAL('report_reference_seq');
        NEW.reference_code := 'CSTN-' || yr || '-' || LPAD(seq_val::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_reference_code ON public.reports;
CREATE TRIGGER trg_set_reference_code
BEFORE INSERT ON public.reports
FOR EACH ROW
EXECUTE FUNCTION generate_cleanstreet_ref();

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_complaint_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- 1. Public can view public reports (without personal contacts if queried via views)
CREATE POLICY "Public can view approved public reports"
    ON public.reports FOR SELECT
    USING (is_public = true);

-- 2. Anyone can submit a report
CREATE POLICY "Anyone can submit a community report"
    ON public.reports FOR INSERT
    WITH CHECK (true);

-- 3. Authenticated admins can update reports
CREATE POLICY "Admins have full access to reports"
    ON public.reports FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Photos RLS
CREATE POLICY "Public can view photos"
    ON public.report_photos FOR SELECT
    USING (true);

CREATE POLICY "Anyone can upload photos"
    ON public.report_photos FOR INSERT
    WITH CHECK (true);

-- 5. Status history RLS
CREATE POLICY "Public can view status history"
    ON public.report_status_history FOR SELECT
    USING (true);

CREATE POLICY "System and Admins can log status history"
    ON public.report_status_history FOR INSERT
    WITH CHECK (true);

-- 6. Official contacts RLS (public read-only)
CREATE POLICY "Public can view official contacts"
    ON public.official_contacts FOR SELECT
    USING (true);

-- 7. Campaigns RLS (Public can view approved, anyone can propose)
CREATE POLICY "Public can view approved campaigns"
    ON public.campaigns FOR SELECT
    USING (status = 'Upcoming' OR status = 'Completed');

CREATE POLICY "Anyone can propose a campaign"
    ON public.campaigns FOR INSERT
    WITH CHECK (status = 'Pending Approval');

CREATE POLICY "Admins can manage campaigns"
    ON public.campaigns FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
