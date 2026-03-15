// Main JavaScript for OnlineGuru Learning Platform

// Global state
window.OnlineGuru = {
    user: null,
    theme: 'light',
    courses: [],
    loading: true
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupTheme();
    setupNavigation();
    setupAuth();
    setupMobileMenu();
    hideLoader();
    
    console.log('OnlineGuru initialized');
}

// Theme Management
function setupTheme() {
    const savedTheme = localStorage.getItem('onlineguru_theme') || 'light';
    OnlineGuru.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Setup theme toggle buttons
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-user');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
        updateThemeIcon(toggle);
    });
}

function toggleTheme() {
    const newTheme = OnlineGuru.theme === 'light' ? 'dark' : 'light';
    OnlineGuru.theme = newTheme;
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('onlineguru_theme', newTheme);
    
    // Update all theme icons
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-user');
    themeToggles.forEach(updateThemeIcon);
}

function updateThemeIcon(toggle) {
    const icon = toggle.querySelector('i');
    if (icon) {
        icon.className = OnlineGuru.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navigation Setup
function setupNavigation() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
            if (mobileToggle) {
                mobileToggle.querySelector('i').classList.remove('fa-times');
            }
        }
    });
}

// Authentication Setup
function setupAuth() {
    checkAuthStatus();
    setupAuthButtons();
}

function checkAuthStatus() {
    const userStr = localStorage.getItem('onlineguru_user');
    if (userStr) {
        try {
            OnlineGuru.user = JSON.parse(userStr);
            updateUserUI();
        } catch (error) {
            console.error('Error parsing user data:', error);
            logout();
        }
    }
}

function updateUserUI() {
    if (!OnlineGuru.user) return;
    
    // Update user name displays
    const userNameElements = document.querySelectorAll('#user-name, .user-name');
    userNameElements.forEach(element => {
        element.textContent = OnlineGuru.user.name;
    });
    
    // Show/hide auth elements
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    
    if (guestNav) guestNav.style.display = 'none';
    if (userNav) userNav.style.display = 'flex';
}

function setupAuthButtons() {
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

function logout() {
    localStorage.removeItem('onlineguru_user');
    OnlineGuru.user = null;
    
    showNotification('Logged out successfully', 'success');
    
    // Redirect to home after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Mobile Menu Setup
function setupMobileMenu() {
    // Handle mobile navigation
    const handleResize = () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('mobile-open');
            }
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

// Loader Management
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                loader.style.opacity = '1';
            }, 300);
        }
        OnlineGuru.loading = false;
    }, 500);
}

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            if (!validateEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Password validation
        if (input.type === 'password' && input.value) {
            if (input.value.length < 6) {
                showFieldError(input, 'Password must be at least 6 characters long');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorElement = input.parentElement.querySelector('.error-msg') || 
                      document.createElement('span');
    errorElement.className = 'error-msg';
    errorElement.textContent = message;
    
    if (!input.parentElement.querySelector('.error-msg')) {
        input.parentElement.appendChild(errorElement);
    }
    
    input.classList.add('error');
}

function clearFieldError(input) {
    const errorElement = input.parentElement.querySelector('.error-msg');
    if (errorElement) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// API Helper Functions
async function apiRequest(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, finalOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Local Storage Helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// Export global functions
window.showNotification = showNotification;
window.validateForm = validateForm;
window.showLoader = showLoader;
window.hideLoader = hideLoader;
window.formatDate = formatDate;
window.formatTime = formatTime;
window.formatDuration = formatDuration;
window.debounce = debounce;
window.throttle = throttle;
window.apiRequest = apiRequest;
window.saveToLocalStorage = saveToLocalStorage;
window.getFromLocalStorage = getFromLocalStorage;
window.removeFromLocalStorage = removeFromLocalStorage;

// Add CSS for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
        color: #10b981;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
        color: #ef4444;
    }
    
    .notification-warning {
        border-left: 4px solid #f59e0b;
        color: #f59e0b;
    }
    
    .notification-info {
        border-left: 4px solid #3b82f6;
        color: #3b82f6;
    }
    
    .notification-close {
        background: none;
        border: none;
        margin-left: auto;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .mobile-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        box-shadow: var(--shadow-lg);
        padding: 1rem;
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    }
    
    .error {
        border-color: #ef4444 !important;
    }
    
    .error-msg {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
