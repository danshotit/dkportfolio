
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Background3D from './Background3D';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Create the binary code particles effect
  useEffect(() => {
    // Create binary particles
    const createBinaryParticles = () => {
      const particleCount = 20; // Increased for better coverage
      const container = document.getElementById('binary-container');
      
      if (container) {
        // Clear existing particles
        container.innerHTML = '';
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'binary-particle';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`; // Added explicit top positioning
          particle.style.setProperty('--x-direction', `${(Math.random() * 200) - 100}px`);
          particle.style.animationDelay = `${Math.random() * 30}s`;
          particle.textContent = '01001100 01101111 01110110 01100101';
          container.appendChild(particle);
        }
      }
    };

    // Create keyboard worker images throughout the page
    const createFloatingKeyboards = () => {
      const keyboardCount = 5; // Increased for better coverage
      const container = document.getElementById('keyboard-container');
      
      if (container) {
        // Clear existing elements
        container.innerHTML = '';
        
        for (let i = 0; i < keyboardCount; i++) {
          const keyboard = document.createElement('div');
          keyboard.className = 'floating-keyboard';
          keyboard.style.width = `${150 + Math.random() * 200}px`;
          keyboard.style.height = `${150 + Math.random() * 200}px`;
          keyboard.style.left = `${Math.random() * 100}%`;
          keyboard.style.top = `${Math.random() * 100}%`;
          keyboard.style.backgroundImage = "url('/keyboard-worker.jpg')";
          keyboard.style.backgroundSize = 'contain';
          keyboard.style.backgroundPosition = 'center';
          keyboard.style.backgroundRepeat = 'no-repeat';
          keyboard.style.opacity = '0.1'; // Slightly increased opacity
          keyboard.style.animationDelay = `${Math.random() * 5}s`;
          container.appendChild(keyboard);
        }
      }
    };

    createBinaryParticles();
    createFloatingKeyboards();

    // Clean up
    return () => {
      const binaryContainer = document.getElementById('binary-container');
      const keyboardContainer = document.getElementById('keyboard-container');
      if (binaryContainer) binaryContainer.innerHTML = '';
      if (keyboardContainer) keyboardContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 3D Background Component */}
      <Background3D />
      
      {/* Static background overlays for graceful degradation */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-10]" 
        style={{ backgroundImage: "url('/keyboard-worker.jpg')", opacity: "0.05" }}
      />
      
      {/* Cheetah pattern overlay with reduced opacity */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-blend-overlay z-[-9]" 
        style={{ backgroundImage: "url('/cheetah-background.jpg')", opacity: "0.05" }}
      />
      
      {/* Container for binary code particles */}
      <div id="binary-container" className="fixed inset-0 pointer-events-none z-[-2]" />
      
      {/* Container for floating keyboard workers */}
      <div id="keyboard-container" className="fixed inset-0 pointer-events-none z-[-3]" />
      
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
