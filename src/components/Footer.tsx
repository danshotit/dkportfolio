
import { useAnimateOnScroll } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const [isVisible, ref] = useAnimateOnScroll(0.1);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div 
            className={cn(
              "mb-6 md:mb-0 opacity-0",
              isVisible && "animate-fade-in"
            )}
          >
            <div className="font-bold text-xl tracking-tight mb-2">
              <span className="text-primary">Daniel</span>Kinuthia
            </div>
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          {/* Quick links */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-8 md:gap-16 opacity-0",
              isVisible && "animate-fade-in animate-delay-100"
            )}
          >
            <div>
              <h4 className="text-sm font-semibold uppercase mb-3">Navigation</h4>
              <ul className="space-y-2">
                {['About', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase mb-3">Connect</h4>
              <ul className="space-y-2">
                {['GitHub', 'LinkedIn', 'Twitter'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex justify-center mt-12">
          <a
            href="#hero"
            className={cn(
              "p-3 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-all duration-300 opacity-0",
              isVisible && "animate-fade-in animate-delay-200"
            )}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
