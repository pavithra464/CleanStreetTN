# CleanStreet TN (க்ளீன்ஸ்ட்ரீட் தமிழ்நாடு)

**“Cleaner Streets, Healthier Communities, Greener Tamil Nadu.”**

An independent, community-driven garbage reporting, cleanliness mapping, and verified municipal complaint routing platform for Chennai and Tamil Nadu.

> **Important Notice:** CleanStreet TN is an independent civic engagement initiative and is **not an official government website**. It serves to empower residents and students with awareness, local problem mapping, and direct routing to verified government grievance portals (such as Greater Chennai Corporation 1913 and Tamil Nadu Chief Minister’s Helpline 1100). CleanStreet TN is not an emergency service.

---

## 1. Project Directory Structure

```
Pavan_project/
├── index.html                    # Root HTML template with Tamil/Inter typography & Leaflet
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite & Vitest configuration
├── tailwind.config.js            # Design system tokens (Forest & Leaf green palette)
├── postcss.config.js             # PostCSS plugins
├── tsconfig.json                 # TypeScript compiler configuration
├── .env.example                  # Environment variable configuration example
├── supabase/
│   └── migrations/
│       └── 20261028_cleanstreet_init.sql # PostgreSQL schema, RLS policies, sequences, triggers
├── src/
│   ├── main.tsx                  # React entry point with providers
│   ├── App.tsx                   # Routes and application layout wrappers
│   ├── index.css                 # Base Tailwind CSS, Leaflet overrides, print styling
│   ├── types/
│   │   ├── report.ts             # Report, ReportPhoto, StatusHistory, Category types
│   │   ├── contact.ts            # OfficialContact, RoutingMatch types
│   │   └── campaign.ts           # Campaign & proposal types
│   ├── data/
│   │   ├── officialContacts.ts   # Centralized verified complaint directory & routing engine
│   │   ├── tamilNaduDistricts.ts # 38 TN districts, local bodies, categories, Tamil translations
│   │   ├── educationalContent.ts # 8 waste topics, interactive quiz, cleanliness drive blueprint
│   │   ├── initialReports.ts     # Realistic starter Chennai/TN demonstration data
│   │   └── initialCampaigns.ts   # Community & school eco-club campaigns
│   ├── services/
│   │   ├── supabase.ts           # Supabase client with fallback detection
│   │   ├── reportService.ts      # Report CRUD, unique CSTN reference generator, live analytics
│   │   ├── campaignService.ts    # Campaign proposal and moderation services
│   │   └── imageCompression.ts   # Safe client-side image validation & compression (<5MB)
│   ├── context/
│   │   ├── LanguageContext.tsx   # English <-> தமிழ் localization provider
│   │   └── AuthContext.tsx       # Admin authentication (Supabase Auth / Demo evaluator session)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Responsive navbar with Tamil/EN toggle & mobile drawer
│   │   │   ├── Footer.tsx        # Mission statement, helpline directory, privacy trigger
│   │   │   └── DisclaimerBanner.tsx # Prominent independent initiative & emergency banner
│   │   ├── common/
│   │   │   ├── Logo.tsx          # Original Leaf-and-Street SVG logo
│   │   │   ├── StatusBadge.tsx   # Status indicator badges with accessible contrast
│   │   │   ├── DemoDataBanner.tsx # Clear demo data indicator when Supabase not connected
│   │   │   └── PrivacyNoticeModal.tsx # Student & resident privacy policy modal
│   │   ├── routing/
│   │   │   └── OfficialRoutingCard.tsx # Official complaint routing engine with verified links
│   │   ├── map/
│   │   │   ├── CleanlinessMap.tsx # Interactive Leaflet map with filters and list switcher
│   │   │   └── LocationPickerMap.tsx # Location picker map with explicit GPS consent
│   │   └── dashboard/
│   │       ├── StatsOverview.tsx # Real counts from stored reports
│   │       ├── CategoryChart.tsx # Recharts problem category distribution
│   │       ├── StatusChart.tsx   # Recharts community status lifecycle
│   │       └── DistrictChart.tsx # Recharts geographic distribution
│   ├── pages/
│   │   ├── HomePage.tsx          # Hero, 5-step workflow, real stats, recent reports
│   │   ├── ReportPage.tsx        # Zod validated submission form with photo & reference generation
│   │   ├── ReportDetailsPage.tsx # Report tracking, photo proof, status history, official docket linking
│   │   ├── MapPage.tsx           # Full-screen GIS cleanliness map
│   │   ├── DashboardPage.tsx     # Live analytics & CSV export
│   │   ├── LearnPage.tsx         # 8 environmental topics, waste quiz, downloadable blueprint
│   │   ├── CampaignsPage.tsx     # School & community drives, proposal form
│   │   ├── TrackPage.tsx         # Quick CSTN reference code search
│   │   └── AdminPage.tsx         # Protected moderation dashboard & audit history
│   └── test/
│       ├── setup.ts              # Vitest test setup with localStorage mock
│       ├── routing.test.ts       # Complaint routing tests (GCC vs other municipalities)
│       ├── referenceGenerator.test.ts # Sequential CSTN code format tests
│       └── reportService.test.ts # End-to-end report lifecycle & docket linking tests
```

---

## 2. Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Lucide React icons
- **Form Handling:** React Hook Form + Zod schema validation
- **Maps:** Leaflet & React-Leaflet with OpenStreetMap tiles
- **Charts & Visualizations:** Recharts
- **Database & Backend:** Supabase (PostgreSQL, Row Level Security, Supabase Storage) with resilient local storage fallback for demonstration
- **Testing:** Vitest, React Testing Library, JSDOM

---

## 3. Official Complaint Routing Directory & Sources

