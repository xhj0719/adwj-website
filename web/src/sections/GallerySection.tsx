import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  location: string;
  category: string;
  description: string;
}

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: '/images/gallery-1.jpg',
      title: '杭州私宅 · 阅读角',
      location: '杭州',
      category: '私宅',
      description: '藤编吊灯为阅读角增添自然气息，温暖的光线陪伴每一个阅读时光。',
    },
    {
      id: 2,
      image: '/images/gallery-2.jpg',
      title: '上海咖啡馆 · 吧台',
      location: '上海',
      category: '商业',
      description: '手工吹制玻璃吊灯阵列，为咖啡馆营造独特的氛围。',
    },
    {
      id: 3,
      image: '/images/gallery-3.jpg',
      title: '自然餐厅 · 用餐区',
      location: '成都',
      category: '餐饮',
      description: '陶瓷吊灯与绿植环绕，打造自然舒适的用餐环境。',
    },
    {
      id: 4,
      image: '/images/gallery-4.jpg',
      title: '深圳画廊 · 展厅',
      location: '深圳',
      category: '艺术空间',
      description: '大型装置艺术吊灯，成为画廊空间的视觉焦点。',
    },
    {
      id: 5,
      image: '/images/b2b-hotel.jpg',
      title: '精品酒店 · 大堂',
      location: '北京',
      category: '酒店',
      description: '奢华吊灯为酒店大堂注入艺术气息。',
    },
    {
      id: 6,
      image: '/images/showroom.jpg',
      title: '爱达展厅 · 展示区',
      location: '东莞',
      category: '展厅',
      description: '我们的光影体验空间，欢迎莅临参观。',
    },
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 bg-oak/20"
    >
      <div className="section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-terracotta" />
            <span className="text-terracotta text-sm tracking-widest uppercase">
              光影画廊
            </span>
            <div className="w-12 h-px bg-terracotta" />
          </div>
          <h2 className="section-title">光影叙事 · 生活片段</h2>
          <p className="section-subtitle mx-auto">
            精选实景案例，见证光与空间的完美融合
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div
                onClick={() => setSelectedImage(item)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white/70 text-xs tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white font-display text-xl mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-white/70 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 btn-secondary"
          >
            <span>查看全部案例</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="aspect-[16/10] rounded-lg overflow-hidden mb-6"
                style={{
                  backgroundImage: `url(${selectedImage.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="text-white">
                <span className="text-white/60 text-sm tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-display mt-2 mb-3">
                  {selectedImage.title}
                </h3>
                <div className="flex items-center text-white/70 text-sm mb-4">
                  <MapPin size={16} className="mr-2" />
                  {selectedImage.location}
                </div>
                <p className="text-white/80 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
