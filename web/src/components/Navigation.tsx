import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/products', label: '产品橱窗' },
    { path: '/gallery', label: '光影画廊' },
    { path: '/about', label: '关于我们' },
    { path: '/contact', label: '展厅与联系' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-warm-white/90 backdrop-blur-md shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center">
                <span className="text-white font-display text-lg">爱</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-display text-lg leading-tight transition-colors ${
                  isScrolled ? 'text-charcoal' : 'text-charcoal'
                }`}>
                  爱达无界
                </span>
                <span className={`text-xs tracking-wider transition-colors ${
                  isScrolled ? 'text-charcoal/60' : 'text-charcoal/60'
                }`}>
                  Love Without Borders
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link text-sm tracking-wide ${
                    isActive(link.path)
                      ? 'text-terracotta'
                      : isScrolled
                      ? 'text-charcoal'
                      : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-warm-white pt-24 md:hidden"
          >
            <div className="flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-display ${
                    isActive(link.path) ? 'text-terracotta' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
