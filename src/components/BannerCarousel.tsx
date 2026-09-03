import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '../../assets/banner 1.png';
import banner2 from '../../assets/banner 2.png';
import banner3 from '../../assets/banner 3.png';
import banner4 from '../../assets/banner.png';

interface BannerCarouselProps {
  children: React.ReactNode;
}

const banners = [banner1, banner2, banner3, banner4];

export function BannerCarousel({ children }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          {banners.map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`Audio & Pro banner ${index + 1}`}
              className={`absolute inset-0 block w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => {
                console.error('Banner image failed to load:', e.currentTarget.src);
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#252525]/55 via-[#252525]/25 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#252525]/45 via-transparent to-transparent" />

        <div className="relative z-20 w-full h-full">{children}</div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-pro-red/50 sm:left-6"
          aria-label="Previous banner"
        >
          <ChevronLeft className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-pro-red/50 sm:right-6"
          aria-label="Next banner"
        >
          <ChevronRight className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pro-red/50 ${
                index === currentSlide
                  ? 'w-6 bg-pro-red'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to banner ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
