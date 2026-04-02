import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('philosophy');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-light.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg">
            与光同行
          </h1>
          
          {/* Subtitle */}
          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-white/90 font-light tracking-widest">
              爱达无界
            </p>
            <p className="text-lg md:text-xl text-white/70 font-light italic">
              Love Without Borders
            </p>
          </div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-24 h-px bg-white/60 mx-auto"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="text-sm md:text-base text-white/80 max-w-md mx-auto leading-relaxed"
          >
            用温暖的光影重塑生活空间<br />
            让每一盏灯都成为与光的对话
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1, y: [0, 10, 0] } : {}}
          transition={{
            opacity: { duration: 1, delay: 1.2 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
