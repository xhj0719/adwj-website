import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FooterSection from '@/sections/FooterSection';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: '展厅地址',
      content: '东莞市麻涌镇联东U谷一栋13楼',
    },
    {
      icon: Clock,
      title: '营业时间',
      content: '周一至周日 10:00 - 18:00',
    },
    {
      icon: Phone,
      title: '预约专线',
      content: '177-2799-0719',
      note: 'B端合作请注明',
    },
    {
      icon: Mail,
      title: '商务合作',
      content: '3382538816@qq.com',
    },
  ];

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
                展厅与联系
              </span>
              <div className="w-12 h-px bg-terracotta" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-4">
              光影无界，亲临即见
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              欢迎莅临我们的光影体验空间，触摸光的温度
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding py-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display text-charcoal mb-8">
              联系方式
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-soft"
                >
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                    <item.icon className="text-terracotta" size={20} />
                  </div>
                  <h3 className="font-medium text-charcoal mb-2">{item.title}</h3>
                  <p className="text-charcoal/70 text-sm">{item.content}</p>
                  {item.note && (
                    <p className="text-charcoal/50 text-xs mt-1">{item.note}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="font-medium text-charcoal mb-4">展厅位置</h3>
              <div className="aspect-video bg-oak/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-terracotta mx-auto mb-2" size={32} />
                  <p className="text-charcoal/60 text-sm">东莞市麻涌镇联东U谷</p>
                  <p className="text-charcoal/40 text-xs mt-1">一栋13楼</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-charcoal font-medium">爱达无界光影体验空间</p>
                  <p className="text-charcoal/60 text-sm">联东U谷一栋13楼</p>
                </div>
                <a
                  href="https://map.baidu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-terracotta text-white text-sm rounded-full hover:bg-terracotta/90 transition-colors"
                >
                  查看地图
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl p-8 shadow-soft">
              <Tabs defaultValue="appointment" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="appointment">预约参观</TabsTrigger>
                  <TabsTrigger value="contact">快速咨询</TabsTrigger>
                </TabsList>

                <TabsContent value="appointment">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">姓名 *</Label>
                        <Input id="name" placeholder="您的姓名" required className="bg-warm-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">电话 *</Label>
                        <Input id="phone" placeholder="联系电话" required className="bg-warm-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="bg-warm-white" />
                    </div>

                    <div className="space-y-2">
                      <Label>需求类型</Label>
                      <RadioGroup defaultValue="c2c" className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="c2c" id="c2c-appointment" />
                          <Label htmlFor="c2c-appointment" className="cursor-pointer">C端零售</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="b2b" id="b2b-appointment" />
                          <Label htmlFor="b2b-appointment" className="cursor-pointer">B端合作</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">预约日期</Label>
                      <Input id="date" type="date" className="bg-warm-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">留言</Label>
                      <Textarea
                        id="message"
                        placeholder="请描述您的需求或感兴趣的产品..."
                        className="bg-warm-white min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
                    >
                      <Send size={18} className="mr-2" />
                      提交预约
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="contact">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">姓名 *</Label>
                        <Input id="contact-name" placeholder="您的姓名" required className="bg-warm-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">电话 *</Label>
                        <Input id="contact-phone" placeholder="联系电话" required className="bg-warm-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email">邮箱</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" className="bg-warm-white" />
                    </div>

                    <div className="space-y-2">
                      <Label>咨询类型</Label>
                      <RadioGroup defaultValue="product" className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="product" id="product" />
                          <Label htmlFor="product" className="cursor-pointer">产品咨询</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label htmlFor="custom" className="cursor-pointer">定制服务</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cooperation" id="cooperation" />
                          <Label htmlFor="cooperation" className="cursor-pointer">商务合作</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="cursor-pointer">其他</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">咨询内容 *</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="请详细描述您的咨询内容..."
                        required
                        className="bg-warm-white min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      发送咨询
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-sage/20 rounded-lg text-center"
                >
                  <p className="text-sage font-medium">提交成功！我们会尽快与您联系。</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-padding pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-display text-charcoal mb-4">
            在更多平台，与光同行
          </h2>
          <p className="text-charcoal/60 mb-8">
            关注我们的社交媒体，获取最新产品资讯和光影灵感
          </p>
          <div className="flex justify-center gap-4">
            {['小红书', '抖音', '京东', '淘宝', '微信'].map((platform) => (
              <motion.button
                key={platform}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white rounded-full shadow-soft hover:shadow-warm text-charcoal hover:text-terracotta transition-colors"
              >
                {platform}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <FooterSection />
    </main>
  );
};

export default ContactPage;
