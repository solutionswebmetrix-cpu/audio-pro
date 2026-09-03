import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { products } from '@/data/products';
import { siteData } from '@/data/siteData';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  presetProduct?: string;
}

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

const initialForm: FormData = {
  name: '',
  company: '',
  phone: '',
  email: '',
  product: '',
  quantity: '',
  application: '',
  message: '',
};

export function QuoteModal({ open, onClose, presetProduct }: QuoteModalProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, product: presetProduct || f.product }));
      setStatus('idle');
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, presetProduct]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'loading') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, status]);

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

  const handleClose = () => {
    if (status === 'success') {
      setForm(initialForm);
    }
    setStatus('idle');
    onClose();
  };

  const animProps = reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          {...animProps}
        >
          <div className="absolute inset-0 bg-[#252525]/80 backdrop-blur-md" onClick={() => status !== 'loading' && handleClose()} />
          <motion.div
            className="relative z-10 w-full max-w-lg"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.95, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.95, y: 20 },
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                })}
          >
            <div className="card-surface max-h-[90vh] overflow-y-auto rounded-2xl">
              <div className="flex items-center justify-between border-b border-[#E1E4E8] px-6 py-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#1A1A1A]">Request a Quote</h2>
                  <p className="mt-1 text-xs text-[#7A7F85]">Tell us what you need and we'll get back to you.</p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={status === 'loading'}
                  className="rounded-lg p-2 text-[#7A7F85] transition-colors hover:bg-[#F5F6F7] hover:text-[#1A1A1A] disabled:opacity-50"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {status === 'success' ? (
                <div className="px-6 py-12 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#25D366]" />
                  <h3 className="mt-4 font-display text-lg font-bold text-[#1A1A1A]">Quote Request Sent</h3>
                  <p className="mt-2 text-sm text-[#5F6368]">
                    Your enquiry has been opened in WhatsApp. We'll respond with pricing and availability shortly.
                  </p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <button onClick={handleClose} className="btn-ghost">Close</button>
                    <button
                      onClick={() => { handleClose(); navigate('/products'); }}
                      className="btn-primary"
                    >
                      Browse Products
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" required error={errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-field"
                        placeholder="Your name"
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
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone" required error={errors.phone}>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input-field"
                        placeholder="Your phone number"
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
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Product">
                      <select
                        value={form.product}
                        onChange={(e) => setForm({ ...form, product: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Select a product</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} — {p.subCategory}
                          </option>
                        ))}
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </Field>
                    <Field label="Quantity">
                      <input
                        type="text"
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        className="input-field"
                        placeholder="e.g. 5 units"
                      />
                    </Field>
                  </div>
                  <Field label="Application">
                    <input
                      type="text"
                      value={form.application}
                      onChange={(e) => setForm({ ...form, application: e.target.value })}
                      className="input-field"
                      placeholder="e.g. Live event, auditorium, DJ setup"
                    />
                  </Field>
                  <Field label="Message">
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Additional details about your requirement"
                    />
                  </Field>

                  {status === 'error' && (
                    <p className="text-sm text-[#E52B25]">Something went wrong. Please try again or contact us directly.</p>
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
                        Send Enquiry via WhatsApp
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-[#7A7F85]">
                    Or call us at{' '}
                    <a href={siteData.contact.phoneTel} className="text-[#5F6368] hover:text-[#E52B25]">
                      {siteData.contact.phoneDisplay}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
        {label} {required && <span className="text-[#E52B25]">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-[#E52B25]">{error}</span>}
    </label>
  );
}
