
import { useAnimateOnScroll } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Award, Book, Briefcase } from 'lucide-react';

const About = () => {
  const [isVisible, ref] = useAnimateOnScroll(0.1);

  const skills = [
    { name: 'React Development', level: 90 },
    { name: 'Cloud Architecture', level: 85 },
    { name: 'Video Editing', level: 82 },
    { name: 'Graphic/3D Design', level: 78 },
    { name: 'Photography', level: 75 },
    { name: 'Music Composition', level: 80 },
  ];

  return (
    <section id="about" className="section bg-brand-black/50">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column - About me text */}
          <div>
            <span 
              className={cn(
                "inline-block px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-medium mb-6 opacity-0",
                isVisible && "animate-fade-in"
              )}
            >
              About Me
            </span>
            
            <h2 
              className={cn(
                "mb-6 opacity-0 text-gradient-masculine",
                isVisible && "animate-fade-in animate-delay-100"
              )}
            >
              A passionate developer dedicated to crafting <span className="italic-accent">elegant solutions</span>
            </h2>
            
            <p 
              className={cn(
                "mb-6 text-white/70 opacity-0",
                isVisible && "animate-fade-in animate-delay-200"
              )}
            >
              I hold a degree in Computer Science from <span className="italic-accent">Nairobi University</span>, where I developed a strong foundation in computer science and software engineering principles.
            </p>
            
            <p 
              className={cn(
                "mb-8 text-white/70 opacity-0",
                isVisible && "animate-fade-in animate-delay-300"
              )}
            >
              With a focus on creating intuitive and responsive web applications, I combine technical expertise with an eye for design to deliver exceptional user experiences.
            </p>

            {/* Education and Experience */}
            <div 
              className={cn(
                "space-y-6 opacity-0",
                isVisible && "animate-fade-in animate-delay-400"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Book size={20} />
                </div>
                <div>
                  <h4 className="text-base font-medium">Educational Background</h4>
                  <p className="text-muted-foreground text-sm">
                    Computer Science, Nairobi University
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="text-base font-medium">Professional Experience</h4>
                  <p className="text-muted-foreground text-sm">
                    Front-end Developer at TechInnovate
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-base font-medium">Interests</h4>
                  <p className="text-muted-foreground text-sm">
                    Web Development, Tech Innovations, Media Creation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Skills */}
          <div 
            className={cn(
              "bg-brand-black/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/10 opacity-0",
              isVisible && "animate-fade-in animate-delay-200"
            )}
          >
            <h3 className="text-xl font-semibold mb-6 text-white">Technical Skills</h3>
            
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div 
                  key={skill.name}
                  className={cn(
                    "opacity-0",
                    isVisible && `animate-fade-in animate-delay-${(i + 3) * 100 % 500}`
                  )}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-brand-orange font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full bg-brand-orange origin-left transform scale-x-0 transition-transform duration-1000 ease-apple",
                        isVisible && "scale-x-100"
                      )} 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div 
              className={cn(
                "mt-8 pt-6 border-t border-white/10 opacity-0",
                isVisible && "animate-fade-in animate-delay-400"
              )}
            >
              <h3 className="text-base font-semibold mb-4 text-white">What I enjoy working with</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Cloud Architecture', 'Video Editing', 'Graphic Design', '3D Design', 'Photography', 'Music Composition'].map((item) => (
                  <span 
                    key={item}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
