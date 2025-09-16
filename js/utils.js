// Utility functions

// Theme management
const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        this.setupToggle();
    },

    setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
        this.updateToggleIcon(theme);
    },

    toggle() {
        const isDark = document.body.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
    },

    updateToggleIcon(theme) {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    },

    setupToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    }
};

// Toast notifications
const Toast = {
    show(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-message">${message}</div>
            <button class="toast-close" aria-label="Close notification">&times;</button>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.remove(toast));

        container.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        return toast;
    },

    remove(toast) {
        if (toast && toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    },

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    }
};

// Modal management
const Modal = {
    open(title, content) {
        const container = document.getElementById('modal-container');
        if (!container) return;

        container.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        `;

        const closeBtn = container.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.close());

        container.addEventListener('click', (e) => {
            if (e.target === container) {
                this.close();
            }
        });

        container.classList.add('open');
        document.body.style.overflow = 'hidden';
    },

    close() {
        const container = document.getElementById('modal-container');
        if (container) {
            container.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => {
                container.innerHTML = '';
            }, 300);
        }
    }
};

// HTTP utilities
const Http = {
    async request(url, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('HTTP request failed:', error);
            throw error;
        }
    },

    async get(url, headers = {}) {
        return this.request(url, { method: 'GET', headers });
    },

    async post(url, body, headers = {}) {
        return this.request(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
    }
};

// Form utilities
const Form = {
    serialize(form) {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    },

    validate(form, rules) {
        const data = this.serialize(form);
        const errors = {};

        for (let field in rules) {
            const value = data[field];
            const fieldRules = rules[field];

            if (fieldRules.required && (!value || value.trim() === '')) {
                errors[field] = `${field} is required`;
                continue;
            }

            if (value && fieldRules.email && !this.isValidEmail(value)) {
                errors[field] = 'Please enter a valid email address';
            }

            if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
                errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
            }
        }

        return { isValid: Object.keys(errors).length === 0, errors, data };
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    showErrors(form, errors) {
        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(error => error.remove());

        // Show new errors
        for (let field in errors) {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.textContent = errors[field];
                input.parentNode.appendChild(errorDiv);
            }
        }
    }
};

// Animation utilities
const Animation = {
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    slideIn(element, direction = 'left', duration = 300) {
        const translateStart = direction === 'left' ? '-100%' : '100%';
        
        element.style.transform = `translateX(${translateStart})`;
        element.style.display = 'block';
        
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const translateValue = direction === 'left' 
                ? -100 + (progress * 100)
                : 100 - (progress * 100);
                
            element.style.transform = `translateX(${translateValue}%)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.transform = '';
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// Local storage utilities
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },

    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return defaultValue;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
        }
    },

    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
        }
    }
};

// Event utilities
const Events = {
    on(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        return () => element.removeEventListener(event, handler, options);
    },

    once(element, event, handler) {
        return this.on(element, event, handler, { once: true });
    },

    delegate(parent, selector, event, handler) {
        return this.on(parent, event, (e) => {
            const target = e.target.closest(selector);
            if (target) {
                handler.call(target, e);
            }
        });
    }
};

// DOM utilities
const DOM = {
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        for (let [key, value] of Object.entries(attributes)) {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        }
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },

    $(selector, context = document) {
        return context.querySelector(selector);
    },

    $$(selector, context = document) {
        return Array.from(context.querySelectorAll(selector));
    }
};

// Export utilities for use in other files
window.Utils = {
    ThemeManager,
    Toast,
    Modal,
    Http,
    Form,
    Animation,
    Storage,
    Events,
    DOM
};