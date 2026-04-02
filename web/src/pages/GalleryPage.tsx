import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import FooterSection from '@/sections/FooterSection';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  location: string;
  category: string;
  description: string;
  products: string[];
}

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: '/images/gallery-1.jpg',
      title: '杭州私宅 · 阅读角',
      location: '杭州',
      category: '私宅',
      description: '藤编吊灯为阅读角增添自然气息，温暖的光线陪伴每一个阅读时光。业主是一位热爱阅读的设计师，希望打造一个温馨舒适的阅读空间。',
      products: ['藤编吊灯', '原木台灯'],
    },
    {
      id: 2,
      image: '/images/gallery-2.jpg',
      title: '上海咖啡馆 · 吧台',
      location: '上海',
      category: '商业',
      description: '手工吹制玻璃吊灯阵列，为咖啡馆营造独特的氛围。每一盏灯都经过精心调试，确保光线柔和不刺眼。',
      products: ['琥珀玻璃吊灯', '黄铜壁灯'],
    },
    {
      id: 3,
      image: '/images/gallery-3.jpg',
      title: '成都自然餐厅 · 用餐区',
      location: '成都',
      category: '餐饮',
      description: '陶瓷吊灯与绿植环绕，打造自然舒适的用餐环境。餐厅主打有机食材，灯光设计呼应自然主题。',
      products: ['陶瓷吊灯', '藤编落地灯'],
    },
    {
      id: 4,
      image: '/images/gallery-4.jpg',
      title: '深圳现代画廊 · 展厅',
      location: '深圳',
      category: '艺术空间',
      description: '大型装置艺术吊灯，成为画廊空间的视觉焦点。灯光可根据展览需求进行调节，完美呈现每一件艺术品。',
      products: ['装置艺术吊灯', '轨道射灯'],
    },
    {
      id: 5,
      image: '/images/b2b-hotel.jpg',
      title: '北京精品酒店 · 大堂',
      location: '北京',
      category: '酒店',
      description: '奢华吊灯为酒店大堂注入艺术气息。手工吹制玻璃与黄铜材质的结合，彰显高端品质。',
      products: ['奢华水晶吊灯', '壁灯系列'],
    },
    {
      id: 6,
      image: '/images/showroom.jpg',
      title: '爱达展厅 · 展示区',
      location: '东莞',
      category: '展厅',
      description: '我们的光影体验空间，展示最新产品系列。欢迎莅临参观，亲身感受光的温度。',
      products: ['全系列产品'],
    },
    {
      id: 7,
      image: '/images/b2c-living.jpg',
      title: '广州私宅 · 客厅',
      location: '广州',
      category: '私宅',
      description: '温馨客厅角落，手工陶瓷台灯照亮阅读角。自然光与人工光的完美融合。',
      products: ['陶瓷台灯', '落地灯'],
    },
    {
      id: 8,
      image: '/images/workshop.jpg',
      title: '手工工坊 · 制作过程',
      location: '东莞',
      category: '展厅',
      description: '见证每一盏灯诞生的过程。手工吹制、精心打磨，每一步都凝聚着匠人的心血。',
      products: ['手工定制系列'],
    },
  ];

  const filters = [
    { id: 'all', label: '全部' },
    { id: '私宅', label: '私宅' },
    { id: '商业', label: '商业' },
    { id: '餐饮', label: '餐饮' },
    { id: '酒店', label: '酒店' },
    { id: '艺术空间', label: '艺术空间' },
    { id: '展厅', label: '展厅' },
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const currentIndex = selectedImage 
    ? filteredItems.findIndex(item => item.id === selectedImage.id)
    : -1;

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    }
  };

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="bg-oak/20 py-16 mt-20">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-px bg-terracotta" />
              <span className="text-terracotta text-sm tracking-widest uppercase">
                光影画廊
              </span>
              <div className="w-12 h-px bg-terracotta" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-4">
              光影叙事 · 生活片段
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              精选实景案例，见证光与空间的完美融合
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="section-padding py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full text-sm transition-all ${
                filter === f.id
                  ? 'bg-terracotta text-white'
                  : 'bg-white text-charcoal/70 hover:bg-oak/30 shadow-soft'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="section-padding pb-24">
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedImage(item)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-soft hover:shadow-warm transition-shadow"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-terracotta text-xs tracking-wider mb-2">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentIndex < filteredItems.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full mx-4 grid lg:grid-cols-2 gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div
                className="aspect-[4/3] rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${selectedImage.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Info */}
              <div className="text-white flex flex-col justify-center">
                <span className="text-terracotta text-sm tracking-wider mb-3">
                  {selectedImage.category}
                </span>
                <h3 className="text-3xl font-display mb-4">
                  {selectedImage.title}
                </h3>
                <div className="flex items-center text-white/70 mb-6">
                  <MapPin size={18} className="mr-2" />
                  {selectedImage.location}
                </div>
                <p className="text-white/80 leading-relaxed mb-8">
                  {selectedImage.description}
                </p>
                <div>
                  <p className="text-white/60 text-sm mb-3">使用产品</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.products.map((product) => (
                      <span
                        key={product}
                        className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterSection />
    </main>
  );
};

export default GalleryPage;
