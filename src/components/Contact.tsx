import { useState, useEffect } from 'react';
import { useAnimateOnScroll } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Send, Linkedin, Github, Camera, Video, Code, Image, Cloud, Headphones } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [isVisible, ref] = useAnimateOnScroll(0.1);
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitting: false,
  });
  const [emailJsInitialized, setEmailJsInitialized] = useState(false);

  useEffect(() => {
    const emailJsUserId = 'YOUR_EMAILJS_USER_ID';
    
    if (emailJsUserId !== 'YOUR_EMAILJS_USER_ID') {
      emailjs.init(emailJsUserId);
      setEmailJsInitialized(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, submitting: true }));

    try {
      if (!emailJsInitialized) {
        throw new Error('EmailJS is not properly initialized');
      }

      const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
      const serviceId = 'YOUR_EMAILJS_SERVICE_ID';

      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
        to_name: 'Daniel Kinuthia',
      };

      const response = await emailjs.send(serviceId, templateId, templateParams);
      
      if (response.status === 200) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        
        setFormState({
          name: '',
          email: '',
          message: '',
          submitting: false,
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Sending Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      setFormState(prev => ({ ...prev, submitting: false }));
    }
  };

  const specialties = [
    { name: 'React Development', icon: <Code size={20} /> },
    { name: 'Cloud Architecture', icon: <Cloud size={20} /> },
    { name: 'Video Editing', icon: <Video size={20} /> },
    { name: 'Graphic/3D Design', icon: <Image size={20} /> },
    { name: 'Photography', icon: <Camera size={20} /> },
    { name: 'Music Composition', icon: <Headphones size={20} /> },
  ];

  return (
    <section id="contact" className="section bg-gradient-to-br from-brand-black to-black">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <span 
          className={cn(
            "inline-block px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-medium mb-6 opacity-0",
            isVisible && "animate-fade-in"
          )}
        >
          Get In Touch
        </span>
        
        <h2 
          className={cn(
            "section-title max-w-xl text-gradient-masculine opacity-0",
            isVisible && "animate-fade-in animate-delay-100"
          )}
        >
          Let's work together on your next project
        </h2>
        
        <p 
          className={cn(
            "section-subtitle mb-12 opacity-0",
            isVisible && "animate-fade-in animate-delay-200"
          )}
        >
          I'm currently available for freelance work or full-time opportunities. 
          If you're interested in working together, feel free to reach out.
        </p>

        <div 
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-16 opacity-0",
            isVisible && "animate-fade-in animate-delay-250"
          )}
        >
          {specialties.map((specialty, index) => (
            <div 
              key={specialty.name}
              className={cn(
                "bg-brand-black border border-brand-orange/20 text-white px-4 py-3 rounded-full flex items-center gap-2 transition-all hover:bg-brand-orange/10",
                isVisible && `animate-fade-in animate-delay-${(index + 3) * 50}`
              )}
            >
              <span className="text-brand-orange">{specialty.icon}</span>
              <span className="font-medium">{specialty.name}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <div 
            className={cn(
              "md:col-span-2 opacity-0",
              isVisible && "animate-fade-in animate-delay-300"
            )}
          >
            <div className="bg-brand-black/80 backdrop-blur-sm rounded-2xl p-8 shadow-card border border-white/10 h-full">
              <h3 className="text-xl font-semibold mb-6 text-gradient-masculine">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Email</h4>
                    <a href="mailto:daniel.kinuthia@example.com" className="text-white/70 hover:text-brand-orange transition-colors">
                      daniel.kinuthia@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Location</h4>
                    <p className="text-white/70">
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-base font-semibold mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-3 bg-brand-orange/10 rounded-full hover:bg-brand-orange/20 text-brand-orange transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-brand-orange/10 rounded-full hover:bg-brand-orange/20 text-brand-orange transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-brand-orange/10 rounded-full hover:bg-brand-orange/20 text-brand-orange transition-colors"
                    aria-label="Camera"
                  >
                    <Camera size={20} />
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-base font-semibold mb-4 text-gradient-masculine">Why Work With Me?</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm">●</span>
                    <span>Attention to detail and pixel-perfect designs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm">●</span>
                    <span>Creative problem-solving approach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-orange text-sm">●</span>
                    <span>Clear communication and timely delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div 
            className={cn(
              "md:col-span-3 opacity-0",
              isVisible && "animate-fade-in animate-delay-400"
            )}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-brand-black/80 backdrop-blur-sm rounded-2xl p-8 shadow-card border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-6 text-gradient-masculine">Send a Message</h3>
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:outline-none transition-all placeholder:text-white/30"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:outline-none transition-all placeholder:text-white/30"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange focus:outline-none transition-all resize-none placeholder:text-white/30"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={formState.submitting || !emailJsInitialized}
                  className="w-full sm:w-auto bg-brand-orange text-white rounded-full px-8 py-3 font-medium transition-all duration-300 hover:shadow-md hover:bg-brand-orange/90 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState.submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
