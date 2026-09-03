import { lazy, Suspense, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { QuoteModal } from '@/components/QuoteModal';
import { PageLoader } from '@/components/PageLoader';

const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const ProductCategory = lazy(() => import('@/pages/ProductCategory'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const RequestQuote = lazy(() => import('@/pages/RequestQuote'));
const Compare = lazy(() => import('@/pages/Compare'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string | undefined>(undefined);

  const openQuote = useCallback((product?: string) => {
    setQuoteProduct(product);
    setQuoteOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setQuoteOpen(false);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-ink-950">
        <Header onQuoteOpen={openQuote} />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home onQuoteOpen={openQuote} />} />
              <Route path="/products" element={<Products onQuoteOpen={openQuote} />} />
              <Route path="/products/amplifiers" element={<ProductCategory category="Amplifiers" onQuoteOpen={openQuote} />} />
              <Route path="/products/mixers" element={<ProductCategory category="Mixers" onQuoteOpen={openQuote} />} />
              <Route path="/products/speakers" element={<ProductCategory category="Speakers" onQuoteOpen={openQuote} />} />
              <Route path="/products/dj-amplifiers" element={<ProductCategory subCategory="DJ Amplifier" onQuoteOpen={openQuote} />} />
              <Route path="/products/hi-fi-amplifiers" element={<ProductCategory subCategory="Hi-Fi Amplifier" onQuoteOpen={openQuote} />} />
              <Route path="/products/:slug" element={<ProductDetails onQuoteOpen={openQuote} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request-quote" element={<RequestQuote onQuoteOpen={openQuote} />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer onQuoteOpen={() => openQuote()} />
        <QuoteModal open={quoteOpen} onClose={closeQuote} presetProduct={quoteProduct} />
      </div>
    </BrowserRouter>
  );
}
