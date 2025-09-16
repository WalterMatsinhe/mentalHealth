// Component definitions for the Mental Health App

const Components = {
    // Navigation Bar Component
    NavBar: {
        render(isScrolled = false) {
            return `
                <div class="container nav-container">
                    <a href="#hero" class="nav-logo">
                        <span class="mental-title">MENTAL</span><span class="text-primary">HEALTH</span>
                    </a>

                    <ul class="nav-links">
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>

                    <div class="nav-buttons">
                        <a href="#login" class="nav-button login">Login</a>
                        <a href="#register" class="nav-button register">Register</a>
                    </div>

                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
                        ☰
                    </button>

                    <div class="mobile-menu" id="mobile-menu">
                        <a href="#hero">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <a href="#login" class="nav-button login">Login</a>
                            <a href="#register" class="nav-button register">Register</a>
                        </div>
                    </div>
                </div>
            `;
        },

        init() {
            const navbar = document.getElementById('navbar');
            if (!navbar) return;

            navbar.innerHTML = this.render();

            // Handle scroll effects
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Handle mobile menu
            const menuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');

            if (menuToggle && mobileMenu) {
                menuToggle.addEventListener('click', () => {
                    mobileMenu.classList.toggle('open');
                    menuToggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
                });

                // Close menu when clicking links
                mobileMenu.addEventListener('click', (e) => {
                    if (e.target.tagName === 'A') {
                        mobileMenu.classList.remove('open');
                        menuToggle.textContent = '☰';
                    }
                });
            }

            // Handle smooth scrolling for hash links
            navbar.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = e.target.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    } else if (targetId === 'hero' || targetId === 'about' || targetId === 'contact') {
                        // If sections don't exist, navigate to home page with hash
                        Router.navigate('/', { hash: targetId });
                    } else {
                        // Navigate to specific pages
                        Router.navigate(`/${targetId}`);
                    }
                }
            });
        }
    },

    // Hero Section Component
    HeroSection: {
        render() {
            return `
                <section id="hero" class="hero-section">
                    <div class="hero-content">
                        <div class="hero-text">
                            <h1 class="hero-title">
                                Prioritize Your <span class="text-primary">Mental Health</span>
                            </h1>
                            <p class="hero-description">
                                Your mind matters. Take a step towards a healthier, happier you. 
                                Explore resources, tips, and support to nurture your mental well-being every day.
                            </p>
                            <a href="#register" class="hero-button">Get Started</a>
                        </div>
                        <div class="hero-image">
                            <img src="Client/public/hero.png" alt="Mental Health Illustration" />
                        </div>
                    </div>
                    <div class="scroll-indicator">
                        <span>scroll</span>
                        <div class="scroll-arrow">↓</div>
                    </div>
                </section>
            `;
        }
    },

    // About Section Component
    AboutSection: {
        render() {
            const cards = [
                {
                    icon: '👥',
                    title: 'Support & Community',
                    desc: 'You are not alone. Connect with others, share your story, and find encouragement in a supportive community.',
                    modalContent: `
                        <p>Our community is a safe and welcoming space where you can freely share your experiences, challenges, and victories without fear of judgment. Whether you're looking for encouragement, advice, or simply a listening ear, you'll find people here who truly understand.</p>
                        <p>Connect with others through interactive forums, engaging group chats, and supportive virtual events designed to help you feel less alone. You'll have opportunities to learn from shared stories, discover helpful coping strategies, and offer encouragement to others who may be walking a similar path.</p>
                    `
                },
                {
                    icon: '💡',
                    title: 'Resources & Tips',
                    desc: 'Access helpful articles, coping strategies, and expert advice to nurture your mental well-being every day.',
                    modalContent: `
                        <h4>Our comprehensive resource library includes:</h4>
                        <ul>
                            <li>Guided meditations and mindfulness exercises</li>
                            <li>Expert articles on stress, anxiety, and self-care</li>
                            <li>Daily tips for building healthy habits</li>
                            <li>Coping strategies for difficult emotions</li>
                            <li>Worksheets and self-assessment tools</li>
                        </ul>
                    `
                },
                {
                    icon: '🏥',
                    title: 'Professional Guidance',
                    desc: 'Find information on reaching out to mental health professionals and taking the first step toward healing.',
                    modalContent: `
                        <p>Learn how to find a therapist, what to expect from your first session, and how to access affordable professional help. We provide resources for both in-person and online counseling options.</p>
                        <p>Our directory includes licensed therapists, counselors, and mental health professionals who specialize in various areas including anxiety, depression, trauma, and relationship issues.</p>
                    `
                },
                {
                    icon: '📚',
                    title: 'Educational Content',
                    desc: 'Learn about mental health conditions, treatment options, and wellness practices through our educational resources.',
                    modalContent: `
                        <p>Understanding mental health is the first step towards better well-being. Our educational content covers:</p>
                        <ul>
                            <li>Common mental health conditions and symptoms</li>
                            <li>Treatment approaches and therapy types</li>
                            <li>Medication information and side effects</li>
                            <li>Lifestyle factors that impact mental health</li>
                            <li>Prevention and early intervention strategies</li>
                        </ul>
                    `
                }
            ];

            const cardsHtml = cards.map((card, index) => `
                <div class="about-card" data-modal-title="${card.title}" data-modal-content='${JSON.stringify(card.modalContent).replace(/'/g, "&apos;")}'>
                    <div class="about-card-icon">${card.icon}</div>
                    <h3 class="about-card-title">${card.title}</h3>
                    <p class="about-card-desc">${card.desc}</p>
                </div>
            `).join('');

            return `
                <section id="about" class="about-section">
                    <div class="container">
                        <h2 class="about-title">
                            About <span class="text-primary">Mental Health</span>
                        </h2>
                        <p class="about-description">
                            Mental health is just as important as physical health. Our platform provides comprehensive 
                            support, resources, and guidance to help you on your journey toward better mental well-being.
                        </p>
                        <div class="about-cards">
                            ${cardsHtml}
                        </div>
                    </div>
                </section>
            `;
        },

        init() {
            // Add click handlers for modal cards
            document.addEventListener('click', (e) => {
                const card = e.target.closest('.about-card');
                if (card) {
                    const title = card.dataset.modalTitle;
                    const content = JSON.parse(card.dataset.modalContent.replace(/&apos;/g, "'"));
                    Utils.Modal.open(title, content);
                }
            });
        }
    },

    // Contact Section Component
    ContactSection: {
        render() {
            return `
                <section id="contact" class="contact-section">
                    <div class="container">
                        <h2 class="about-title">
                            Get in <span class="text-primary">Touch</span>
                        </h2>
                        <p class="about-description">
                            Have questions or need support? We're here to help. Reach out to us through any of the following channels.
                        </p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
                            <div class="about-card">
                                <div class="about-card-icon">📧</div>
                                <h3 class="about-card-title">Email Support</h3>
                                <p class="about-card-desc">support@mentalhealth.com</p>
                            </div>
                            
                            <div class="about-card">
                                <div class="about-card-icon">📞</div>
                                <h3 class="about-card-title">Phone Support</h3>
                                <p class="about-card-desc">(555) 123-4567</p>
                            </div>
                            
                            <div class="about-card">
                                <div class="about-card-icon">📍</div>
                                <h3 class="about-card-title">Office Location</h3>
                                <p class="about-card-desc">123 Wellness St, Health City, HC 12345</p>
                            </div>
                        </div>

                        <div style="margin-top: 3rem; max-width: 32rem; margin-left: auto; margin-right: auto;">
                            <h3 style="margin-bottom: 1rem; text-align: center; color: rgb(var(--primary-font));">Send us a message</h3>
                            <form id="contact-form" class="form">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" name="name" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Message</label>
                                    <textarea name="message" class="form-input" rows="4" required style="resize: vertical;"></textarea>
                                </div>
                                <button type="submit" class="form-button">Send Message</button>
                            </form>
                        </div>
                    </div>
                </section>
            `;
        },

        init() {
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', this.handleSubmit);
            }
        },

        handleSubmit(e) {
            e.preventDefault();
            
            const validation = Utils.Form.validate(e.target, {
                name: { required: true },
                email: { required: true, email: true },
                message: { required: true, minLength: 10 }
            });

            if (!validation.isValid) {
                Utils.Form.showErrors(e.target, validation.errors);
                return;
            }

            // Simulate form submission
            const button = e.target.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                Utils.Toast.success('Message sent successfully! We\'ll get back to you soon.');
                e.target.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        }
    },

    // Footer Component
    Footer: {
        render() {
            return `
                <div class="container">
                    <p>&copy; 2024 Mental Health App. All rights reserved.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.875rem;">
                        Your mental health matters. Take care of yourself and reach out when you need support.
                    </p>
                </div>
            `;
        }
    },

    // Login Form Component
    LoginForm: {
        render() {
            return `
                <div class="form-container">
                    <div class="form-content">
                        <form id="login-form" class="form">
                            <div style="text-align: center; margin-bottom: 1.5rem;">
                                <h1 class="form-title">Sign in to your account</h1>
                                <p class="form-subtitle">
                                    Don't have an account?
                                    <a href="#register" class="form-link">Sign up here</a>
                                </p>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" name="email" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Password</label>
                                <input type="password" name="password" class="form-input" required>
                            </div>

                            <button type="submit" class="form-button">Sign In</button>
                        </form>
                    </div>
                </div>
            `;
        },

        init() {
            const form = document.getElementById('login-form');
            if (form) {
                form.addEventListener('submit', this.handleSubmit);
            }
        },

        async handleSubmit(e) {
            e.preventDefault();
            
            const validation = Utils.Form.validate(e.target, {
                email: { required: true, email: true },
                password: { required: true, minLength: 6 }
            });

            if (!validation.isValid) {
                Utils.Form.showErrors(e.target, validation.errors);
                return;
            }

            const button = e.target.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Signing in...';
            button.disabled = true;

            try {
                // Check if server is available, otherwise simulate login
                const response = await Utils.Http.post('http://localhost:5000/api/auth/login', validation.data);
                
                Utils.Storage.set('token', response.token);
                Utils.Storage.set('user', response.user);
                
                Utils.Toast.success('Login successful!');
                
                // Redirect based on user role
                if (response.user.role === 'admin') {
                    Router.navigate('/admin');
                } else {
                    Router.navigate('/dashboard');
                }
            } catch (error) {
                // Simulate successful login for demo
                console.log('Server not available, simulating login...');
                const simulatedUser = {
                    id: 1,
                    email: validation.data.email,
                    name: 'Demo User',
                    role: 'user'
                };
                
                Utils.Storage.set('token', 'demo-token');
                Utils.Storage.set('user', simulatedUser);
                
                Utils.Toast.success('Login successful! (Demo mode)');
                Router.navigate('/dashboard');
            } finally {
                button.textContent = originalText;
                button.disabled = false;
            }
        }
    },

    // Register Form Component
    RegisterForm: {
        render() {
            return `
                <div class="form-container">
                    <div class="form-content">
                        <form id="register-form" class="form">
                            <div style="text-align: center; margin-bottom: 1.5rem;">
                                <h1 class="form-title">Create your account</h1>
                                <p class="form-subtitle">
                                    Already have an account?
                                    <a href="#login" class="form-link">Sign in here</a>
                                </p>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Full Name</label>
                                <input type="text" name="name" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" name="email" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Password</label>
                                <input type="password" name="password" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Confirm Password</label>
                                <input type="password" name="confirmPassword" class="form-input" required>
                            </div>

                            <button type="submit" class="form-button">Create Account</button>
                        </form>
                    </div>
                </div>
            `;
        },

        init() {
            const form = document.getElementById('register-form');
            if (form) {
                form.addEventListener('submit', this.handleSubmit);
            }
        },

        async handleSubmit(e) {
            e.preventDefault();
            
            const validation = Utils.Form.validate(e.target, {
                name: { required: true, minLength: 2 },
                email: { required: true, email: true },
                password: { required: true, minLength: 6 },
                confirmPassword: { required: true, minLength: 6 }
            });

            if (!validation.isValid) {
                Utils.Form.showErrors(e.target, validation.errors);
                return;
            }

            // Check password confirmation
            if (validation.data.password !== validation.data.confirmPassword) {
                Utils.Form.showErrors(e.target, { confirmPassword: 'Passwords do not match' });
                return;
            }

            const button = e.target.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Creating account...';
            button.disabled = true;

            try {
                const { confirmPassword, ...registerData } = validation.data;
                const response = await Utils.Http.post('http://localhost:5000/api/auth/register', registerData);
                
                Utils.Storage.set('token', response.token);
                Utils.Storage.set('user', response.user);
                
                Utils.Toast.success('Account created successfully!');
                Router.navigate('/dashboard');
            } catch (error) {
                // Simulate successful registration for demo
                console.log('Server not available, simulating registration...');
                const simulatedUser = {
                    id: 1,
                    email: validation.data.email,
                    name: validation.data.name,
                    role: 'user'
                };
                
                Utils.Storage.set('token', 'demo-token');
                Utils.Storage.set('user', simulatedUser);
                
                Utils.Toast.success('Account created successfully! (Demo mode)');
                Router.navigate('/dashboard');
            } finally {
                button.textContent = originalText;
                button.disabled = false;
            }
        }
    },

    // Dashboard Component
    Dashboard: {
        render() {
            const user = Utils.Storage.get('user');
            const slides = [
                'Client/public/hero.png',
                'Client/public/bannerTwo.png',
                'Client/public/bannerThree.png'
            ];

            const services = [
                {
                    icon: '🧠',
                    title: 'Individual Therapy',
                    description: 'One-on-one counseling sessions with licensed therapists specializing in anxiety, depression, trauma, and personal growth.',
                    features: ['50-minute sessions', 'Weekly or bi-weekly', 'Multiple therapy approaches']
                },
                {
                    icon: '👥',
                    title: 'Group Therapy',
                    description: 'Supportive group sessions focusing on shared experiences and peer support in a safe, confidential environment.',
                    features: ['Small group settings', 'Topic-specific groups', 'Peer support focus']
                },
                {
                    icon: '💚',
                    title: 'Wellness Programs',
                    description: 'Comprehensive wellness programs including mindfulness, stress management, and lifestyle coaching.',
                    features: ['Mindfulness training', 'Stress management', 'Lifestyle coaching']
                },
                {
                    icon: '🛡️',
                    title: 'Crisis Support',
                    description: 'Immediate support and intervention services for mental health crises and emergency situations.',
                    features: ['24/7 availability', 'Immediate intervention', 'Emergency protocols']
                }
            ];

            return `
                <div class="dashboard-container">
                    <div class="container">
                        <div style="text-align: center; margin-bottom: 3rem;">
                            <h1 style="font-size: 2.5rem; font-weight: bold; color: rgb(var(--primary-font)); margin-bottom: 1rem;">
                                Welcome back, <span class="text-primary">${user?.name || 'User'}</span>!
                            </h1>
                            <p style="font-size: 1.125rem; color: rgba(var(--primary-font), 0.8);">
                                Your mental health journey continues here. Explore our services and resources.
                            </p>
                        </div>

                        <div class="dashboard-slider" id="dashboard-slider">
                            ${slides.map((slide, index) => `
                                <div class="dashboard-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
                                    <img src="${slide}" alt="Mental Health Banner ${index + 1}" />
                                </div>
                            `).join('')}
                        </div>

                        <div style="text-align: center; margin: 3rem 0;">
                            <h2 style="font-size: 2rem; font-weight: bold; color: rgb(var(--primary-font)); margin-bottom: 1rem;">
                                Our <span class="text-primary">Services</span>
                            </h2>
                            <p style="color: rgba(var(--primary-font), 0.8); max-width: 48rem; margin: 0 auto;">
                                We offer comprehensive mental health services designed to support you at every step of your journey.
                            </p>
                        </div>

                        <div class="dashboard-services">
                            ${services.map(service => `
                                <div class="dashboard-service">
                                    <div class="dashboard-service-icon">${service.icon}</div>
                                    <h3 class="dashboard-service-title">${service.title}</h3>
                                    <p class="dashboard-service-desc">${service.description}</p>
                                    <ul class="dashboard-service-features">
                                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>

                        <div style="margin-top: 4rem; padding: 2rem; background: rgb(var(--card)); border-radius: 0.75rem;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                                <div>
                                    <h3 style="font-size: 1.25rem; font-weight: 600; color: rgb(var(--primary-font)); margin-bottom: 1rem;">
                                        Contact Information
                                    </h3>
                                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <span style="color: rgb(var(--primary));">📞</span>
                                            <span style="color: rgb(var(--foreground));">(555) 123-4567</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <span style="color: rgb(var(--primary));">📧</span>
                                            <span style="color: rgb(var(--foreground));">support@mindcare.com</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <span style="color: rgb(var(--primary));">📍</span>
                                            <span style="color: rgb(var(--foreground));">123 Wellness St, Health City, HC 12345</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <span style="color: rgb(var(--primary));">🕒</span>
                                            <span style="color: rgb(var(--foreground));">Mon-Fri: 8AM-8PM, Sat-Sun: 10AM-6PM</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 style="font-size: 1.25rem; font-weight: 600; color: rgb(var(--primary-font)); margin-bottom: 1rem;">
                                        Emergency Support
                                    </h3>
                                    <p style="color: rgba(var(--primary-font), 0.8); margin-bottom: 1rem;">
                                        If you're experiencing a mental health emergency, please reach out immediately:
                                    </p>
                                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                        <div style="color: #ef4444; font-weight: 600;">Crisis Hotline: 988</div>
                                        <div style="color: #ef4444; font-weight: 600;">Emergency: 911</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 3rem; padding: 1rem;">
                            <button id="logout-btn" class="form-button" style="max-width: 200px;">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            `;
        },

        init() {
            this.initSlider();
            this.initLogout();
        },

        initSlider() {
            const slides = document.querySelectorAll('.dashboard-slide');
            let currentSlide = 0;

            const nextSlide = () => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            };

            // Auto-advance slides every 3 seconds
            setInterval(nextSlide, 3000);
        },

        initLogout() {
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    Utils.Storage.remove('token');
                    Utils.Storage.remove('user');
                    Utils.Toast.success('Logged out successfully');
                    Router.navigate('/');
                });
            }
        }
    },

    // 404 Not Found Component
    NotFound: {
        render() {
            return `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 2rem;">
                    <h1 style="font-size: 6rem; font-weight: bold; color: rgb(var(--primary)); margin-bottom: 1rem;">404</h1>
                    <h2 style="font-size: 2rem; font-weight: 600; color: rgb(var(--primary-font)); margin-bottom: 1rem;">Page Not Found</h2>
                    <p style="font-size: 1.125rem; color: rgba(var(--primary-font), 0.8); margin-bottom: 2rem; max-width: 32rem;">
                        The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                    <a href="#" onclick="Router.navigate('/')" class="hero-button">
                        Go Home
                    </a>
                </div>
            `;
        }
    }
};

// Export components for use in other files
window.Components = Components;