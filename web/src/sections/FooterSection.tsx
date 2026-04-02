import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const FooterSection = () => {
  const socialLinks = [
    { name: '小红书', icon: 'xiaohongshu' },
    { name: '抖音', icon: 'douyin' },
    { name: '京东', icon: 'jd' },
    { name: '淘宝', icon: 'taobao' },
    { name: '微信', icon: 'wechat' },
  ];

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center">
                <span className="text-white font-display text-lg">爱</span>
              </div>
              <div>
                <h3 className="font-display text-xl">爱达无界</h3>
                <p className="text-white/60 text-sm">Love Without Borders</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              从自然中汲取灵感，用温暖的光影重塑生活空间。
              我们相信，光没有边界，它可以跨越空间、风格与文化，连接人与世界。
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin size={18} className="text-terracotta" />
                <span className="text-sm">东莞市麻涌镇联东U谷一栋13楼</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone size={18} className="text-terracotta" />
                <span className="text-sm">177-2799-0719</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Mail size={18} className="text-terracotta" />
                <span className="text-sm">3382538816@qq.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-6">快速链接</h4>
            <ul className="space-y-3">
              {['首页', '产品橱窗', '光影画廊', '关于我们', '展厅与联系'].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item === '首页' ? '' : item.toLowerCase().replace(/\s/g, '-')}`}
                    className="text-white/70 hover:text-terracotta transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-medium text-white mb-6">关注我们</h4>
            <p className="text-white/60 text-sm mb-4">在更多平台，与光同行</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-terracotta flex items-center justify-center transition-colors"
                  title={social.name}
                >
                  <span className="text-xs">{social.name.charAt(0)}</span>
                </motion.button>
              ))}
            </div>
            
            {/* WeChat QR Code Placeholder */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg inline-block">
              <div className="w-24 h-24 bg-white/10 rounded flex items-center justify-center">
                <span className="text-white/40 text-xs text-center">
                  微信<br/>二维码
                </span>
              </div>
              <p className="text-white/60 text-xs mt-2 text-center">扫码关注服务号</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm">
              ©2025 爱达无界 东莞市爱达无界电器有限公司 版权所有
            </p>
            <div className="flex space-x-6 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">使用条款</a>
              <a href="#" className="hover:text-white transition-colors">网站地图</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
