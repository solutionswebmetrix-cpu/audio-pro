import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { setDocumentMeta } from '@/utils/seo';

export default function NotFound() {
  setDocumentMeta({
    title: 'Page Not Found — Audio&Pro',
    description: 'The page you are looking for could not be found.',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-5 pt-20">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-pro-red/20 bg-pro-red/5">
          <AlertCircle className="h-8 w-8 text-pro-red" />
        </div>
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">404</h1>
        <p className="mt-3 text-lg font-medium text-steel-300">Page Not Found</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-steel-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link to="/products" className="btn-primary">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
