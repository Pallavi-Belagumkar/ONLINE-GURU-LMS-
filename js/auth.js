// Authentication System for OnlineGuru

// User Management
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.checkAuthStatus();
    }
    
    // Load users from localStorage
    loadUsers() {
        const users = getFromLocalStorage('onlineguru_users');
        return users || [];
    }
    
    // Save users to localStorage
    saveUsers() {
        saveToLocalStorage('onlineguru_users', this.users);
    }
    
    // Check authentication status
    checkAuthStatus() {
        const userData = getFromLocalStorage('onlineguru_user');
        if (userData) {
            this.currentUser = userData;
            OnlineGuru.user = userData;
            return true;
        }
        return false;
    }
    
    // Register new user
    register(userData) {
        const { name, email, password } = userData;
        
        // Validation
        if (!name || !email || !password) {
            return { success: false, message: 'All fields are required' };
        }
        
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long' };
        }
        
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }
        
        // Check if user already exists
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: 'An account with this email already exists' };
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password, // In production, hash this
            createdAt: new Date().toISOString(),
            coursesEnrolled: [],
            coursesCompleted: [],
            progress: {},
            certificates: [],
            settings: {
                notifications: 'all',
                theme: 'light'
            }
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        return { success: true, message: 'Registration successful! Please login.' };
    }
    
    // Login user
    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Email and password are required' };
        }
        
        const user = this.users.find(u => 
            u.email === email.toLowerCase().trim() && u.password === password
        );
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        
        // Update last login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();
        
        // Set current user
        this.currentUser = user;
        OnlineGuru.user = user;
        saveToLocalStorage('onlineguru_user', user);
        
        return { success: true, user: this.sanitizeUser(user) };
    }
    
    // Logout user
    logout() {
        this.currentUser = null;
        OnlineGuru.user = null;
        removeFromLocalStorage('onlineguru_user');
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
    
    // Update user profile
    updateProfile(updates) {
        if (!this.currentUser) {
            return { success: false, message: 'Not authenticated' };
        }
        
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }
        
        // Allowed fields to update
        const allowedFields = ['name', 'settings'];
        const filteredUpdates = {};
        
        Object.keys(updates).forEach(key => {
            if (allowedFields.includes(key)) {
                filteredUpdates[key] = updates[key];
            }
        });
        
        // Update user
        this.users[userIndex] = { ...this.users[userIndex], ...filteredUpdates };
        this.currentUser = this.users[userIndex];
        OnlineGuru.user = this.currentUser;
        
        this.saveUsers();
        saveToLocalStorage('onlineguru_user', this.currentUser);
        
        return { success: true, message: 'Profile updated successfully' };
    }
    
    // Enroll user in course
    enrollInCourse(courseId) {
        if (!this.currentUser) {
            return { success: false, message: 'Please login to enroll in courses' };
        }
        
        if (this.currentUser.coursesEnrolled.includes(courseId)) {
            return { success: false, message: 'Already enrolled in this course' };
        }
        
        // Add course to enrolled courses
        this.currentUser.coursesEnrolled.push(courseId);
        this.currentUser.progress[courseId] = {
            percentage: 0,
            completedLessons: 0,
            totalLessons: 20,
            lastAccessed: new Date().toISOString(),
            certificateEarned: false
        };
        
        // Update user in array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        this.users[userIndex] = this.currentUser;
        
        this.saveUsers();
        saveToLocalStorage('onlineguru_user', this.currentUser);
        
        return { success: true, message: 'Successfully enrolled in course' };
    }
    
    // Update course progress
    updateCourseProgress(courseId, progressData) {
        if (!this.currentUser) {
            return { success: false, message: 'Not authenticated' };
        }
        
        if (!this.currentUser.coursesEnrolled.includes(courseId)) {
            return { success: false, message: 'Not enrolled in this course' };
        }
        
        // Update progress
        this.currentUser.progress[courseId] = {
            ...this.currentUser.progress[courseId],
            ...progressData,
            lastAccessed: new Date().toISOString()
        };
        
        // Check if course is completed
        if (progressData.percentage >= 100 && !this.currentUser.progress[courseId].certificateEarned) {
            this.currentUser.coursesCompleted.push(courseId);
            this.currentUser.progress[courseId].certificateEarned = true;
            this.currentUser.certificates.push({
                id: `OG-${Date.now()}`,
                courseId: courseId,
                earnedAt: new Date().toISOString()
            });
        }
        
        // Update user in array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        this.users[userIndex] = this.currentUser;
        
        this.saveUsers();
        saveToLocalStorage('onlineguru_user', this.currentUser);
        
        return { success: true, message: 'Progress updated' };
    }
    
    // Validate email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Sanitize user data (remove sensitive info)
    sanitizeUser(user) {
        const { password, ...sanitized } = user;
        return sanitized;
    }
    
    // Get user statistics
    getUserStats() {
        if (!this.currentUser) {
            return null;
        }
        
        const enrolled = this.currentUser.coursesEnrolled.length;
        const completed = this.currentUser.coursesCompleted.length;
        const certificates = this.currentUser.certificates.length;
        
        // Calculate average progress
        let totalProgress = 0;
        let progressCount = 0;
        
        Object.values(this.currentUser.progress).forEach(progress => {
            totalProgress += progress.percentage || 0;
            progressCount++;
        });
        
        const avgProgress = progressCount > 0 ? Math.round(totalProgress / progressCount) : 0;
        
        return {
            enrolled,
            completed,
            certificates,
            avgProgress,
            streak: this.calculateStreak()
        };
    }
    
    // Calculate learning streak
    calculateStreak() {
        // Simplified streak calculation
        const today = new Date();
        const lastLogin = this.currentUser.lastLogin ? new Date(this.currentUser.lastLogin) : null;
        
        if (!lastLogin) return 0;
        
        const daysDiff = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 0) return 1; // Logged in today
        if (daysDiff === 1) return 2; // Logged in yesterday
        
        return 1; // Reset streak
    }
}

// Initialize auth system
window.Auth = new AuthSystem();

// Form Handlers
document.addEventListener('DOMContentLoaded', function() {
    setupAuthForms();
});

function setupAuthForms() {
    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Settings form
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettings);
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    // Validate passwords match
    const confirmPassword = formData.get('confirm-password');
    if (userData.password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Validate terms
    const termsAccepted = formData.get('terms');
    if (!termsAccepted) {
        showNotification('Please accept the terms and conditions', 'error');
        return;
    }
    
    showLoader();
    
    // Register user
    const result = Auth.register(userData);
    
    hideLoader();
    
    if (result.success) {
        showNotification(result.message, 'success');
        e.target.reset();
        
        // Redirect to login after delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        showNotification(result.message, 'error');
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    showLoader();
    
    // Login user
    const result = Auth.login(email, password);
    
    hideLoader();
    
    if (result.success) {
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showNotification(result.message, 'error');
        
        // Show error in form
        const formError = document.getElementById('form-error');
        if (formError) {
            formError.textContent = result.message;
            formError.style.display = 'block';
        }
    }
}

function handleSettings(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const updates = {
        name: formData.get('name'),
        settings: {
            ...Auth.currentUser.settings,
            notifications: formData.get('settings-notifications')
        }
    };
    
    showLoader();
    
    // Update profile
    const result = Auth.updateProfile(updates);
    
    hideLoader();
    
    if (result.success) {
        showNotification(result.message, 'success');
        updateUserUI();
    } else {
        showNotification(result.message, 'error');
    }
}

// Export functions
window.AuthSystem = AuthSystem;
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.handleSettings = handleSettings;
