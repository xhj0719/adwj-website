import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="min-h-screen bg-warm-white py-20 lg:py-0"
    >
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-[50vh] lg:h-auto overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/materials.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-warm-white/20 lg:to-warm-white/40" />
          
          {/* Decorative Elements */}
          <svg
            className="absolute bottom-0 right-0 w-32 h-32 text-terracotta/10"
            viewBox="0 0 100 100"
          >
            <circle cx="80" cy="80" r="60" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Right - Content */}
        <div className="flex items-center justify-center px-8 lg:px-16 py-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg"
          >
            {/* Section Label */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-px bg-terracotta" />
              <span className="text-terracotta text-sm tracking-widest uppercase">
                品牌理念
              </span>
            </div>

            {/* Title */}
            <h2 className="section-title mb-8">
              从自然中汲取灵感
              <br />
              <span className="text-terracotta">用光影重塑空间</span>
            </h2>

            {/* Quote */}
            <blockquote className="quote-text mb-8 text-charcoal/80">
              "光是有温度的材质，能够连接人与空间的情感。"
            </blockquote>

            {/* Description */}
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                成立于2025年的爱达无界，从自然中汲取灵感，用温暖的光影重塑生活空间。
                我们相信，每一盏灯都是一次与光的对话。
              </p>
              <p>
                我们偏爱自然的材质、手工的温度，以及那些能唤起情感共鸣的光影瞬间。
                藤编的纹理、手工陶瓷的质感、原木的温度——这些自然元素与光的结合，
                创造出独特的空间氛围。
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-mist"
            >
              <div>
                <div className="text-3xl font-display text-terracotta">2025</div>
                <div className="text-sm text-charcoal/60 mt-1">成立年份</div>
              </div>
              <div>
                <div className="text-3xl font-display text-terracotta">100+</div>
                <div className="text-sm text-charcoal/60 mt-1">原创设计</div>
              </div>
              <div>
                <div className="text-3xl font-display text-terracotta">50+</div>
                <div className="text-sm text-charcoal/60 mt-1">合作品牌</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
