import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Users, Award, Heart } from 'lucide-react';
import FooterSection from '@/sections/FooterSection';

const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Heart,
      title: '与光同行',
      description: '让光成为生活的陪伴者，而非仅仅是照亮者',
    },
    {
      icon: Sparkles,
      title: '手工温度',
      description: '每一盏灯都经过匠人精心打造，独一无二',
    },
    {
      icon: Users,
      title: '自然材质',
      description: '偏爱藤编、陶瓷、原木等自然材质',
    },
    {
      icon: Award,
      title: '品质追求',
      description: '从设计到制作，每个环节都精益求精',
    },
  ];

  const team = [
    {
      name: '林晓光',
      role: '创始人 / 设计总监',
      description: '20年灯光设计经验，曾服务于多家国际知名酒店品牌',
    },
    {
      name: '陈艺文',
      role: '首席设计师',
      description: '专注于自然材质与光的结合，作品多次获得设计大奖',
    },
    {
      name: '王工匠',
      role: '工艺总监',
      description: '手工玻璃制作世家第三代传人，技艺精湛',
    },
  ];

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero */}
      <div className="relative h-[60vh] mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/workshop.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-px bg-white/60" />
              <span className="text-white/80 text-sm tracking-widest uppercase">
                关于我们
              </span>
              <div className="w-12 h-px bg-white/60" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-white mb-6">
              光影无界，热爱无限
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              一群热爱光影的造梦者，用温暖的光连接人与世界
            </p>
          </motion.div>
        </div>
      </div>

      {/* Brand Story */}
      <section ref={sectionRef} className="py-24">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-12 h-px bg-terracotta" />
                <span className="text-terracotta text-sm tracking-widest uppercase">
                  品牌故事
                </span>
                <div className="w-12 h-px bg-terracotta" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="prose prose-lg mx-auto text-charcoal/80 leading-relaxed space-y-6"
            >
              <p className="text-xl font-display text-charcoal text-center">
                2025年10月28日，一群热爱光影的造梦者在东莞麻涌创立了爱达无界。
              </p>
              <p>
                我们坚信，光没有边界，它可以跨越空间、风格与文化，连接人与世界。
                因此，我们将品牌命名为"Love Without Borders"。
              </p>
              <p>
                我们偏爱自然的材质、手工的温度，以及那些能唤起情感共鸣的光影瞬间。
                每一件作品，都是对"与光同行"的诠释——让光成为生活的陪伴者，而非仅仅是照亮者。
              </p>
              <p>
                从手工吹制玻璃到藤编工艺，从原木纹理到陶瓷质感，我们不断探索自然材质与光的无限可能。
                每一盏灯，都是一次与光的对话，都是一段关于温暖的故事。
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="font-display text-2xl text-terracotta italic">
                "与光同行"
              </p>
              <p className="text-charcoal/60 text-sm mt-2">
                —— 爱达无界品牌理念
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-oak/20">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-px bg-terracotta" />
              <span className="text-terracotta text-sm tracking-widest uppercase">
                品牌理念
              </span>
              <div className="w-12 h-px bg-terracotta" />
            </div>
            <h2 className="section-title">我们的坚持</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 text-center shadow-soft hover:shadow-warm transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-terracotta" size={28} />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-px bg-terracotta" />
              <span className="text-terracotta text-sm tracking-widest uppercase">
                核心团队
              </span>
              <div className="w-12 h-px bg-terracotta" />
            </div>
            <h2 className="section-title">光影造梦者</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full bg-oak/30 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-display text-3xl text-terracotta">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-xl text-charcoal mb-1">
                  {member.name}
                </h3>
                <p className="text-terracotta text-sm mb-3">{member.role}</p>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="py-24 bg-charcoal text-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-px bg-terracotta" />
                <span className="text-terracotta text-sm tracking-widest uppercase">
                  手工工坊
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display mb-6">
                匠人精神，手工温度
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  在爱达无界的工坊里，每一盏灯都经过匠人的精心打造。
                  从玻璃吹制到藤编工艺，从木工车床到陶瓷烧制，
                  我们坚持传统手工技艺，让每一件作品都独一无二。
                </p>
                <p>
                  我们相信，机器无法替代手工的温度。
                  那些细微的纹理、独特的色泽、自然的瑕疵，
                  正是手工艺术的魅力所在。
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div>
                  <div className="text-3xl font-display text-terracotta">15+</div>
                  <div className="text-white/60 text-sm mt-1">资深工匠</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-terracotta">8</div>
                  <div className="text-white/60 text-sm mt-1">道工艺流程</div>
                </div>
                <div>
                  <div className="text-3xl font-display text-terracotta">72h</div>
                  <div className="text-white/60 text-sm mt-1">平均制作周期</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="aspect-[4/3] rounded-xl overflow-hidden"
                style={{
                  backgroundImage: 'url(/images/workshop.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default AboutPage;
