// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const letters = document.querySelectorAll('.letter');
    
    // Animate loading letters
    letters.forEach((letter, index) => {
        letter.style.setProperty('--i', index);
    });
    
    // Hide preloader after animation
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }, 2000);
});

// ===== CUSTOM CURSOR =====
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');

document.addEventListener('mousemove', (e) => {
    cursorOuter.style.left = e.clientX + 'px';
    cursorOuter.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .skill-item, .portfolio-item');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOuter.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorInner.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorOuter.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorInner.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ===== NAVIGATION =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Active link based on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== ANIMATED BACKGROUND PARTICLES =====
function createParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            filter: blur(${size / 2}px);
        `;
        
        container.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg); }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg); }
        }
    `;
    document.head.appendChild(style);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-item, .service-card, .tool-item, .portfolio-item, .about-card').forEach(el => {
    observer.observe(el);
});

// ===== SKILLS DATA AND RENDERING =====
const skillsData = [
    { name: 'Digital Marketing', percentage: 95, icon: 'fas fa-chart-line' },
    { name: 'SEO', percentage: 90, icon: 'fas fa-search' },
    { name: 'Website Development', percentage: 88, icon: 'fas fa-code' },
    { name: 'Lead Generation', percentage: 92, icon: 'fas fa-bullseye' },
    { name: 'Computer Operator', percentage: 85, icon: 'fas fa-desktop' },
    { name: 'Social Media Marketing', percentage: 93, icon: 'fas fa-share-alt' },
    { name: 'Facebook Advertising', percentage: 91, icon: 'fab fa-facebook' },
    { name: 'Google Advertising', percentage: 89, icon: 'fab fa-google' },
    { name: 'Deep Learning', percentage: 82, icon: 'fas fa-brain' }
];

function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = '';
    
    skillsData.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item glassmorphism';
        skillItem.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-info">
                    <h3>${skill.name}</h3>
                </div>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-percentage="${skill.percentage}"></div>
            </div>
            <div class="skill-percentage">${skill.percentage}%</div>
        `;
        skillsGrid.appendChild(skillItem);
    });
}

// ===== SERVICES DATA AND RENDERING =====
const servicesData = [
    {
        title: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies to boost your online presence and drive conversions.',
        icon: 'fas fa-bullhorn'
    },
    {
        title: 'SEO Optimization',
        description: 'Improve your search engine rankings with proven SEO techniques and strategies.',
        icon: 'fas fa-search-plus'
    },
    {
        title: 'Web Development',
        description: 'Custom website development with modern technologies and responsive design.',
        icon: 'fas fa-laptop-code'
    },
    {
        title: 'Lead Generation',
        description: 'Targeted lead generation campaigns to grow your business and increase revenue.',
        icon: 'fas fa-users'
    }
];

function renderServices() {
    const servicesGrid = document.querySelector('.services-grid');
    servicesGrid.innerHTML = '';
    
    servicesData.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card glassmorphism';
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <a href="#contact" class="service-link">
                Learn More <i class="fas fa-arrow-right"></i>
            </a>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

// ===== TOOLS DATA AND RENDERING =====
const toolsData = [
    { name: 'Fusion 360', icon: 'fas fa-cube' },
    { name: 'Unity Game Engine', icon: 'fas fa-gamepad' },
    { name: 'YOLO v8', icon: 'fas fa-eye' }
];

function renderTools() {
    const toolsGrid = document.querySelector('.tools-grid');
    toolsGrid.innerHTML = '';
    
    toolsData.forEach(tool => {
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item glassmorphism';
        toolItem.innerHTML = `
            <div class="tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <h3>${tool.name}</h3>
        `;
        toolsGrid.appendChild(toolItem);
    });
}

// ===== PORTFOLIO DATA AND RENDERING =====
const portfolioData = [
    {
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with advanced features',
        category: 'Web Development'
    },
    {
        title: 'Digital Marketing Campaign',
        description: 'Successful marketing campaign with 300% ROI',
        category: 'Digital Marketing'
    },
    {
        title: 'SEO Optimization',
        description: 'Increased organic traffic by 250%',
        category: 'SEO'
    }
];

function renderPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.innerHTML = '';
    
    portfolioData.forEach((project, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item glassmorphism';
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <i class="fas fa-project-diagram"></i>
            </div>
            <div class="portfolio-overlay">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p class="category">${project.category}</p>
                <div class="portfolio-links">
                    <a href="#" class="portfolio-link" title="View Details">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="#" class="portfolio-link" title="Visit Live">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// ===== ANIMATE STATS =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });
}

// ===== ANIMATE SKILL BARS =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
    });
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name') || document.querySelector('#contactForm input[type="text"]').value;
    const email = formData.get('email') || document.querySelector('#contactForm input[type="email"]').value;
    const subject = formData.get('subject') || document.querySelector('#contactForm input[placeholder="Subject"]').value;
    const message = formData.get('message') || document.querySelector('#contactForm textarea').value;
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
    contactForm.reset();
    
    // Add some visual feedback
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
});

// ===== RIPPLE BUTTON EFFECT =====
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    createParticles();
    
    // Render dynamic content
    renderSkills();
    renderServices();
    renderTools();
    renderPortfolio();
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        animateStats();
        animateSkillBars();
    };
    
    // Trigger animations when skills section is in view
    const skillsSection = document.querySelector('#skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateOnScroll();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Add ripple effect style
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#')  return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
