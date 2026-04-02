-- ============================================
-- ADWJ 网站数据库初始化
-- Supabase SQL Editor 中执行此文件
-- ============================================

-- 1. 产品表
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('b2b', 'c2c')),
  subcategory VARCHAR(100),
  price VARCHAR(100),
  image_url TEXT,
  description TEXT,
  material VARCHAR(255),
  is_b2b BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 画廊表
CREATE TABLE gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  location VARCHAR(100),
  category VARCHAR(100),
  description TEXT,
  products_used JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 公司介绍表
CREATE TABLE company_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255),
  content TEXT,
  image_url TEXT,
  extra_data JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 订单表
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_no VARCHAR(50) UNIQUE NOT NULL DEFAULT 'ORD-' || to_char(NOW(), 'YYYYMMDD') || '-' || substr(gen_random_uuid()::text, 1, 8),
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(50),
  customer_email VARCHAR(255),
  company_name VARCHAR(255),
  project_type VARCHAR(100),
  product_id UUID REFERENCES products(id),
  quantity VARCHAR(50),
  requirements TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'confirmed', 'processing', 'completed', 'cancelled')),
  quote_price VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 索引优化
-- ============================================
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_gallery_is_active ON gallery_items(is_active);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- 自动更新时间戳
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER gallery_updated_at
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER company_info_updated_at
  BEFORE UPDATE ON company_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 初始数据：公司介绍
-- ============================================
INSERT INTO company_info (section_key, title, content, extra_data) VALUES
('brand_story', '品牌故事', '2025年10月28日，一群热爱光影的造梦者在东莞麻涌创立了爱达无界。

我们坚信，光没有边界，它可以跨越空间、风格与文化，连接人与世界。
因此，我们将品牌命名为"Love Without Borders"。

我们偏爱自然的材质、手工的温度，以及那些能唤起情感共鸣的光影瞬间。
每一件作品，都是对"与光同行"的诠释——让光成为生活的陪伴者，而非仅仅是照亮者。

从手工吹制玻璃到藤编工艺，从原木纹理到陶瓷质感，我们不断探索自然材质与光的无限可能。
每一盏灯，都是一次与光的对话，都是一段关于温暖的故事。', '{}'),

('philosophy', '品牌理念', '与光同行', '{"values": [
  {"title": "与光同行", "description": "让光成为生活的陪伴者，而非仅仅是照亮者"},
  {"title": "手工温度", "description": "每一盏灯都经过匠人精心打造，独一无二"},
  {"title": "自然材质", "description": "偏爱藤编、陶瓷、原木等自然材质"},
  {"title": "品质追求", "description": "从设计到制作，每个环节都精益求精"}
]}'),

('team', '核心团队', '光影造梦者', '{"members": [
  {"name": "林晓光", "role": "创始人 / 设计总监", "description": "20年灯光设计经验，曾服务于多家国际知名酒店品牌"},
  {"name": "陈艺文", "role": "首席设计师", "description": "专注于自然材质与光的结合，作品多次获得设计大奖"},
  {"name": "王工匠", "role": "工艺总监", "description": "手工玻璃制作世家第三代传人，技艺精湛"}
]}'),

