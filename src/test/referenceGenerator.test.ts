import { describe, it, expect } from 'vitest';
import { generateReferenceCode } from '../services/reportService';
import { Report } from '../types/report';

describe('CleanStreet TN Reference Code Generator', () => {
  it('generates a valid formatted reference CSTN-YYYY-XXXXXX', () => {
    const currentYear = new Date().getFullYear();
    const existing: Report[] = [];
    const code = generateReferenceCode(existing);

    expect(code).toMatch(new RegExp(`^CSTN-${currentYear}-\\d{6}$`));
    expect(code).toBe(`CSTN-${currentYear}-000101`);
  });

  it('increments sequentially beyond existing highest code', () => {
    const currentYear = new Date().getFullYear();
    const existing: any[] = [
      { reference_code: `CSTN-${currentYear}-000105` },
      { reference_code: `CSTN-${currentYear}-000120` }
    ];

    const nextCode = generateReferenceCode(existing);
    expect(nextCode).toBe(`CSTN-${currentYear}-000121`);
  });
});
