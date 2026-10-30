import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { TAMIL_NADU_DISTRICTS, CATEGORY_DETAILS } from '../data/tamilNaduDistricts';
import { ProblemCategory, Report } from '../types/report';
import { createReport } from '../services/reportService';
import { validateAndCompressImage } from '../services/imageCompression';
import { LocationPickerMap } from '../components/map/LocationPickerMap';
import { OfficialRoutingCard } from '../components/routing/OfficialRoutingCard';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  FileText,
  MapPin,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';

const reportSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(120, { message: 'Title cannot exceed 120 characters' }),
  description: z
    .string()
    .min(15, { message: 'Please provide a descriptive explanation (at least 15 characters)' })
    .max(1500, { message: 'Description cannot exceed 1500 characters' }),
  category: z.string().min(1, { message: 'Please select a problem category' }),
  state: z.string().default('Tamil Nadu'),
  district: z.string().min(1, { message: 'Please select a district' }),
  local_body: z.string().min(1, { message: 'Please select an urban local body' }),
  city_town: z.string().optional(),
  locality: z.string().min(2, { message: 'Locality or area name is required' }),
  street_name: z.string().optional(),
  landmark: z.string().optional(),
  postal_code: z
    .string()
    .regex(/^[0-9]{6}$/, { message: 'Postal code must be a 6-digit PIN' })
    .or(z.literal(''))
    .optional(),
  observed_at: z.string().min(1, { message: 'Date observed is required' }),
  reporter_name: z.string().max(80).optional(),
  reporter_contact: z.string().max(100).optional(),
  privacy_consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy notice before submitting' })
  })
});

type FormValues = z.infer<typeof reportSchema>;

