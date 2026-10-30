import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  PlusCircle,
  MapPin,
  BarChart3,
  BookOpen,
  Calendar,
  Search,
  Shield,
  Languages,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isAdmin, user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: null },
    { to: '/map', label: t('nav.map'), icon: MapPin },
    { to: '/dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { to: '/learn', label: t('nav.learn'), icon: BookOpen },
    { to: '/campaigns', label: t('nav.campaigns'), icon: Calendar },
    { to: '/track', label: t('nav.track'), icon: Search }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="shrink-0 focus:outline-hidden" onClick={() => setMobileMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-xs">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                    active
                      ? 'text-emerald-800 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5 opacity-70" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition focus:outline-hidden"
              title="Toggle Tamil / English"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Admin link */}
            <Link
              to="/admin"
              className={`p-2 rounded-xl text-xs font-medium border transition flex items-center gap-1 ${
                isAdmin
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title={isAdmin ? `Logged in as ${user?.email}` : 'Moderator / Admin Login'}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{isAdmin ? 'Admin Area' : 'Admin'}</span>
            </Link>

            {/* Report Problem Call to Action */}
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('nav.report')}</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 bg-slate-50"
            >
              <Languages className="w-3 h-3 text-emerald-600" />
              <span>{language === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(link.to)
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4 opacity-70" />}
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Shield className="w-4 h-4 opacity-70" />
              <span>{t('nav.admin')}</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 text-white rounded-xl font-semibold text-sm shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('nav.report')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
