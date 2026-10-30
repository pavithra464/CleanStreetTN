import { describe, it, expect } from 'vitest';
import { routeOfficialComplaint } from '../data/officialContacts';

describe('Official Complaint Routing Engine', () => {
  it('TEST 1: correctly routes Chennai Greater Chennai Corporation reports to GCC 1913', () => {
    const result = routeOfficialComplaint({
      state: 'Tamil Nadu',
      district: 'Chennai',
      localBody: 'Greater Chennai Corporation',
      category: 'garbage_dumped_street'
    });

    expect(result.isLocalBodyVerified).toBe(true);
    expect(result.matchedContact).toBeDefined();
    expect(result.matchedContact?.phone_number).toBe('1913');
    expect(result.matchedContact?.portal_url).toContain('chennaicorporation.gov.in');
    expect(result.matchedContact?.source_url).toContain('chennaicorporation.gov.in');
    expect(result.stateGrievanceContact.phone_number).toBe('1100');
  });

  it('TEST 2: routes Tambaram Municipal Corporation to verified Tambaram contacts without defaulting to GCC', () => {
    const result = routeOfficialComplaint({
      state: 'Tamil Nadu',
      district: 'Chengalpattu',
      localBody: 'Tambaram City Municipal Corporation',
      category: 'overflowing_bin'
    });

    expect(result.isLocalBodyVerified).toBe(true);
    expect(result.matchedContact).toBeDefined();
    expect(result.matchedContact?.authority_name).toContain('Tambaram');
    expect(result.matchedContact?.phone_number).not.toBe('1913');
  });

  it('TEST 3: handles unverified local bodies outside GCC gracefully with State CM Helpline 1100', () => {
    const result = routeOfficialComplaint({
      state: 'Tamil Nadu',
      district: 'Cuddalore',
      localBody: 'Panruti Municipality',
      category: 'plastic_accumulation'
    });

    // Panruti is not in the verified local bodies list
    expect(result.isLocalBodyVerified).toBe(false);
    expect(result.matchedContact).toBeUndefined();
    // Must provide TN CM Helpline 1100
    expect(result.stateGrievanceContact).toBeDefined();
    expect(result.stateGrievanceContact.phone_number).toBe('1100');
    expect(result.notes).toContain('Panruti Municipality');
    expect(result.notes).toContain('Chief Minister');
  });
});