export const ReportPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState<string>('Chennai');
  const [selectedLatitude, setSelectedLatitude] = useState<number | null>(null);
  const [selectedLongitude, setSelectedLongitude] = useState<number | null>(null);

  // Photographs state
  const [uploadedPhotos, setUploadedPhotos] = useState<{ dataUrl: string; fileName: string }[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      local_body: 'Greater Chennai Corporation',
      city_town: 'Chennai',
      observed_at: new Date().toISOString().slice(0, 10),
      privacy_consent: false as any
    }
  });

  const selectedLocalBodies =
    TAMIL_NADU_DISTRICTS[selectedDistrict]?.localBodies || [];
  const commonLocalities =
    TAMIL_NADU_DISTRICTS[selectedDistrict]?.commonLocalities || [];

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    setValue('district', dist);

    const firstBody = TAMIL_NADU_DISTRICTS[dist]?.localBodies[0]?.name || '';
    setValue('local_body', firstBody);
    setValue('city_town', dist);
  };

  // Photo file upload handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (uploadedPhotos.length >= 3) {
      setPhotoError('You can upload a maximum of 3 photographs per report.');
      return;
    }

    const file = files[0];
    setIsCompressing(true);
    try {
      const compressed = await validateAndCompressImage(file);
      setUploadedPhotos((prev) => [
        ...prev,
        { dataUrl: compressed.dataUrl, fileName: compressed.fileName }
      ]);
    } catch (err: any) {
      setPhotoError(err.message || 'Failed to process photograph.');
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const created = await createReport(
        {
          title: values.title,
          description: values.description,
          category: values.category as ProblemCategory,
          state: values.state,
          district: values.district,
          local_body: values.local_body,
          city_town: values.city_town || '',
          locality: values.locality,
          street_name: values.street_name || '',
          landmark: values.landmark || '',
          postal_code: values.postal_code || '',
          latitude: selectedLatitude,
          longitude: selectedLongitude,
          observed_at: values.observed_at,
          reporter_name: values.reporter_name,
          reporter_contact: values.reporter_contact,
          privacy_consent: values.privacy_consent
        },
        uploadedPhotos.map((p) => ({ dataUrl: p.dataUrl, type: 'before' }))
      );

      setSubmittedReport(created);
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmissionError(err.message || 'Failed to submit community report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
              Your community report has been submitted successfully.
            </h2>
            <p className="text-sm text-forest-900/80 max-w-xl mx-auto">
              Thank you for taking action to improve cleanliness in your neighborhood.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs max-w-lg mx-auto text-left space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-semibold text-slate-500">CleanStreet Reference</span>
              <span className="font-mono font-extrabold text-emerald-800 text-base bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                {submittedReport.reference_code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block">Date Submitted</span>
                <span className="font-medium text-slate-800">
                  {submittedReport.created_at.slice(0, 10)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Community Status</span>
                <StatusBadge status={submittedReport.status} size="sm" />
              </div>
              <div>
                <span className="text-slate-400 block">Location</span>
                <span className="font-medium text-slate-800 truncate block">
                  {submittedReport.locality}, {submittedReport.district}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Category</span>
                <span className="font-medium text-slate-800 truncate block">
                  {CATEGORY_DETAILS[submittedReport.category]?.label || submittedReport.category}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-amber-800 bg-amber-50/90 border border-amber-200 rounded-xl p-3 max-w-xl mx-auto">
            <strong>Important Notice:</strong> Reference{' '}
            <span className="font-mono font-bold">{submittedReport.reference_code}</span> belongs exclusively to CleanStreet TN for community tracking. It is <strong>not</strong> an official municipal complaint docket.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to={`/report/${submittedReport.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition"
            >
              <span>View Submitted Report</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs rounded-xl transition"
            >
              <span>Explore Cleanliness Map</span>
            </Link>
          </div>
        </div>

        {/* Official Complaint Next Step Routing */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-lg">
            Recommended Next Step: Register an Official Municipal Complaint
          </h3>
          <p className="text-xs text-slate-600">
            For municipal conservancy vehicles to be dispatched, open the designated official grievance channel below:
          </p>

          <OfficialRoutingCard
            state={submittedReport.state}
            district={submittedReport.district}
            localBody={submittedReport.local_body}
            category={submittedReport.category}
            reportId={submittedReport.id}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('report.heading')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {t('report.subheading')}
        </p>
      </div>

      {submissionError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{submissionError}</span>
        </div>
      )}

      {/* Main Report Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* SECTION 1: PROBLEM DETAILS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>1. Problem Details</span>
          </h2>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              {t('form.title')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register('title')}
              placeholder={t('form.title.placeholder')}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            {errors.title && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              {t('form.category')} <span className="text-rose-500">*</span>
            </label>
            <select
              {...register('category')}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="">-- Select issue category --</option>
              {Object.entries(CATEGORY_DETAILS).map(([key, cat]) => (
                <option key={key} value={key}>
                  {language === 'ta' ? cat.tamilLabel : cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">
              {t('form.description')} <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              {...register('description')}
              placeholder={t('form.description.placeholder')}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden resize-y"
            />
            {errors.description && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.description.message}</p>
            )}
          </div>

          {/* Date Observed */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{t('form.date_observed')} <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="date"
              {...register('observed_at')}
              max={new Date().toISOString().slice(0, 10)}
              className="w-full sm:w-48 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            {errors.observed_at && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.observed_at.message}</p>
            )}
          </div>
        </div>

        {/* SECTION 2: LOCATION DETAILS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>2. Location & Jurisdiction</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* State */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.state')}
              </label>
              <input
                type="text"
                {...register('state')}
                disabled
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
              />
            </div>

            {/* District */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.district')} <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {Object.keys(TAMIL_NADU_DISTRICTS).map((d) => (
                  <option key={d} value={d}>
                    {language === 'ta' ? TAMIL_NADU_DISTRICTS[d].tamilName : d}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.district.message}</p>
              )}
            </div>

            {/* Urban Local Body */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.local_body')} <span className="text-rose-500">*</span>
              </label>
              <select
                {...register('local_body')}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {selectedLocalBodies.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.type})
                  </option>
                ))}
              </select>
              {errors.local_body && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.local_body.message}</p>
              )}
            </div>

            {/* Area or Locality */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.locality')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register('locality')}
                placeholder="e.g. T. Nagar, Anna Nagar West, Velachery..."
                list="localities-datalist"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
              <datalist id="localities-datalist">
                {commonLocalities.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
              {errors.locality && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.locality.message}</p>
              )}
            </div>

            {/* Street Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.street_name')}
              </label>
              <input
                type="text"
                {...register('street_name')}
                placeholder="e.g. 4th Cross Street, North Usman Road"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Landmark */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.landmark')}
              </label>
              <input
                type="text"
                {...register('landmark')}
                placeholder="e.g. Near Bus Stand, Opposite School Gate"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Postal Code */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.postal_code')}
              </label>
              <input
                type="text"
                {...register('postal_code')}
                placeholder="600017"
                maxLength={6}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
              />
              {errors.postal_code && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.postal_code.message}</p>
              )}
            </div>
          </div>

          {/* Interactive Pin Map Picker with explicit GPS consent */}
          <div className="pt-2 border-t border-slate-100">
            <LocationPickerMap
              latitude={selectedLatitude}
              longitude={selectedLongitude}
              onChange={(lat, lng) => {
                setSelectedLatitude(lat);
                setSelectedLongitude(lng);
              }}
            />
          </div>
        </div>

        {/* SECTION 3: PHOTOGRAPH UPLOAD */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-700" />
              <span>3. Photograph Upload (Optional)</span>
            </h2>
            <span className="text-[11px] text-slate-400">Max 3 images</span>
          </div>

          <p className="text-xs text-slate-500">
            {t('form.photo.help')}
          </p>

          {photoError && (
            <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              {photoError}
            </p>
          )}

          {/* Photo Previews */}
          {uploadedPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {uploadedPhotos.map((photo, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100 group">
                  <img src={photo.dataUrl} alt="Upload preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition shadow"
                    title="Remove photograph"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          {uploadedPhotos.length < 3 && (
            <label className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition">
              <Upload className={`w-8 h-8 text-emerald-600 mb-2 ${isCompressing ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-semibold text-slate-700">
                {isCompressing ? 'Compressing & validating image...' : 'Click to select photo (JPG, PNG, WebP)'}
              </span>
              <span className="text-[11px] text-slate-400 mt-1">Up to 5 MB. Strictly no executable files.</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={isCompressing}
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* SECTION 4: PRIVACY & SUBMISSION */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>4. Privacy & Consent</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.reporter_name')}
              </label>
              <input
                type="text"
                {...register('reporter_name')}
                placeholder="Leave blank to report anonymously"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                {t('form.reporter_contact')}
              </label>
              <input
                type="text"
                {...register('reporter_contact')}
                placeholder="Optional email or phone for moderator follow-up"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-400 block">
                Never shared or published publicly on the website.
              </span>
            </div>
          </div>

          {/* Privacy Notice Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register('privacy_consent')}
                className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                {t('form.privacy_notice')}
              </span>
            </label>
            {errors.privacy_consent && (
              <p className="text-[11px] text-rose-600 font-medium mt-1">
                {errors.privacy_consent.message}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting || isCompressing}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-900/10 hover:shadow-lg transition transform active:scale-95"
            >
              {isSubmitting ? 'Submitting Report...' : t('form.submit_button')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
