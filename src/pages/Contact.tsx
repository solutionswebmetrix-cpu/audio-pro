import { useState, type FormEvent } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { siteData } from '@/data/siteData';
import { products } from '@/data/products';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { setDocumentMeta } from '@/utils/seo';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  requirement: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  product: '',
  requirement: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  setDocumentMeta({
    title: 'Contact — Audio&Pro',
    description:
      "Get in touch with Audio&Pro for questions about amplifiers, mixers, bulk orders and professional audio solutions.",
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

    const message = `Hello Audio&Pro,

Name: ${form.name}
Company: ${form.company || 'N/A'}
Phone: ${form.phone}
Email: ${form.email || 'N/A'}
Product: ${form.product || 'N/A'}
Requirement: ${form.requirement || 'N/A'}

Message: ${form.message || 'N/A'}`;

    await new Promise((r) => setTimeout(r, 600));
    window.open(buildWhatsAppUrl(message), '_blank');
    setStatus('success');
  };

  const reset = () => {
    setForm(initialForm);
    setStatus('idle');
    setErrors({});
  };

  return (
    <div className="pt-24">
      <section className="border-b border-[#E1E4E8] bg-[#F5F6F7] py-12">
        <div className="container-px">
          <SectionHeading
            overline="Contact"
            title="Let's Build Your Sound System"
            subtitle="We're here to help with questions about amplifiers, mixers, bulk orders and professional audio solutions."
          />
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            {/* Contact info */}
            <div className="space-y-6">
              <Reveal>
                <div className="card-surface p-6">
                  <h3 className="mb-4 font-display text-lg font-bold text-[#1A1A1A]">Get in Touch</h3>
                  <div className="space-y-4">
                    <a
                      href={siteData.contact.phoneTel}
                      className="flex items-center gap-4 transition-colors hover:text-[#1A1A1A]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-pro-red/20 bg-pro-red/5">
                        <Phone className="h-5 w-5 text-pro-red" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-[#7A7F85]">Phone</div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{siteData.contact.phoneDisplay}</div>
                      </div>
                    </a>
                    <a
                      href={siteData.contact.emailLink}
                      className="flex items-center gap-4 transition-colors hover:text-[#1A1A1A]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-pro-red/20 bg-pro-red/5">
                        <Mail className="h-5 w-5 text-pro-red" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-[#7A7F85]">Email</div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{siteData.contact.email}</div>
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/${siteData.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 transition-colors hover:text-[#1A1A1A]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#25D366]/20 bg-[#25D366]/5">
                        <MessageCircle className="h-5 w-5 text-[#25D366]" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-[#7A7F85]">WhatsApp</div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{siteData.contact.phoneDisplay}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="card-surface p-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-[#1A1A1A]">Business Hours</h3>
                  <div className="space-y-2 text-sm text-[#5F6368]">
                    <div className="flex justify-between">
                      <span>Monday – Friday</span>
                      <span className="text-[#1A1A1A]">9:00 – 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-[#1A1A1A]">10:00 – 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-steel-600">Closed</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={0.15}>
              <div className="card-surface p-6 sm:p-8">
                {status === 'success' ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-[#25D366]" />
                    <h3 className="mt-4 font-display text-xl font-bold text-[#1A1A1A]">Enquiry Sent</h3>
                    <p className="mt-2 text-sm text-[#5F6368]">
                      Your message has been opened in WhatsApp. We'll respond shortly.
                    </p>
                    <button onClick={reset} className="btn-ghost mt-6">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" required error={errors.name}>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="input-field"
                          placeholder="Your name"
                        />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="input-field"
                          placeholder="you@example.com"
                        />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone" required error={errors.phone}>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="input-field"
                          placeholder="Your phone number"
                        />
                      </Field>
                      <Field label="Company">
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="input-field"
                          placeholder="Company name"
                        />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Product / Model">
                        <select
                          value={form.product}
                          onChange={(e) => setForm({ ...form, product: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Select a product</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                          <option value="General Enquiry">General Enquiry</option>
                        </select>
                      </Field>
                      <Field label="Requirement">
                        <input
                          type="text"
                          value={form.requirement}
                          onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                          className="input-field"
                          placeholder="e.g. 5 units, bulk order"
                        />
                      </Field>
                    </div>
                    <Field label="Message">
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Tell us about your requirement"
                      />
                    </Field>

                    {status === 'error' && (
                      <p className="text-sm text-pro-red">Something went wrong. Please try again or contact us via WhatsApp.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Enquiry
                        </>
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

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
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
