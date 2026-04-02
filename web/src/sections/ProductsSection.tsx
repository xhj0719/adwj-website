import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Home } from 'lucide-react';

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    {
      id: 'b2b',
      title: 'B端定制',
      subtitle: '为商业空间注入自然温度',
      icon: Building2,
      image: '/images/b2b-hotel.jpg',
      description: '酒店、会所、办公、商业空间的专属灯光解决方案',
      link: '/products?category=b2b',
    },
    {
      id: 'b2c',
      title: 'C端零售',
      subtitle: '点亮家的柔软时光',
      icon: Home,
      image: '/images/b2c-living.jpg',
      description: '客厅、餐厅、卧室、书房的温馨灯光选择',
      link: '/products?category=b2c',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: '晨光 · 手工吹制吊灯',
      category: '客厅系列',
      image: '/images/product-1.jpg',
      price: '¥2,680',
    },
    {
      id: 2,
      name: '原木 · 三头餐厅吊灯',
      category: '餐厅系列',
      image: '/images/product-2.jpg',
      price: '¥3,280',
    },
    {
      id: 3,
      name: '琥珀 · 艺术玻璃台灯',
      category: '卧室系列',
      image: '/images/product-3.jpg',
      price: '¥1,580',
    },
    {
      id: 4,
      name: '侘寂 · 藤编落地灯',
      category: '书房系列',
      image: '/images/product-4.jpg',
      price: '¥2,180',
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 bg-warm-white"
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
              产品橱窗
            </span>
            <div className="w-12 h-px bg-terracotta" />
          </div>
          <h2 className="section-title">生活场景展架</h2>
          <p className="section-subtitle mx-auto">
            每一款灯具都置于真实的生活角落，让光成为空间的灵魂
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link to={category.link}>
                <div className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <category.icon className="text-white" size={24} />
                      </div>
                      <span className="text-white/80 text-sm tracking-wider">
                        {category.id === 'b2b' ? '商业定制' : '家居零售'}
                      </span>
                    </div>

                    <h3 className="text-3xl font-display text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-3">
                      {category.subtitle}
                    </p>
                    <p className="text-white/70 text-sm mb-6">
                      {category.description}
                    </p>

                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: hoveredCard === category.id ? 10 : 0 }}
                      className="flex items-center text-white space-x-2"
                    >
                      <span className="text-sm">探索更多</span>
                      <ArrowRight size={18} />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display text-charcoal">精选产品</h3>
            <Link
              to="/products"
              className="flex items-center space-x-2 text-terracotta hover:text-terracotta/80 transition-colors"
            >
              <span className="text-sm">查看全部</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Link to={`/products/${product.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <ArrowRight className="text-charcoal" size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-charcoal/50">{product.category}</p>
                      <h4 className="font-medium text-charcoal group-hover:text-terracotta transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-terracotta font-medium">{product.price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
