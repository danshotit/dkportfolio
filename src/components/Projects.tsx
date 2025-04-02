
import { useState } from 'react';
import { useAnimateOnScroll } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Star } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
};

const Projects = () => {
  const [isVisible, ref] = useAnimateOnScroll(0.1);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Project 1',
      description: 'A brief description of your project. Explain what technologies you used and what problem it solves.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80',
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Another brief description of your project. Highlight the key features and the technical challenges you overcame.',
      tags: ['TypeScript', 'Next.js', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Your third project description goes here. Explain the architecture and technology choices you made.',
      tags: ['React', 'GraphQL', 'Styled Components'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80',
      demoUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <span 
          className={cn(
            "inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 opacity-0",
            isVisible && "animate-fade-in"
          )}
        >
          My Work
        </span>
        
        <h2 
          className={cn(
            "section-title opacity-0",
            isVisible && "animate-fade-in animate-delay-100"
          )}
        >
          Featured Projects
        </h2>
        
        <p 
          className={cn(
            "section-subtitle opacity-0",
            isVisible && "animate-fade-in animate-delay-200"
          )}
        >
          Here's a selection of my recent work, showcasing my skills in web development, 
          UI/UX design, and problem-solving.
        </p>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-xl bg-white border border-border shadow-card hover:shadow-card-hover transition-all duration-500 ease-apple opacity-0",
                isVisible && `animate-fade-in animate-delay-${(i + 3) * 100 % 500}`
              )}
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Project image with overlay */}
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 transition-opacity duration-300" />
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  <Star size={12} className="fill-current" />
                  Featured
                </div>
              )}

              {/* Project info */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2 transition-transform duration-300 ease-apple translate-y-0 group-hover:translate-y-0">
                  {project.title}
                </h3>
                
                <p className="text-white/90 text-sm line-clamp-2 mb-3 opacity-0 transform translate-y-4 transition-all duration-300 ease-apple group-hover:opacity-100 group-hover:translate-y-0">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 transform translate-y-4 transition-all duration-300 ease-apple delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-3 opacity-0 transform translate-y-4 transition-all duration-300 ease-apple delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                  <a 
                    href={project.demoUrl} 
                    className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-white/90 transition-colors"
                  >
                    Live Demo
                    <ArrowUpRight size={14} />
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
