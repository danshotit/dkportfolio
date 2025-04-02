
import { useAnimateOnScroll } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Code, Camera, Video, Image, Cloud, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, ref] = useAnimateOnScroll(0.1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { name: 'React Development', icon: <Code className="w-5 h-5" /> },
    { name: 'Cloud Architecture', icon: <Cloud className="w-5 h-5" /> },
    { name: 'Video Editing', icon: <Video className="w-5 h-5" /> },
    { name: 'Graphic/3D Design', icon: <Image className="w-5 h-5" /> },
    { name: 'Photography', icon: <Camera className="w-5 h-5" /> },
    { name: 'Music Composition', icon: <Headphones className="w-5 h-5" /> }
  ];

  return (
    <section
      id="hero"
      className="min-h-[100vh] flex items-center justify-center relative overflow-hidden pt-32 pb-40 px-8 md:pt-24 md:pb-44"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Removed specific background code since it's now global */}
      
      {/* Interactive particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Moving particles that follow cursor */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-brand-orange/30 animate-pulse-subtle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              transform: isHovering ? `translate(${(mousePosition.x - 0.5) * i * 15}px, ${(mousePosition.y - 0.5) * i * 15}px)` : 'none',
              transition: 'transform 0.5s ease-out',
            }}
          />
        ))}
        
        {/* Orange tech glow effects */}
        <div 
          className="absolute bottom-20 right-40 w-[300px] h-[300px] bg-brand-orange/20 rounded-full blur-3xl opacity-50 transition-all duration-700"
          style={{ 
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <div 
          className="absolute top-40 left-40 w-[200px] h-[200px] bg-brand-orange/15 rounded-full blur-2xl opacity-40 transition-all duration-700" 
          style={{ 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Creative element: Floating binary code suggestion */}
          <div className="absolute opacity-10 top-0 left-0 text-[10px] font-mono text-brand-orange whitespace-nowrap overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-marquee" style={{ animationDuration: `${20 + i * 5}s` }}>
                01001100 01101111 01110110 01100101 00100000 01000011 01101111 01100100 01101001 01101110 01100111 00100001
              </div>
            ))}
          </div>

          {/* Pre-title */}
          <div 
            ref={ref}
            className={cn(
              "inline-block mb-6 opacity-0",
              isVisible && "animate-fade-in"
            )}
          >
            <span className="bg-brand-orange/10 text-brand-orange px-5 py-2.5 rounded-full text-sm md:text-base font-medium tracking-wider">
              Creative Professional
            </span>
          </div>

          {/* Main title */}
          <h1 
            className={cn(
              "mb-8 opacity-0 text-gradient-masculine leading-tight",
              isVisible && "animate-fade-in animate-delay-100"
            )}
          >
            Hello, I'm{" "}
            <span className="italic-accent">Daniel Kinuthia</span>
          </h1>

          {/* Subtitle */}
          <p 
            className={cn(
              "text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 md:mb-12 opacity-0 leading-relaxed",
              isVisible && "animate-fade-in animate-delay-200"
            )}
          >
            I craft functional and beautiful experiences with a passion for 
            <span className="italic-accent"> clean, elegant design</span> and 
            cutting-edge technologies.
          </p>

          {/* African-inspired decorative element */}
          <div className={cn(
            "w-24 h-1 bg-brand-orange/70 mx-auto mb-10 opacity-0",
            isVisible && "animate-fade-in animate-delay-250"
          )} />

          {/* Skills showcase */}
          <div 
            className={cn(
              "flex flex-wrap justify-center gap-3.5 mb-10 opacity-0",
              isVisible && "animate-fade-in animate-delay-250"
            )}
          >
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className={cn(
                  "bg-brand-black/70 border border-brand-orange/20 text-white px-4 py-2.5 rounded-full flex items-center gap-2.5 transition-all hover:bg-brand-orange/20 hover:border-brand-orange/40 shadow-lg",
                  isVisible && `animate-fade-in animate-delay-${(index + 3) * 50}`
                )}
              >
                <span className="text-brand-orange">{skill.icon}</span>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-7 opacity-0",
              isVisible && "animate-fade-in animate-delay-300"
            )}
          >
            <a
              href="#projects"
              className="bg-brand-orange text-white rounded-full px-9 py-3.5 font-medium transition-all duration-300 hover:shadow-lg hover:bg-brand-orange/90 w-full sm:w-auto text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border-2 border-white/20 text-white rounded-full px-9 py-3.5 font-medium transition-all duration-300 hover:bg-white/10 w-full sm:w-auto text-center mt-4 sm:mt-0"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* African-inspired decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-brand-orange/30 rounded-tl-3xl opacity-70" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-brand-orange/30 rounded-br-3xl opacity-70" />
    </section>
  );
};

export default Hero;
