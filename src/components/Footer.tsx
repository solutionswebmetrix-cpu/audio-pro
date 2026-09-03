import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Facebook, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';
import { siteData } from '@/data/siteData';
import { generalWhatsAppUrl } from '@/utils/whatsapp';
import { Logo } from './Logo';

interface FooterProps {
  onQuoteOpen: () => void;
}

export function Footer({ onQuoteOpen }: FooterProps) {
  const { contact, social } = siteData;

  const socialLinks = [
    { icon: Facebook, url: social.facebook, label: 'Facebook' },
    { icon: Instagram, url: social.instagram, label: 'Instagram' },
    { icon: Youtube, url: social.youtube, label: 'YouTube' },
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
  ].filter((s) => s.url);

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#252525]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E52B25]/40 to-transparent" />
      <div className="container-px py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo showTagline />
            <p className="mt-5 text-sm leading-relaxed text-white/[0.55]">
              Professional amplifiers and audio solutions engineered for performance.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/[0.12] p-2 text-white/[0.6] transition-colors hover:border-[#E52B25]/40 hover:text-[#E52B25]"
                    aria-label={s.label}
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))
              ) : (
                <p className="text-xs text-white/[0.45]">Social links coming soon.</p>
              )}
            </div>
          </div>

          <FooterCol title="Products">
            <FooterLink to="/products/amplifiers">Power Amplifiers</FooterLink>
            <FooterLink to="/products/dj-amplifiers">DJ Amplifiers</FooterLink>
            <FooterLink to="/products/hi-fi-amplifiers">Hi-Fi Amplifiers</FooterLink>
            <FooterLink to="/products/mixers">Audio Mixers</FooterLink>
            <FooterLink to="/products">All Products</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <button onClick={onQuoteOpen} className="text-left text-sm text-white/[0.7] transition-colors hover:text-white">
              Request Quote
            </button>
            <FooterLink to="/compare">Compare Products</FooterLink>
          </FooterCol>

          <FooterCol title="Support">
            <FooterLink to="/products">Product Information</FooterLink>
            <FooterLink to="/about">Applications</FooterLink>
            <FooterLink to="/contact">Warranty</FooterLink>
            <FooterLink to="/contact">Terms & Conditions</FooterLink>
          </FooterCol>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-ultra text-white/[0.5]">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={contact.phoneTel} className="flex items-center gap-2.5 text-sm text-white/[0.7] transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-[#E52B25]" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={contact.emailLink} className="flex items-center gap-2.5 text-sm text-white/[0.7] transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-[#E52B25]" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={generalWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/[0.7] transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
            <button onClick={onQuoteOpen} className="btn-ghost mt-5 w-full text-xs bg-transparent border border-white/[0.15] text-white hover:bg-white/10">
              Request a Quote
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-6 sm:flex-row">
          <p className="text-xs text-white/[0.45]">
            © {new Date().getFullYear()} Audio&Pro. All rights reserved.
          </p>
          <p className="text-xs text-white/[0.45]">
            Power. Precision. Performance.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-ultra text-white/[0.5]">{title}</h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm text-white/[0.7] transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
