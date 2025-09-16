// Simple router for the Mental Health App

const Router = {
    routes: {},
    currentRoute: null,

    // Initialize the router
    init() {
        this.setupRoutes();
        this.setupEventListeners();
        this.handleInitialRoute();
    },

    // Define all routes
    setupRoutes() {
        this.routes = {
            '/': {
                title: 'Mental Health App',
                render: () => this.renderHome(),
                requiresAuth: false
            },
            '/login': {
                title: 'Login - Mental Health App',
                render: () => this.renderLogin(),
                requiresAuth: false,
                redirectIfAuth: '/dashboard'
            },
            '/register': {
                title: 'Register - Mental Health App',
                render: () => this.renderRegister(),
                requiresAuth: false,
                redirectIfAuth: '/dashboard'
            },
            '/dashboard': {
                title: 'Dashboard - Mental Health App',
                render: () => this.renderDashboard(),
                requiresAuth: true
            },
            '/admin': {
                title: 'Admin Dashboard - Mental Health App',
                render: () => this.renderAdminDashboard(),
                requiresAuth: true,
                requiresRole: 'admin'
            }
        };
    },

    // Set up event listeners for navigation
    setupEventListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname, false);
        });

        // Handle hash-based navigation (for single-page anchors)
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });

        // Handle click events for navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href.startsWith('#/')) {
                    // Route navigation
                    this.navigate(href.substring(1));
                } else if (href.startsWith('#')) {
                    // Handle hash links (page sections or routes)
                    const target = href.substring(1);
                    
                    // Check if it's a route
                    if (this.routes[`/${target}`]) {
                        this.navigate(`/${target}`);
                    } else {
                        // It's a page section - scroll to it if it exists
                        const element = document.getElementById(target);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            // If section doesn't exist and we're not on home, go to home with hash
                            if (this.currentRoute !== '/') {
                                this.navigate('/', { hash: target });
                            }
                        }
                    }
                }
            }
        });
    },

    // Handle initial route when page loads
    handleInitialRoute() {
        const path = window.location.pathname === '/' ? '/' : window.location.pathname;
        const hash = window.location.hash;
        
        this.handleRoute(path, false);
        
        // Handle hash after route is loaded
        if (hash) {
            setTimeout(() => this.handleHashChange(), 100);
        }
    },

    // Handle hash changes for section scrolling
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    },

    // Navigate to a specific route
    navigate(path, options = {}) {
        const fullPath = options.hash ? `${path}#${options.hash}` : path;
        
        if (options.replace) {
            window.history.replaceState({}, '', fullPath);
        } else {
            window.history.pushState({}, '', fullPath);
        }
        
        this.handleRoute(path, true);
        
        // Handle hash if provided
        if (options.hash) {
            setTimeout(() => {
                const element = document.getElementById(options.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    },

    // Handle route changes
    handleRoute(path, pushState = true) {
        // Normalize path
        if (path === '' || path === '/') {
            path = '/';
        }

        const route = this.routes[path];
        
        if (!route) {
            this.render404();
            return;
        }

        // Check authentication
        if (route.requiresAuth && !this.isAuthenticated()) {
            this.navigate('/login');
            Utils.Toast.error('Please login to access this page');
            return;
        }

        // Redirect if already authenticated and trying to access auth pages
        if (route.redirectIfAuth && this.isAuthenticated()) {
            this.navigate(route.redirectIfAuth);
            return;
        }

        // Check role requirements
        if (route.requiresRole && !this.hasRole(route.requiresRole)) {
            this.navigate('/dashboard');
            Utils.Toast.error('You do not have permission to access this page');
            return;
        }

        // Update current route
        this.currentRoute = path;
        
        // Update page title
        document.title = route.title;
        
        // Render the route
        route.render();
        
        // Scroll to top
        window.scrollTo(0, 0);
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!Utils.Storage.get('token');
    },

    // Check if user has specific role
    hasRole(role) {
        const user = Utils.Storage.get('user');
        return user && user.role === role;
    },

    // Render home page
    renderHome() {
        const navbar = document.getElementById('navbar');
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        if (navbar) {
            Components.NavBar.init();
        }

        if (mainContent) {
            mainContent.innerHTML = `
                ${Components.HeroSection.render()}
                ${Components.AboutSection.render()}
                ${Components.ContactSection.render()}
            `;
            
            // Initialize components
            Components.AboutSection.init();
            Components.ContactSection.init();
        }

        if (footer) {
            footer.innerHTML = Components.Footer.render();
            footer.className = 'footer';
        }
    },

    // Render login page
    renderLogin() {
        const navbar = document.getElementById('navbar');
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        if (navbar) {
            Components.NavBar.init();
        }

        if (mainContent) {
            mainContent.innerHTML = Components.LoginForm.render();
            Components.LoginForm.init();
        }

        if (footer) {
            footer.innerHTML = Components.Footer.render();
            footer.className = 'footer';
        }
    },

    // Render register page
    renderRegister() {
        const navbar = document.getElementById('navbar');
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        if (navbar) {
            Components.NavBar.init();
        }

        if (mainContent) {
            mainContent.innerHTML = Components.RegisterForm.render();
            Components.RegisterForm.init();
        }

        if (footer) {
            footer.innerHTML = Components.Footer.render();
            footer.className = 'footer';
        }
    },

    // Render dashboard page
    renderDashboard() {
        const navbar = document.getElementById('navbar');
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        // Render authenticated navbar (could be different)
        if (navbar) {
            navbar.innerHTML = `
                <div class="container nav-container">
                    <a href="#" onclick="Router.navigate('/')" class="nav-logo">
                        <span class="mental-title">MENTAL</span><span class="text-primary">HEALTH</span>
                    </a>

                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span style="color: rgb(var(--primary-font)); font-weight: 500;">
                            Welcome, ${Utils.Storage.get('user')?.name || 'User'}
                        </span>
                        <button id="nav-logout" class="nav-button login">Logout</button>
                    </div>
                </div>
            `;

            // Add logout functionality
            const logoutBtn = document.getElementById('nav-logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    Utils.Storage.remove('token');
                    Utils.Storage.remove('user');
                    Utils.Toast.success('Logged out successfully');
                    this.navigate('/');
                });
            }
        }

        if (mainContent) {
            mainContent.innerHTML = Components.Dashboard.render();
            Components.Dashboard.init();
        }

        if (footer) {
            footer.innerHTML = Components.Footer.render();
            footer.className = 'footer';
        }
    },

    // Render admin dashboard
    renderAdminDashboard() {
        const navbar = document.getElementById('navbar');
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        if (navbar) {
            navbar.innerHTML = `
                <div class="container nav-container">
                    <a href="#" onclick="Router.navigate('/')" class="nav-logo">
                        <span class="mental-title">MENTAL</span><span class="text-primary">HEALTH</span> 
                        <span style="font-size: 0.75rem; color: rgb(var(--primary));">ADMIN</span>
                    </a>

                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span style="color: rgb(var(--primary-font)); font-weight: 500;">
                            Admin: ${Utils.Storage.get('user')?.name || 'User'}
                        </span>
                        <button id="nav-logout" class="nav-button login">Logout</button>
                    </div>
                </div>
            `;

            // Add logout functionality
            const logoutBtn = document.getElementById('nav-logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    Utils.Storage.remove('token');
                    Utils.Storage.remove('user');
                    Utils.Toast.success('Logged out successfully');
                    this.navigate('/');
                });
            }
        }

        if (mainContent) {
            mainContent.innerHTML = `
                <div class="dashboard-container">
                    <div class="container">
                        <div style="text-align: center; margin-bottom: 3rem;">
                            <h1 style="font-size: 2.5rem; font-weight: bold; color: rgb(var(--primary-font)); margin-bottom: 1rem;">
                                Admin <span class="text-primary">Dashboard</span>
                            </h1>
                            <p style="font-size: 1.125rem; color: rgba(var(--primary-font), 0.8);">
                                Manage the Mental Health platform from here.
                            </p>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                            <div class="about-card">
                                <div class="about-card-icon">👥</div>
                                <h3 class="about-card-title">User Management</h3>
                                <p class="about-card-desc">Manage user accounts, roles, and permissions.</p>
                            </div>
                            
                            <div class="about-card">
                                <div class="about-card-icon">📊</div>
                                <h3 class="about-card-title">Analytics</h3>
                                <p class="about-card-desc">View platform usage statistics and insights.</p>
                            </div>
                            
                            <div class="about-card">
                                <div class="about-card-icon">⚙️</div>
                                <h3 class="about-card-title">Settings</h3>
                                <p class="about-card-desc">Configure platform settings and preferences.</p>
                            </div>
                            
                            <div class="about-card">
                                <div class="about-card-icon">📝</div>
                                <h3 class="about-card-title">Content Management</h3>
                                <p class="about-card-desc">Manage articles, resources, and educational content.</p>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 3rem; padding: 1rem;">
                            <button onclick="Router.navigate('/dashboard')" class="hero-button">
                                View User Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        if (footer) {
            footer.innerHTML = Components.Footer.render();
            footer.className = 'footer';
        }
    },

    // Render 404 page
    render404() {
        document.title = '404 - Page Not Found - Mental Health App';
        
        const navbar = document.getElementById('navbar');
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        if (navbar) {
            Components.NavBar.init();
        }

        if (mainContent) {
            mainContent.innerHTML = Components.NotFound.render();
        }

        if (footer) {
            footer.innerHTML = Components.Footer.render();
            footer.className = 'footer';
        }
    },

    // Get current route
    getCurrentRoute() {
        return this.currentRoute;
    },

    // Check if current route matches
    isRoute(path) {
        return this.currentRoute === path;
    }
};

// Export router for use in other files
window.Router = Router;