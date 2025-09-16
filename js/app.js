// Main application entry point for the Mental Health App

class MentalHealthApp {
    constructor() {
        this.isInitialized = false;
    }

    // Initialize the application
    init() {
        if (this.isInitialized) {
            console.warn('App already initialized');
            return;
        }

        console.log('Initializing Mental Health App...');

        try {
            // Initialize theme manager
            Utils.ThemeManager.init();

            // Initialize router
            Router.init();

            // Set up global error handling
            this.setupErrorHandling();

            // Set up keyboard shortcuts
            this.setupKeyboardShortcuts();

            // Set up responsive design handlers
            this.setupResponsiveHandlers();

            // Mark as initialized
            this.isInitialized = true;

            console.log('Mental Health App initialized successfully');

            // Show welcome message if first visit
            this.showWelcomeMessage();

        } catch (error) {
            console.error('Failed to initialize app:', error);
            Utils.Toast.error('Failed to initialize the application. Please refresh the page.');
        }
    }

    // Set up global error handling
    setupErrorHandling() {
        // Handle uncaught errors
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            Utils.Toast.error('An unexpected error occurred. Please try again.');
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            Utils.Toast.error('An unexpected error occurred. Please try again.');
            event.preventDefault();
        });
    }

    // Set up keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + H: Go to home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                Router.navigate('/');
                Utils.Toast.show('Navigated to home', 'info', 2000);
            }

            // Alt + L: Go to login (if not authenticated)
            if (e.altKey && e.key === 'l' && !Router.isAuthenticated()) {
                e.preventDefault();
                Router.navigate('/login');
                Utils.Toast.show('Navigated to login', 'info', 2000);
            }

            // Alt + D: Go to dashboard (if authenticated)
            if (e.altKey && e.key === 'd' && Router.isAuthenticated()) {
                e.preventDefault();
                Router.navigate('/dashboard');
                Utils.Toast.show('Navigated to dashboard', 'info', 2000);
            }

            // Alt + T: Toggle theme
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                Utils.ThemeManager.toggle();
                const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
                Utils.Toast.show(`Switched to ${theme} theme`, 'info', 2000);
            }

            // Escape: Close modals/menus
            if (e.key === 'Escape') {
                Utils.Modal.close();
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const menuToggle = document.getElementById('mobile-menu-toggle');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    if (menuToggle) {
                        menuToggle.textContent = '☰';
                    }
                }
            }
        });
    }

    // Set up responsive design handlers
    setupResponsiveHandlers() {
        // Handle viewport changes
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleViewportChange();
        }, 250));

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleViewportChange();
            }, 100);
        });
    }

    // Handle viewport changes
    handleViewportChange() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuToggle = document.getElementById('mobile-menu-toggle');
            
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                }
            }
        }

        // Update layout if needed
        this.updateLayout();
    }

    // Update layout based on viewport
    updateLayout() {
        // Add any responsive layout updates here
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            // Adjust hero section height for mobile
            if (window.innerHeight < 600) {
                heroSection.style.minHeight = '80vh';
            } else {
                heroSection.style.minHeight = '100vh';
            }
        }
    }

    // Show welcome message for first-time visitors
    showWelcomeMessage() {
        const hasVisited = Utils.Storage.get('hasVisited');
        
        if (!hasVisited) {
            setTimeout(() => {
                Utils.Toast.show(
                    'Welcome to Mental Health App! Press Alt+T to toggle dark mode, Alt+H for home.',
                    'info',
                    8000
                );
                Utils.Storage.set('hasVisited', true);
            }, 2000);
        }
    }

    // Get app version info
    getVersion() {
        return {
            name: 'Mental Health App',
            version: '1.0.0',
            description: 'A comprehensive mental health support platform',
            technologies: ['Vanilla JavaScript', 'CSS3', 'HTML5']
        };
    }

    // Get app statistics
    getStats() {
        return {
            currentRoute: Router.getCurrentRoute(),
            isAuthenticated: Router.isAuthenticated(),
            theme: document.body.classList.contains('dark') ? 'dark' : 'light',
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            storage: {
                hasToken: !!Utils.Storage.get('token'),
                hasUser: !!Utils.Storage.get('user'),
                hasVisited: !!Utils.Storage.get('hasVisited')
            }
        };
    }

    // Destroy the app (cleanup)
    destroy() {
        console.log('Destroying Mental Health App...');
        
        // Clear any intervals/timeouts
        // Remove event listeners if needed
        // Clear storage if needed
        
        this.isInitialized = false;
        console.log('Mental Health App destroyed');
    }
}

// Utility function for debouncing
Utils.debounce = function(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
};

// Create and initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.MentalHealthApp = new MentalHealthApp();
    
    // Initialize the app
    window.MentalHealthApp.init();
});

// Expose app for debugging/development
if (window.console && typeof window.console.log === 'function') {
    console.log('%c🧠 Mental Health App 🧠', 'color: #9333ea; font-size: 16px; font-weight: bold;');
    console.log('App instance available at window.MentalHealthApp');
    console.log('Router available at window.Router');
    console.log('Components available at window.Components');
    console.log('Utils available at window.Utils');
}

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you create a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(registrationError => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}