All telephone numbers and portal links in the routing engine are stored in a centralized, data-driven directory (`src/data/officialContacts.ts`) and verified against official sources:

| Urban Local Body / Authority | Jurisdiction | Helpline / Call Link | Official Complaint Portal | Official Source URL | Verification Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Greater Chennai Corporation (GCC)** | Chennai Corporation (Zones 1–15) | `1913` (tel:1913) | [GCC PGR Portal](https://erp.chennaicorporation.gov.in/pgr/) | [GCC Complaints Info](https://chennaicorporation.gov.in/gcc/complaints/) | 2026-01-15 (Verified) |
| **TN Chief Minister's Helpline / Mudhalvarin Mugavari** | All 38 Districts in Tamil Nadu | `1100` (tel:1100) | [CM Helpline Portal](https://cmhelpline.tnega.org/portal/en/home) | [TNeGA CM Helpline FAQs](https://cmhelpline.tnega.org/portal/en/kb/articles/tamil-nadu-cm-helpline-faqs) | 2026-01-15 (Verified) |
| **Tambaram City Municipal Corporation** | Tambaram, Chromepet, Pallavaram | `1800 425 1600` | [TN Urban E-Pay Portal](https://tnurbanepay.tn.gov.in/) | [TN CMA Portal](https://cma.tn.gov.in/) | 2026-01-15 (Verified) |
| **Coimbatore City Municipal Corp (CCMC)** | Coimbatore Corporation | `8190000200` | [CCMC Grievance Portal](https://www.ccmc.gov.in/) | [CCMC Contact](https://www.ccmc.gov.in/ccmc/index.php/contact-us) | 2026-01-15 (Verified) |
| **Madurai City Municipal Corporation** | Madurai Corporation | `8428424242` | [Madurai Grievance Portal](https://maduraicorporation.co.in/) | [Madurai Corp](https://maduraicorporation.co.in/grievance/) | 2026-01-15 (Verified) |
| **Other Municipalities (Unverified)** | Other ULBs across TN | Alternative: 1100 | [Directorate of Municipal Admin](https://tnurbanepay.tn.gov.in/) | [TN CMA](https://cma.tn.gov.in/) | Displays: *"Local complaint contact not yet verified"* |

### Routing Decision Engine Rules:
1. Reads selected State, District, Local Body, and Problem Category.
2. If the user selects Greater Chennai Corporation, offers GCC 1913 and GCC ERP Portal as Primary actions.
3. If the user selects another verified municipality (e.g. Tambaram or Coimbatore), displays that municipality's verified contact.
4. If a municipality's direct helpline has not yet been confirmed via official gazette, explicitly displays: *"Local complaint contact not yet verified"* and provides the Tamil Nadu Chief Minister's Helpline (1100) as a statewide alternative. **Does not route non-Chennai complaints to GCC!**
5. Separates **Workflow A** (CleanStreet TN community report) from **Workflow B** (Official government complaint submission). Provides an optional field for users to record their official docket number.

---

## 4. Local Development Instructions

### Prerequisites
- Node.js v18+ (tested on Node v25.7)
- npm v9+

### Steps
1. Clone or open the project folder:
   ```bash
   cd Pavan_project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure environment variables:
   Copy `.env.example` to `.env` if connecting to a live Supabase backend. If omitted, the application runs in local Demonstration Mode with zero setup.
4. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.
5. Run automated tests:
   ```bash
   npm test
   ```
6. Build for production:
   ```bash
   npm run build
   ```

---

## 5. Supabase Database & Storage Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20261028_cleanstreet_init.sql` and run the entire query. This creates:
   - `reports` table with automated `CSTN-YYYY-XXXXXX` sequence trigger
   - `report_photos` table
   - `report_status_history` audit table
   - `official_complaint_references` table
   - `official_contacts` table
   - `campaigns` table
   - Row Level Security (RLS) policies
4. In the Supabase Dashboard, go to **Storage** and create a new public bucket named `report-photos`.
5. In **Authentication > Users**, create your initial administrator account.
6. Add your Supabase credentials to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 6. Demonstration & Evaluation Mode

When running without live Supabase credentials:
- The app automatically runs in **Demonstration Mode**.
- Seed reports covering Chennai (T. Nagar, Mylapore, Anna Nagar, Velachery, Besant Nagar, Royapettah) and Tambaram are preloaded.
- A clearly labelled **"Demo Mode"** badge is displayed.
- Submitting a report, updating a status, or recording an official reference saves persistently to the browser's storage and immediately recalculates live charts.
- **Admin Evaluation Login:**
  - Email: `admin@cleanstreet-tn.org`
  - Password: `CleanStreetAdmin2026!`

---

## 7. Vercel Deployment Instructions

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and select your repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Click **Deploy**.

---

## 8. Summary of Completed Workflows & Tests

- **TEST 1: GCC Garbage Report** — Correctly routes to GCC 1913, opens official GCC ERP portal.
- **TEST 2: Complaint Outside GCC** — Shows municipality channel only if verified, otherwise warns contact unverified and provides TN CM Helpline 1100. Never routes to GCC.
- **TEST 3: Photograph Upload** — Supports JPG, PNG, WebP up to 5 MB with client-side compression and validation. Rejects invalid files.
- **TEST 4: Report Tracking** — CSTN reference search retrieves status and timeline.
- **TEST 5: Admin Moderation** — Protected admin interface allows reviewing reports, approving/rejecting, adding resolution notes and after-photos.
- **TEST 6: Community Dashboard** — Recharts category, status, and district graphs calculate real counts from stored reports.
- **TEST 7: Localization** — Toggle between English and Tamil (தமிழ்) with instant translation of nav, buttons, forms, and guidance.
- **TEST 8: Privacy** — Reporter phone and email are never shown publicly; anonymous reporting is supported.