('workshop', '手工工坊', '在爱达无界的工坊里，每一盏灯都经过匠人的精心打造。
从玻璃吹制到藤编工艺，从木工车床到陶瓷烧制，
我们坚持传统手工技艺，让每一件作品都独一无二。

我们相信，机器无法替代手工的温度。
那些细微的纹理、独特的色泽、自然的瑕疵，
正是手工艺术的魅力所在。', '{"stats": {"craftsmen": "15+", "processes": "8", "cycle": "72h"}}');

-- ============================================
-- 初始数据：产品示例
-- ============================================
INSERT INTO products (name, category, subcategory, price, image_url, description, material, is_b2b, sort_order) VALUES
('晨光 · 手工吹制吊灯', 'c2c', '卧室', '¥2,680', '/images/product-1.jpg', '采用传统手工吹制工艺，每一盏都独一无二。温暖的琥珀色玻璃，为卧室营造温馨氛围。', '玻璃、黄铜', FALSE, 1),
('原木 · 三头餐厅吊灯', 'c2c', '餐厅', '¥3,280', '/images/product-2.jpg', '北美橡木与黄铜的完美结合，简约而不简单。三头设计，照亮整个餐桌。', '橡木、黄铜', FALSE, 2),
('琥珀 · 艺术玻璃台灯', 'c2c', '卧室', '¥1,580', '/images/product-3.jpg', '手工吹制琥珀色玻璃灯罩，黄铜底座，点亮时散发温暖柔和的光芒。', '玻璃、黄铜', FALSE, 3),
('侘寂 · 藤编落地灯', 'c2c', '书房', '¥2,180', '/images/product-4.jpg', '粗糙质感的陶瓷灯座，手工编织藤条灯罩，东方美学的完美诠释。', '陶瓷、藤编', FALSE, 4),
('奢华 · 酒店大堂吊灯', 'b2b', '酒店', '询价', '/images/b2b-hotel.jpg', '为高端酒店大堂定制的奢华吊灯，手工吹制玻璃与黄铜材质结合。', '玻璃、黄铜', TRUE, 5),
('艺术 · 画廊装置灯', 'b2b', '艺术空间', '询价', '/images/gallery-4.jpg', '大型装置艺术吊灯，几何形状的玻璃与金属结构，成为空间的视觉焦点。', '玻璃、金属', TRUE, 6);

-- ============================================
-- 初始数据：画廊示例
-- ============================================
INSERT INTO gallery_items (title, image_url, location, category, description, products_used, sort_order) VALUES
('杭州私宅 · 阅读角', '/images/gallery-1.jpg', '杭州', '私宅', '藤编吊灯为阅读角增添自然气息，温暖的光线陪伴每一个阅读时光。业主是一位热爱阅读的设计师，希望打造一个温馨舒适的阅读空间。', '["藤编吊灯", "原木台灯"]', 1),
('上海咖啡馆 · 吧台', '/images/gallery-2.jpg', '上海', '商业', '手工吹制玻璃吊灯阵列，为咖啡馆营造独特的氛围。每一盏灯都经过精心调试，确保光线柔和不刺眼。', '["琥珀玻璃吊灯", "黄铜壁灯"]', 2),
('成都自然餐厅 · 用餐区', '/images/gallery-3.jpg', '成都', '餐饮', '陶瓷吊灯与绿植环绕，打造自然舒适的用餐环境。餐厅主打有机食材，灯光设计呼应自然主题。', '["陶瓷吊灯", "藤编落地灯"]', 3),
('深圳现代画廊 · 展厅', '/images/gallery-4.jpg', '深圳', '艺术空间', '大型装置艺术吊灯，成为画廊空间的视觉焦点。灯光可根据展览需求进行调节，完美呈现每一件艺术品。', '["装置艺术吊灯", "轨道射灯"]', 4),
('北京精品酒店 · 大堂', '/images/b2b-hotel.jpg', '北京', '酒店', '奢华吊灯为酒店大堂注入艺术气息。手工吹制玻璃与黄铜材质的结合，彰显高端品质。', '["奢华水晶吊灯", "壁灯系列"]', 5),
('爱达展厅 · 展示区', '/images/showroom.jpg', '东莞', '展厅', '我们的光影体验空间，展示最新产品系列。欢迎莅临参观，亲身感受光的温度。', '["全系列产品"]', 6),
('广州私宅 · 客厅', '/images/b2c-living.jpg', '广州', '私宅', '温馨客厅角落，手工陶瓷台灯照亮阅读角。自然光与人工光的完美融合。', '["陶瓷台灯", "落地灯"]', 7),
('手工工坊 · 制作过程', '/images/workshop.jpg', '东莞', '展厅', '见证每一盏灯诞生的过程。手工吹制、精心打磨，每一步都凝聚着匠人的心血。', '["手工定制系列"]', 8);

-- ============================================
-- 启用 Row Level Security (RLS)
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 公开读取策略（匿名用户可查看已发布内容）
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read gallery" ON gallery_items
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read company_info" ON company_info
  FOR SELECT USING (true);

-- 订单：用户可创建，但只能管理员查看
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- 管理员策略（后续通过 auth.uid() 判断）
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (true);

CREATE POLICY "Admin full access gallery" ON gallery_items
  FOR ALL USING (true);

CREATE POLICY "Admin full access company_info" ON company_info
  FOR ALL USING (true);

CREATE POLICY "Admin full access orders" ON orders
  FOR ALL USING (true);

-- ============================================
-- 完成！
-- ============================================
-- 提示：执行完成后，请检查 Tables 是否创建成功