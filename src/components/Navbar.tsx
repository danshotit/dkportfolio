
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Download, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple py-4 md:py-5 px-4 md:px-8',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-subtle' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-bold text-xl md:text-2xl tracking-tight transition-all duration-300">
          <span className="text-primary">Daniel</span>Kinuthia
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="link-subtle text-sm tracking-wide py-2 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md hover:bg-primary/90"
          >
            <Download size={16} />
            Resume
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-[60px] bg-background/95 backdrop-blur-md border-b border-border transition-all duration-500 ease-apple overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen py-6' : 'max-h-0 py-0 border-none'
        )}
      >
        <div className="flex flex-col space-y-4 px-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="link-subtle py-2 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-medium w-full mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
