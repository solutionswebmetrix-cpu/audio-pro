import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle2, Loader2, Phone, MessageCircle } from 'lucide-react';
import { siteData } from '@/data/siteData';
import { products } from '@/data/products';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { setDocumentMeta } from '@/utils/seo';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  application: string;
  message: string;
}

export default function RequestQuote({ onQuoteOpen: _onQuoteOpen }: { onQuoteOpen: (product?: string) => void }) {
  const [searchParams] = useSearchParams();
  const presetProduct = searchParams.get('product') || '';
  const [form, setForm] = useState<FormData>({
    name: '', company: '', phone: '', email: '', product: presetProduct,
    quantity: '', application: '', message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  setDocumentMeta({
    title: 'Request a Quote — Audio&Pro',
    description: 'Request a quote for Audio&Pro professional power amplifiers, DJ amplifiers, Hi-Fi amplifiers and audio mixers.',
  });

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^[+\d\s()-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const message = `Hello Audio&Pro, I would like to request a quote.

Name: ${form.name}
Company: ${form.company || 'N/A'}
Phone: ${form.phone}
Email: ${form.email || 'N/A'}
Product: ${form.product || 'N/A'}
Quantity: ${form.quantity || 'N/A'}
Application: ${form.application || 'N/A'}

Message: ${form.message || 'N/A'}`;

    await new Promise((r) => setTimeout(r, 600));
    window.open(buildWhatsAppUrl(message), '_blank');
    setStatus('success');
  };

  return (
    <div className="pt-24">
      <section className="border-b border-[#E1E4E8] bg-[#F5F6F7] py-12">
        <div className="container-px">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Request Quote' }]} />
          <div className="mt-6">
            <SectionHeading
              overline="Quote"
              title="Request a Quote"
              subtitle="Tell us what you need — whether it's a single amplifier or equipment for a complete installation."
            />
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-px">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="card-surface p-6 sm:p-8">
                {status === 'success' ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-[#25D366]" />
                    <h3 className="mt-4 font-display text-xl font-bold text-[#1A1A1A]">Quote Request Sent</h3>
                    <p className="mt-2 text-sm text-[#5F6368]">
                      Your enquiry has been opened in WhatsApp. We'll respond with pricing and availability shortly.
                    </p>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <a href={siteData.contact.phoneTel} className="btn-ghost">
                        <Phone className="h-4 w-4" />
                        Call Us
                      </a>
                      <a
                        href={`https://wa.me/${siteData.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Open WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" required error={errors.name}>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
                      </Field>
                      <Field label="Company">
                        <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" placeholder="Company name" />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone" required error={errors.phone}>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="Your phone" />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Product">
                        <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="input-field">
                          <option value="">Select a product</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.name}>{p.name} — {p.subCategory}</option>
                          ))}
                          <option value="General Enquiry">General Enquiry</option>
                        </select>
                      </Field>
                      <Field label="Quantity">
                        <input type="text" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="input-field" placeholder="e.g. 5 units" />
                      </Field>
                    </div>
                    <Field label="Application">
                      <input type="text" value={form.application} onChange={(e) => setForm({ ...form, application: e.target.value })} className="input-field" placeholder="e.g. Live event, auditorium, DJ" />
                    </Field>
                    <Field label="Message">
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="input-field resize-none" placeholder="Additional details" />
                    </Field>
                    {status === 'error' && <p className="text-sm text-pro-red">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
                      {status === 'loading' ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="h-4 w-4" /> Send Enquiry via WhatsApp</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#5F6368]">
        {label} {required && <span className="text-pro-red">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-pro-red">{error}</span>}
    </label>
  );
}
