
import { useState } from 'react';
import { useAnimateOnScroll } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Camera, Video, ExternalLink } from 'lucide-react';

const Photography = () => {
  const [isVisible, ref] = useAnimateOnScroll(0.1);

  return (
    <section id="photography" className="section bg-gradient-to-b from-black/80 to-brand-black/95">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <span 
          className={cn(
            "inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 opacity-0",
            isVisible && "animate-fade-in"
          )}
        >
          Photography & Video
        </span>
        
        <h2 
          className={cn(
            "section-title opacity-0",
            isVisible && "animate-fade-in animate-delay-100"
          )}
        >
          Visual Storytelling
        </h2>
        
        <p 
          className={cn(
            "section-subtitle opacity-0 mb-12",
            isVisible && "animate-fade-in animate-delay-200"
          )}
        >
          Explore my photography portfolio and video compositions that capture moments and tell stories through visual media.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Photography Card */}
          <div 
            className={cn(
              "relative group overflow-hidden rounded-xl bg-black/30 border border-border shadow-card hover:shadow-card-hover transition-all duration-500 ease-apple opacity-0",
              isVisible && "animate-fade-in animate-delay-300"
            )}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
                alt="Photography Portfolio"
                className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 transition-opacity duration-300" />
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Camera size={20} />
                <h3 className="text-xl font-bold text-white">Photography Portfolio</h3>
              </div>
              
              <p className="text-white/90 text-sm mb-6">
                Explore my collection of portrait, landscape, and event photography showcasing my visual storytelling approach.
              </p>
              
              <a 
                href="https://pixieset.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors w-fit"
              >
                View on Pixieset
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          
          {/* Video/Music Card */}
          <div 
            className={cn(
              "relative group overflow-hidden rounded-xl bg-black/30 border border-border shadow-card hover:shadow-card-hover transition-all duration-500 ease-apple opacity-0",
              isVisible && "animate-fade-in animate-delay-400"
            )}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
                alt="Music Compositions"
                className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 transition-opacity duration-300" />
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Video size={20} />
                <h3 className="text-xl font-bold text-white">Music Compositions</h3>
              </div>
              
              <p className="text-white/90 text-sm mb-6">
                Listen to my original music compositions and video productions that complement my visual work.
              </p>
              
              <a 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors w-fit"
              >
                Watch on YouTube
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Photography;
