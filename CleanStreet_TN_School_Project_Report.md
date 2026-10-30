# PROJECT REPORT & PRESENTATION GUIDE
## CleanStreet TN (க்ளீன்ஸ்ட்ரீட் தமிழ்நாடு)
**“Cleaner Streets, Healthier Communities, Greener Tamil Nadu”**

---

### Student & Project Details
* **Student Name:** Pavan
* **Grade / Class:** Class 8 (Middle School)
* **Subject:** Computer Science / Environmental Science / Social Innovation Project
* **Project Type:** Web Application for Civic Cleanliness & Municipal Grievance Routing
* **Live GitHub Repository:** [https://github.com/pavithra464/CleanStreetTN](https://github.com/pavithra464/CleanStreetTN)
* **Technologies Used:** React, TypeScript, Vite, Tailwind CSS, Leaflet GIS Maps, Local/Cloud Database

---

## 1. Executive Summary (Project Overview)
**CleanStreet TN** is an independent, bilingual (English and தமிழ்) web platform designed to solve open garbage dumping, raise civic awareness, and bridge the gap between citizens and municipal authorities in Tamil Nadu.

In many neighborhoods, residents see overflowing trash bins or open waste dumps, but they either:
1. Do not know which government agency or ward officer to contact.
2. Find existing municipal portals too confusing or hard to access.
3. Lack awareness about waste segregation and community clean-up initiatives.

CleanStreet TN provides a simple 3-step solution:
1. **Report:** Residents take a photo, pin the location on a map, and submit the complaint.
2. **Track:** The system generates a unique reference code (`CSTN-YYYY-XXXXX`) to monitor progress.
3. **Route:** The system instantly connects the complaint with verified government helplines like the **Greater Chennai Corporation 1913 Helpline**, the **Namma Chennai App**, and the **Tamil Nadu CM Helpline 1100**.

---

## 2. Problem Statement & Motivation
* **The Problem:** According to municipal reports, thousands of tons of municipal solid waste are generated every day in Tamil Nadu. Unattended waste creates health hazards (mosquito breeding, dengue, water contamination) and blocks stormwater drains during the monsoon.
* **The Gap:** Ordinary citizens, especially elders and students, want clean surroundings but often don't know the official ward contact or helpline number for their specific area.
* **Our Inspiration:** As an 8th-grade student, I wanted to build something that uses modern technology (maps, clean UI, mobile-friendly design) to turn everyday citizens into active guardians of their streets.

---

## 3. Core Functionalities of the Website

### A. Citizen Waste Reporting (With Photo Proof & GPS)
* **What it does:** Citizens can submit reports about open garbage dumps, overflowing dustbins, uncollected commercial waste, plastic litter, or hazardous construction debris.
* **Photo Compression:** To ensure fast loading and save bandwidth, submitted photos are compressed automatically on the user's phone or laptop before uploading (<5MB).
* **Location Pinning:** Users can click **"Use My Location"** with GPS permission or manually drag a marker on an interactive Tamil Nadu map to pinpoint the exact street corner.

### B. Unique Tracking System
* Every report automatically receives a formatted tracking number (e.g., `CSTN-2026-00042`).
* Anyone can visit the **"Track Report"** page, type in their reference ID, and see the real-time status:
  * `Submitted` ➔ `Under Review` ➔ `Forwarded to Local Body` ➔ `In Progress` ➔ `Resolved`.

### C. Smart Municipal Routing Engine (Grievance Bridge)
* This is the heart of CleanStreet TN. CleanStreet TN is an independent civic portal, so it directly links the user's report with verified government authorities:
  * **Greater Chennai Corporation (GCC):** 1913 Helpline, Namma Chennai Mobile App, and GCC Complaint Portal.
  * **All Tamil Nadu Municipalities:** CM Helpline (1100), District Collectorates across 38 districts.
  * **National Level:** Swachhata App (Ministry of Housing and Urban Affairs).
* Users can store their official government docket number alongside their CleanStreet TN ticket to verify closure.

### D. Interactive GIS Cleanliness Map
* A live map powered by Leaflet and OpenStreetMap showing cleanliness hotspots across Tamil Nadu.
* Color-coded pins indicate problem severity (Red = Urgent / Open Dump, Orange = Overflowing Bin, Green = Cleaned / Resolved).
* Filters allow teachers and users to view reports by District, Problem Category, or Status.

### E. Fully Bilingual Interface (English & தமிழ்)
* Recognizing that Tamil Nadu has millions of Tamil-speaking residents and students, the entire website includes a 1-click language switch between English and தமிழ் (க்ளீன்ஸ்ட்ரீட் தமிழ்நாடு).
* All district names, problem types, and buttons change seamlessly.

### F. Educational Hub & Waste Segregation Quiz
* Dedicated student learning center with 8 environmental lessons:
  * Wet vs. Dry vs. Sanitary Waste Segregation.
  * Plastic ban awareness (Single-use plastics).
  * Composting at home and school.
  * Monsoon disease prevention.
* Includes an **Interactive Quiz** where school students can test their recycling knowledge and receive instant scorecards!

### G. School & Community Eco-Club Campaigns
* Allows student eco-clubs, school teams, and resident associations (RWAs) to organize weekend street clean-up drives, tree-planting events, and plastic-free rallies.
* Users can propose a new campaign and find volunteer events nearby.

### H. Admin Moderation & Verification Dashboard
* A secure dashboard for teachers, volunteer moderators, or municipal coordinators to inspect incoming complaints, verify before-and-after photo evidence, and mark issues as resolved.

---

## 4. How the Technology Works (In Simple Terms)

| Component | Technology | What it does in our project |
| :--- | :--- | :--- |
| **Frontend UI** | React 18 & TypeScript | Creates interactive, fast-loading web pages without reloading. |
| **Styling** | Tailwind CSS | Modern, responsive design that works on smartphones, tablets, and smartboards. |
| **Maps** | Leaflet & OpenStreetMap | Free, open-source satellite and street mapping for Tamil Nadu. |
| **Analytics Charts**| Recharts | Generates live pie charts and bar graphs of garbage issues by district and category. |
| **Data Storage** | Supabase & Local Database | Stores reports, photos, and campaigns securely with built-in backup fallback. |
| **Hosting** | Vercel & GitHub | Continuous deployment ensuring 99.9% uptime with public internet access. |

---

## 5. Important Civic Notice & Privacy Safeguards
1. **Independent Civic Tool:** The website clearly displays a prominent disclaimer on every page stating it is an independent community initiative and not an emergency service.
2. **Student Privacy:** Personal contact details (phone numbers and emails) are strictly kept private and never published publicly on the map.
3. **Verified Sources:** All emergency numbers (1913, 1100, 100, 101) are linked only to official Tamil Nadu government portals.

---

## 6. 5-Minute Presentation Script for Faculty / Teachers

> **Tips for Pavan:** Stand straight, smile, speak clearly, and use the live website or project slides while speaking.

### Step 1: Introduction (30 seconds)
> *"Respected teachers and faculty members, good morning. My name is Pavan, studying in 8th grade. Today, I am proud to present my computer science and environmental innovation project: **CleanStreet TN** — with the motto: 'Cleaner Streets, Healthier Communities, Greener Tamil Nadu'."*

### Step 2: The Problem (1 minute)
> *"Every day when we walk to school or go to the market, we see overflowing garbage bins, plastic bags on roadsides, and unattended open dumps. While everyone complains about the dirt, very few people know whom to contact or how to get it cleaned.
> In Tamil Nadu, our government has excellent helplines like Greater Chennai Corporation 1913 and CM Helpline 1100, but people find them hard to find or track. I wanted to build a technology platform that makes reporting garbage as simple as sending a text message."*

### Step 3: Demonstrating the Website (2 minutes)
> *"Let me show you how CleanStreet TN works in 3 easy steps:
> 1. **First, Reporting:** A resident clicks 'Report Issue', attaches a picture of the trash, picks their district (like Chennai, Coimbatore, or Madurai), and drops a pin on the map. The app compresses the photo automatically so it works even on 2G/3G mobile data.
> 2. **Second, Tracking:** As soon as they hit submit, the website gives them a unique tracking ID, like `CSTN-2026-00042`. Anyone can track the status anytime.
> 3. **Third, Official Routing:** The system tells the user exactly which helpline to call, gives one-click buttons to the GCC 1913 helpline or Namma Chennai App, and allows them to link their official government docket number."*

### Step 4: Special Features for Schools (1 minute)
> *"Beyond reporting, CleanStreet TN is built for education:
> * It is **fully bilingual in English and Tamil**, so anyone in our state can use it comfortably.
> * It has a **Learn & Quiz Section** where students learn proper 3-way waste segregation (biodegradable, recyclable, and hazardous).
> * It includes a **Campaigns Page** where school eco-clubs can register weekend clean-up drives."*

### Step 5: Conclusion & Future Scope (30 seconds)
> *"CleanStreet TN shows that 8th-grade students can use modern web technologies like React, Leaflet maps, and open data to make a real difference in society. In the future, I plan to add AI-based automatic garbage classification from photos.
> Thank you, teachers! I am happy to answer any questions."*

---

## 7. Frequently Asked Questions (Viva / Faculty Q&A)

#### Q1: "Is this website an official government website?"
**Answer:** *"No, Ma'am/Sir. CleanStreet TN is an independent civic portal created to help citizens. It acts as an easy-to-use bridge that routes citizens to official government portals like GCC 1913, the Namma Chennai App, and the TN 1100 helpline."*

#### Q2: "What happens if someone submits a fake complaint or improper photo?"
**Answer:** *"We have built an Admin Moderation Page (`/admin`). Every report goes through review before being marked as verified, and only verified reports appear on the public map. Administrators can reject or remove false reports."*

#### Q3: "How does the map work without paying for Google Maps?"
**Answer:** *"We used **Leaflet** and **OpenStreetMap**, which are open-source, free, and community-driven mapping tools. This ensures our project costs zero rupees in map API charges and can scale freely for any school or neighborhood."*

#### Q4: "How does this help non-English speakers?"
**Answer:** *"There is a language toggle in the top navbar. Clicking 'தமிழ்' instantly switches the whole site into Tamil, including category names like 'திறந்தவெளி குப்பைக் குவியல்' (Open Dump) and district names across all 38 districts of Tamil Nadu."*

#### Q5: "What did you learn while building this project?"
**Answer:** *"I learned how real web applications are constructed using React components, how GPS coordinates work with GIS maps, how to compress image files inside the browser to save data, and most importantly, how computer science can solve everyday environmental problems in our community."*
