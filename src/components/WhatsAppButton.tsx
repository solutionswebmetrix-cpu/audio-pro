import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  url: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function WhatsAppButton({
  url,
  label = 'WhatsApp Enquiry',
  className = '',
  size = 'md',
}: WhatsAppButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  );
}
