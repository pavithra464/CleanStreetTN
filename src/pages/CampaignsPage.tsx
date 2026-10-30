import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import { fetchCampaigns, proposeCampaign } from '../services/campaignService';
import { Campaign } from '../types/campaign';
import { TAMIL_NADU_DISTRICTS } from '../data/tamilNaduDistricts';
import {
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  PlusCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Send
} from 'lucide-react';

const proposalSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Please describe the drive and objective (at least 20 chars)' }),
  locality: z.string().min(2, { message: 'Locality is required' }),
  district: z.string().min(1, { message: 'District is required' }),
  local_body: z.string().min(1, { message: 'Local body is required' }),
  event_date: z.string().min(1, { message: 'Event date is required' }),
  organizer: z.string().min(3, { message: 'Organizer or School Club name is required' }),
  organizer_type: z.string().min(1, { message: 'Please select an organizer type' }),
  meeting_point: z.string().min(5, { message: 'Please specify the exact meeting point' }),
  contact_email: z.string().email({ message: 'Valid contact email is required' }),
  contact_phone: z.string().min(10, { message: 'Phone number is required for verification' }),
  equipment_needed: z.string().optional()
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

export const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'propose'>('upcoming');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [selectedDistrict, setSelectedDistrict] = useState<string>('Chennai');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      district: 'Chennai',
      local_body: 'Greater Chennai Corporation',
      organizer_type: 'School'
    }
  });

  const loadData = async () => {
    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('cleanstreet_campaigns_changed', loadData);
    return () => window.removeEventListener('cleanstreet_campaigns_changed', loadData);
  }, []);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    setValue('district', dist);

    const firstBody = TAMIL_NADU_DISTRICTS[dist]?.localBodies[0]?.name || '';
    setValue('local_body', firstBody);
  };

  const onSubmitProposal = async (data: ProposalFormValues) => {
    setIsSubmitting(true);
    try {
      await proposeCampaign({
        title: data.title,
        description: data.description,
        locality: data.locality,
        district: data.district,
        local_body: data.local_body,
        event_date: data.event_date,
        organizer: data.organizer,
        organizer_type: data.organizer_type,
        meeting_point: data.meeting_point,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        equipment_needed: data.equipment_needed || 'Gloves, Trash Sacks'
      });

      setSuccessMessage('Your cleanliness campaign proposal has been submitted! Our moderator desk will review details and confirm with you before publishing.');
      reset();
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch {}
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const upcomingCampaigns = campaigns.filter((c) => c.status === 'Upcoming');
  const completedCampaigns = campaigns.filter((c) => c.status === 'Completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Community Action Drives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            School & Community Cleanliness Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Student Eco-Clubs, Residential Associations, and volunteer drives transforming Tamil Nadu neighborhoods.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => { setActiveTab('upcoming'); setSuccessMessage(null); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'upcoming'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming ({upcomingCampaigns.length})
          </button>
          <button
            onClick={() => { setActiveTab('completed'); setSuccessMessage(null); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              activeTab === 'completed'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Drives ({completedCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('propose')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1 ${
              activeTab === 'propose'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Propose Drive</span>
          </button>
        </div>
      </div>

      {/* UPCOMING CAMPAIGNS */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingCampaigns.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">No upcoming public drives scheduled</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Be the first to organize a cleanliness drive in your school or locality!
              </p>
              <button
                onClick={() => setActiveTab('propose')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl"
              >
                Propose a Campaign
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {camp.organizer_type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <Users className="w-3.5 h-3.5" />
                        <span>{camp.participants_count} volunteers</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {camp.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Date: {camp.event_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{camp.locality}, {camp.district}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1">
                        <strong>Meeting Point:</strong> {camp.meeting_point}
                      </div>
                    </div>

                    {camp.equipment_provided && camp.equipment_provided.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Equipment Provided:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {camp.equipment_provided.map((eq, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                              {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Org: {camp.organizer}</span>
                    <a
                      href={`mailto:${camp.contact_email}?subject=Volunteer RSVP for ${camp.title}`}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition"
                    >
                      RSVP / Join
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* COMPLETED CAMPAIGNS */}
      {activeTab === 'completed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {completedCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3 opacity-90"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  Completed Drive
                </span>
                <span className="text-xs text-slate-400 font-mono">{camp.event_date}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{camp.title}</h3>
              <p className="text-xs text-slate-600">{camp.description}</p>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Successfully conducted by {camp.organizer}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROPOSE CAMPAIGN FORM */}
      {activeTab === 'propose' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-900">
              Propose a School or Community Cleanliness Drive
            </h2>
            <p className="text-xs text-slate-500">
              CleanStreet TN assists school eco-clubs, NSS teams, and RWAs in planning neighborhood cleanups.
            </p>
          </div>

          {successMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Proposal Submitted Successfully!</p>
                <p className="mt-0.5">{successMessage}</p>
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Moderation Policy:</strong> To ensure student safety and proper municipal garbage truck coordination, all campaigns are verified by an administrator before appearing on the public schedule.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmitProposal)} className="space-y-4 text-xs">
            {/* Title */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Campaign Title *</label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. Besant Nagar Beach Shoreline Plastic Cleanup"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
              {errors.title && <p className="text-rose-600">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Detailed Description *</label>
              <textarea
                rows={3}
                {...register('description')}
                placeholder="Explain the cleanup segment, target waste, and who can participate..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
              {errors.description && <p className="text-rose-600">{errors.description.message}</p>}
            </div>

            {/* District & Local Body */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">District *</label>
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.keys(TAMIL_NADU_DISTRICTS).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Urban Local Body *</label>
                <select
                  {...register('local_body')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  {(TAMIL_NADU_DISTRICTS[selectedDistrict]?.localBodies || []).map((b) => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Locality & Meeting Point */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Locality / Area *</label>
                <input
                  type="text"
                  {...register('locality')}
                  placeholder="e.g. Anna Nagar West"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
                {errors.locality && <p className="text-rose-600">{errors.locality.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Exact Meeting Point *</label>
                <input
                  type="text"
                  {...register('meeting_point')}
                  placeholder="e.g. Tower Park Gate 2 Entrance"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
                {errors.meeting_point && <p className="text-rose-600">{errors.meeting_point.message}</p>}
              </div>
            </div>

            {/* Event Date & Organizer Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Event Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  {...register('event_date')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
                />
                {errors.event_date && <p className="text-rose-600">{errors.event_date.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Organizer Type *</label>
                <select
                  {...register('organizer_type')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="School">School Eco-Club / Green Corps</option>
                  <option value="College">College NSS / Youth Red Cross</option>
                  <option value="Residents Welfare Association">Residents Welfare Association (RWA)</option>
                  <option value="Youth Club">Neighborhood Youth Club</option>
                  <option value="Environmental NGO">Environmental NGO</option>
                </select>
              </div>
            </div>

            {/* Organizer Name & Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Organizer Name *</label>
                <input
                  type="text"
                  {...register('organizer')}
                  placeholder="e.g. St. Bede's Eco Club"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
                {errors.organizer && <p className="text-rose-600">{errors.organizer.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Contact Email *</label>
                <input
                  type="email"
                  {...register('contact_email')}
                  placeholder="teacher@school.org"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
                {errors.contact_email && <p className="text-rose-600">{errors.contact_email.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Contact Phone *</label>
                <input
                  type="tel"
                  {...register('contact_phone')}
                  placeholder="98400XXXXX"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
                {errors.contact_phone && <p className="text-rose-600">{errors.contact_phone.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Equipment Provided / Needed</label>
              <input
                type="text"
                {...register('equipment_needed')}
                placeholder="e.g. Heavy Duty Gloves, Jute Sacks, Trash Grabbers, First Aid"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Proposal for Moderation'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
