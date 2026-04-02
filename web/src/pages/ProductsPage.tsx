import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FooterSection from '@/sections/FooterSection';

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: string;
  image: string;
  description: string;
  material: string;
  isB2B: boolean;
}

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: '晨光 · 手工吹制吊灯',
      category: 'c2c',
      subcategory: '卧室',
      price: '¥2,680',
      image: '/images/product-1.jpg',
      description: '采用传统手工吹制工艺，每一盏都独一无二。温暖的琥珀色玻璃，为卧室营造温馨氛围。',
      material: '玻璃、黄铜',
      isB2B: false,
    },
    {
      id: 2,
      name: '原木 · 三头餐厅吊灯',
      category: 'c2c',
      subcategory: '餐厅',
      price: '¥3,280',
      image: '/images/product-2.jpg',
      description: '北美橡木与黄铜的完美结合，简约而不简单。三头设计，照亮整个餐桌。',
      material: '橡木、黄铜',
      isB2B: false,
    },
    {
      id: 3,
      name: '琥珀 · 艺术玻璃台灯',
      category: 'c2c',
      subcategory: '卧室',
      price: '¥1,580',
      image: '/images/product-3.jpg',
      description: '手工吹制琥珀色玻璃灯罩，黄铜底座，点亮时散发温暖柔和的光芒。',
      material: '玻璃、黄铜',
      isB2B: false,
    },
    {
      id: 4,
      name: '侘寂 · 藤编落地灯',
      category: 'c2c',
      subcategory: '书房',
      price: '¥2,180',
      image: '/images/product-4.jpg',
      description: '粗糙质感的陶瓷灯座，手工编织藤条灯罩，东方美学的完美诠释。',
      material: '陶瓷、藤编',
      isB2B: false,
    },
    {
      id: 5,
      name: '奢华 · 酒店大堂吊灯',
      category: 'b2b',
      subcategory: '酒店',
      price: '询价',
      image: '/images/b2b-hotel.jpg',
      description: '为高端酒店大堂定制的奢华吊灯，手工吹制玻璃与黄铜材质结合。',
      material: '玻璃、黄铜',
      isB2B: true,
    },
    {
      id: 6,
      name: '艺术 · 画廊装置灯',
      category: 'b2b',
      subcategory: '艺术空间',
      price: '询价',
      image: '/images/gallery-4.jpg',
      description: '大型装置艺术吊灯，几何形状的玻璃与金属结构，成为空间的视觉焦点。',
      material: '玻璃、金属',
      isB2B: true,
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  const categories = [
    { id: 'all', label: '全部产品' },
    { id: 'b2b', label: 'B端定制' },
    { id: 'c2c', label: 'C端零售' },
  ];

  const b2bCategories = ['酒店', '会所', '办公', '商业空间', '艺术空间'];
  const c2cCategories = ['客厅', '餐厅', '卧室', '书房'];

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
                产品橱窗
              </span>
              <div className="w-12 h-px bg-terracotta" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-4">
              探索光影艺术
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              从B端商业空间到C端家居生活，我们为每一个场景提供独特的灯光解决方案
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="section-padding py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-xl p-6 shadow-soft sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter size={18} className="text-terracotta" />
                <h3 className="font-medium text-charcoal">筛选</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-charcoal mb-4">产品类型</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-terracotta text-white'
                          : 'text-charcoal/70 hover:bg-oak/30'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {selectedCategory === 'b2b' && (
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-charcoal mb-4">空间类型</h4>
                  <div className="space-y-2">
                    {b2bCategories.map((sub) => (
                      <button
                        key={sub}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm text-charcoal/70 hover:bg-oak/30 transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedCategory === 'c2c' && (
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-charcoal mb-4">空间类型</h4>
                  <div className="space-y-2">
                    {c2cCategories.map((sub) => (
                      <button
                        key={sub}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm text-charcoal/70 hover:bg-oak/30 transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Style Filter */}
              <div>
                <h4 className="text-sm font-medium text-charcoal mb-4">风格</h4>
                <div className="space-y-2">
                  {['全部', '自然', '现代', '复古', '侘寂'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style === '全部' ? 'all' : style)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedStyle === (style === '全部' ? 'all' : style)
                          ? 'bg-terracotta/10 text-terracotta'
                          : 'text-charcoal/70 hover:bg-oak/30'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-charcoal/60 text-sm">
                共 <span className="text-charcoal font-medium">{filteredProducts.length}</span> 件产品
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-terracotta text-white' : 'text-charcoal/60 hover:bg-oak/30'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-terracotta text-white' : 'text-charcoal/60 hover:bg-oak/30'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Products */}
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            } gap-6`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className={`group bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-warm transition-all cursor-pointer ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'
                    }`}>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                      {product.isB2B && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-terracotta text-white text-xs rounded-full">
                          B端定制
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-charcoal/50 mb-2">{product.subcategory}</p>
                      <h3 className="font-medium text-charcoal group-hover:text-terracotta transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-charcoal/60 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-terracotta font-medium">{product.price}</span>
                        <span className="text-xs text-charcoal/50">{product.material}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-3xl bg-warm-white max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className="aspect-square rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProduct.image})` }}
                />
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-terracotta mb-2">{selectedProduct.subcategory}</p>
                    <h2 className="text-2xl font-display text-charcoal mb-4">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-charcoal/70 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-mist">
                      <span className="text-charcoal/60">材质</span>
                      <span className="text-charcoal">{selectedProduct.material}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-mist">
                      <span className="text-charcoal/60">价格</span>
                      <span className="text-terracotta font-medium">{selectedProduct.price}</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {selectedProduct.isB2B ? (
                      <Button
                        onClick={() => {
                          setSelectedProduct(null);
                          setIsQuoteDialogOpen(true);
                        }}
                        className="flex-1 bg-terracotta hover:bg-terracotta/90 text-white"
                      >
                        获取报价
                      </Button>
                    ) : (
                      <>
                        <Button className="flex-1 bg-terracotta hover:bg-terracotta/90 text-white">
                          立即购买
                        </Button>
                        <Button variant="outline" className="flex-1">
                          加入购物车
                        </Button>
                      </>
                    )}
                  </div>

                  {selectedProduct.isB2B && (
                    <div className="bg-oak/20 rounded-lg p-4">
                      <h4 className="font-medium text-charcoal mb-2">项目案例参考</h4>
                      <p className="text-sm text-charcoal/60 mb-3">
                        该灯具已在多个高端项目中应用
                      </p>
                      <Link
                        to="/gallery"
                        className="inline-flex items-center text-terracotta text-sm"
                      >
                        查看案例 <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-warm-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-charcoal">
              获取报价
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">公司名称</Label>
                <Input id="company" placeholder="您的公司" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">联系人</Label>
                <Input id="contact" placeholder="您的姓名" className="bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">电话</Label>
                <Input id="phone" placeholder="联系电话" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="bg-white" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">项目类型</Label>
              <Input id="project" placeholder="如：酒店大堂、餐厅等" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">预估数量</Label>
              <Input id="quantity" placeholder="如：10盏" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">详细需求</Label>
              <Textarea
                id="requirements"
                placeholder="请描述您的项目需求、尺寸要求、色温偏好等..."
                className="bg-white min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
              onClick={(e) => {
                e.preventDefault();
                setIsQuoteDialogOpen(false);
              }}
            >
              提交询价
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <FooterSection />
    </main>
  );
};

export default ProductsPage;
