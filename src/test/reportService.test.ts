import { describe, it, expect } from 'vitest';
import {
  createReport,
  fetchReports,
  fetchReportByReference,
  updateReportStatus,
  addOfficialComplaintReference,
  getDashboardStatistics
} from '../services/reportService';

describe('Report Service End-to-End Workflow', () => {
  it('creates, retrieves, tracks, updates, and links government docket', async () => {
    // 1. Create a new report
    const newReport = await createReport(
      {
        title: 'Garbage accumulation on 2nd Avenue',
        description: 'Large waste heap piling up behind residential apartment boundary wall.',
        category: 'garbage_dumped_street',
        state: 'Tamil Nadu',
        district: 'Chennai',
        local_body: 'Greater Chennai Corporation',
        city_town: 'Chennai',
        locality: 'Anna Nagar',
        street_name: '2nd Avenue',
        landmark: 'Near Roundtana',
        postal_code: '600040',
        latitude: 13.085,
        longitude: 80.21,
        observed_at: '2026-01-28',
        reporter_name: 'Student Volunteer',
        privacy_consent: true
      },
      []
    );

    expect(newReport.id).toBeDefined();
    expect(newReport.reference_code).toMatch(/^CSTN-\d{4}-\d{6}$/);
    expect(newReport.status).toBe('Submitted');

    // 2. Retrieve by reference code
    const fetched = await fetchReportByReference(newReport.reference_code);
    expect(fetched).not.toBeNull();
    expect(fetched?.title).toBe('Garbage accumulation on 2nd Avenue');

    // 3. Link an official government complaint docket (Workflow B)
    const withOfficialDocket = await addOfficialComplaintReference(
      newReport.id,
      'Greater Chennai Corporation',
      'GCC-PGR-2026-99214'
    );
    expect(withOfficialDocket.official_complaints).toHaveLength(1);
    expect(withOfficialDocket.official_complaints?.[0].complaint_reference).toBe('GCC-PGR-2026-99214');

    // 4. Update status by moderator
    const updated = await updateReportStatus(
      newReport.id,
      'Resolved',
      'Waste cleared by GCC Bobcat compactor',
      'Moderator Team',
      'Site cleared and sanitized with bleaching powder.'
    );

    expect(updated.status).toBe('Resolved');
    expect(updated.resolution_note).toContain('bleaching powder');
    expect(updated.status_history?.length).toBeGreaterThanOrEqual(2);

    // 5. Dashboard statistics reflect the changes
    const stats = await getDashboardStatistics();
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.resolved).toBeGreaterThanOrEqual(1);
  });
});
