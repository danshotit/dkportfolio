
// Initialize Three.js background
function initThreeBackground() {
  if (!document.getElementById('background3d')) return;
  
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
  document.getElementById('background3d').appendChild(renderer.domElement);
  
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
  
  const handleMouseMove = (event) => {
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
    const burstVelocities = [];
    
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
  const handleTouchStart = (event) => {
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
  
  // Return a cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleMouseClick);
    window.removeEventListener('touchstart', handleTouchStart);
    
    // Dispose of resources
    torusKnot.geometry.dispose();
    torusKnot.material.dispose();
    particleSystem1.geometry.dispose();
    particleSystem1.material.dispose();
    particleSystem2.geometry.dispose();
    particleSystem2.material.dispose();
    particleSystem3.geometry.dispose();
    particleSystem3.material.dispose();
    
    // Remove renderer from DOM
    const background = document.getElementById('background3d');
    if (background && background.contains(renderer.domElement)) {
      background.removeChild(renderer.domElement);
    }
  };
}

// Create binary code particles
function createBinaryParticles() {
  const particleCount = 20;
  const container = document.getElementById('binary-container');
  
  if (container) {
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'binary-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.setProperty('--x-direction', `${(Math.random() * 200) - 100}px`);
      particle.style.animationDelay = `${Math.random() * 30}s`;
      particle.textContent = '01001100 01101111 01110110 01100101';
      container.appendChild(particle);
    }
  }
}

// Create floating keyboard images
function createFloatingKeyboards() {
  const keyboardCount = 5;
  const container = document.getElementById('keyboard-container');
  
  if (container) {
    // Clear existing images
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
      keyboard.style.opacity = '0.1';
      keyboard.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(keyboard);
    }
  }
}

// Handle navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = mobileNav.querySelectorAll('a');
  
  // Handle navbar scroll effect
  function handleScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileNav.classList.toggle('open');
    
    // Toggle menu icon between hamburger and close
    const menuIcon = mobileMenuToggle.querySelector('svg');
    if (mobileNav.classList.contains('open')) {
      menuIcon.innerHTML = `
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      `;
    } else {
      menuIcon.innerHTML = `
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      `;
    }
  }
  
  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      // Reset hamburger icon
      const menuIcon = mobileMenuToggle.querySelector('svg');
      menuIcon.innerHTML = `
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      `;
    });
  });
  
  window.addEventListener('scroll', handleScroll);
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  // Run once on page load
  handleScroll();
}

// Initialize scroll animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-trigger');
  const skillBars = document.querySelectorAll('.skill-progress');
  const staggeredItems = document.querySelectorAll('.stagger-item');
  
  // Add class for staggered animations
  staggeredItems.forEach((item, index) => {
    item.classList.add(`delay-${(index % 5) + 1}`);
  });
  
  function checkVisibility() {
    const windowHeight = window.innerHeight;
    
    // Fade in elements when they enter the viewport
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight * 0.85) {
        element.classList.add('visible');
      }
    });
    
    // Animate skills when the skills card is visible
    const skillsCard = document.querySelector('.skills-card');
    if (skillsCard) {
      const cardTop = skillsCard.getBoundingClientRect().top;
      if (cardTop < windowHeight * 0.85) {
        skillsCard.classList.add('visible');
      }
    }
    
    // Animate staggered items
    staggeredItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < windowHeight * 0.85) {
        item.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  
  // Run once on page load
  checkVisibility();
}

// Handle contact form submission
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <div class="loading-spinner"></div>
        Sending...
      `;
      
      // Simulate form submission - in a real implementation, you would use fetch to send to server
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message - in a real app you might use a toast
        alert('Message sent successfully! We\'ll get back to you soon.');
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }, 2000);
    });
  }
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize ThreeJS background
  initThreeBackground();
  
  // Create binary particles and floating keyboards
  createBinaryParticles();
  createFloatingKeyboards();
  
  // Initialize navbar interaction
  initNavbar();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize contact form
  initContactForm();
  
  // Set current year in footer
  setCurrentYear();
});
