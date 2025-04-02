
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera with wider field of view for artistic effect
    const camera = new THREE.PerspectiveCamera(
      85, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 6;
    
    // Set up renderer with antialiasing for smoother edges
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Create an artistic abstract shape - torus knot
    const torusKnotGeometry = new THREE.TorusKnotGeometry(3, 0.8, 100, 16);
    const torusKnotMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xF97316,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    scene.add(torusKnot);
    
    // Create multiple particle systems for depth and visual interest
    const createParticleSystem = (count, size, color, range) => {
      const particlesGeometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * range;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending // creates a glowing effect
      });
      
      return new THREE.Points(particlesGeometry, particlesMaterial);
    };
    
    // Create multiple particle systems with different characteristics
    const particleSystem1 = createParticleSystem(800, 0.03, 0xF97316, 30); // Brand orange
    const particleSystem2 = createParticleSystem(200, 0.06, 0xFFFFFF, 20); // White
    const particleSystem3 = createParticleSystem(400, 0.02, 0x6366F1, 25); // Indigo accent
    
    scene.add(particleSystem1);
    scene.add(particleSystem2);
    scene.add(particleSystem3);
    
    // Handle interactive mouse movement with parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized coordinates (-1 to 1)
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Handle mouse click for interactive burst effect
    const handleMouseClick = () => {
      // Create a temporary burst of particles at click location
      const burstGeometry = new THREE.BufferGeometry();
      const burstCount = 100;
      const burstPositions = new Float32Array(burstCount * 3);
      const burstVelocities: number[] = [];
      
      for (let i = 0; i < burstCount; i++) {
        const i3 = i * 3;
        // Start particles at center of screen
        burstPositions[i3] = 0;
        burstPositions[i3 + 1] = 0;
        burstPositions[i3 + 2] = 0;
        
        // Random velocity direction
        burstVelocities.push(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        );
      }
      
      burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
      
      const burstMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xFFFFFF,
        transparent: true,
        opacity: 1
      });
      
      const burst = new THREE.Points(burstGeometry, burstMaterial);
      scene.add(burst);
      
      // Remove burst after animation
      setTimeout(() => {
        scene.remove(burst);
        burst.geometry.dispose();
        burst.material.dispose();
      }, 2000);
      
      // Animate the burst
      const animateBurst = () => {
        const positions = burst.geometry.attributes.position.array;
        
        for (let i = 0; i < burstCount; i++) {
          const i3 = i * 3;
          const v3 = i * 3;
          
          positions[i3] += burstVelocities[v3];
          positions[i3 + 1] += burstVelocities[v3 + 1];
          positions[i3 + 2] += burstVelocities[v3 + 2];
        }
        
        burst.geometry.attributes.position.needsUpdate = true;
        
        if (burst.parent === scene) {
          requestAnimationFrame(animateBurst);
        }
      };
      
      animateBurst();
    };
    
    // Handle touch event for mobile
    const handleTouchStart = (event: TouchEvent) => {
      handleMouseClick();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('touchstart', handleTouchStart);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth mouse movement with easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      // Artistic rotation effects
      torusKnot.rotation.x += 0.003;
      torusKnot.rotation.y += 0.003;
      
      // Responsive tilt based on mouse position
      torusKnot.rotation.x += mouseY * 0.01;
      torusKnot.rotation.y += mouseX * 0.01;
      
      // Animate particle systems differently for depth
      particleSystem1.rotation.x += 0.0003;
      particleSystem1.rotation.y += 0.0005;
      
      particleSystem2.rotation.x -= 0.0007;
      particleSystem2.rotation.y -= 0.0004;
      
      particleSystem3.rotation.x += 0.0006;
      particleSystem3.rotation.z += 0.0008;
      
      // Camera slight movement for parallax
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials to prevent memory leaks
      torusKnot.geometry.dispose();
      torusKnot.material.dispose();
      particleSystem1.geometry.dispose();
      particleSystem1.material.dispose();
      particleSystem2.geometry.dispose();
      particleSystem2.material.dispose();
      particleSystem3.geometry.dispose();
      particleSystem3.material.dispose();
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-[-8]"
      style={{ 
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.6))' 
      }}
    />
  );
};

export default Background3D;
