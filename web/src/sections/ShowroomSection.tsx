import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ShowroomSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section
      id="showroom"
      ref={sectionRef}
      className="relative py-24 min-h-[80vh] flex items-center"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/images/showroom.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 section-padding w-full">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-warm-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-warm"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-12 h-px bg-terracotta" />
                <span className="text-terracotta text-sm tracking-widest uppercase">
                  展厅邀约
                </span>
                <div className="w-12 h-px bg-terracotta" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
                光影无界，亲临即见
              </h2>
              <p className="text-charcoal/70">
                欢迎莅临我们的光影体验空间，触摸光的温度
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-terracotta" size={24} />
                </div>
                <h3 className="font-medium text-charcoal mb-2">地址</h3>
                <p className="text-sm text-charcoal/70">
                  东莞市麻涌镇<br />
                  联东U谷一栋13楼
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-terracotta" size={24} />
                </div>
                <h3 className="font-medium text-charcoal mb-2">营业时间</h3>
                <p className="text-sm text-charcoal/70">
                  周一至周日<br />
                  10:00 - 18:00
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-terracotta" size={24} />
                </div>
                <h3 className="font-medium text-charcoal mb-2">预约专线</h3>
                <p className="text-sm text-charcoal/70">
                  177-2799-0719<br />
                  <span className="text-xs">(B端合作请注明)</span>
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center"
            >
              <button
                onClick={() => setIsDialogOpen(true)}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Calendar size={18} />
                <span>立即预约</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Appointment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-warm-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-charcoal">
              预约参观
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input id="name" placeholder="您的姓名" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">电话</Label>
                <Input id="phone" placeholder="联系电话" className="bg-white" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" type="email" placeholder="your@email.com" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label>需求类型</Label>
              <RadioGroup defaultValue="c2c" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="c2c" id="c2c" />
                  <Label htmlFor="c2c" className="cursor-pointer">C端零售</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2b" id="b2b" />
                  <Label htmlFor="b2b" className="cursor-pointer">B端合作</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">留言</Label>
              <Textarea
                id="message"
                placeholder="请描述您的需求或预约时间..."
                className="bg-white min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
              onClick={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
              }}
            >
              提交预约
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ShowroomSection;
