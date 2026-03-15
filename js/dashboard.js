// ========================================
// ONLINE GURU - DASHBOARD MODULE
// Complete user-specific dashboard
// ========================================

const Dashboard = {
    // Initialize dashboard
    init() {
        this.checkAuth();
        this.loadUserData();
        this.setupNavigation();
        this.loadOverview();
        this.loadMyCourses();
        this.loadProgress();
        this.loadCertificates();
        this.loadCalendar();
        this.setupEventListeners();
        
        // Force update enrollment badges on init
        this.updateEnrollmentBadges();
    },

    // Check authentication
    checkAuth() {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Get current user
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('onlineguru_user');
            return userStr ? JSON.parse(userStr) : null;
        } catch {
            return null;
        }
    },

    // Load user data into UI
    loadUserData() {
        const user = this.getCurrentUser();
        if (!user) return;

        // Update user name in multiple places
        const userNameElements = document.querySelectorAll('.user-name, #user-name, .profile-name');
        userNameElements.forEach(el => {
            if (el) el.textContent = user.name || 'User';
        });

        // Update user email
        const emailElements = document.querySelectorAll('.user-email, #user-email');
        emailElements.forEach(el => {
            if (el) el.textContent = user.email || '';
        });

        // Update welcome message
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) {
            const hour = new Date().getHours();
            let greeting = 'Good ';
            if (hour < 12) greeting += 'Morning';
            else if (hour < 17) greeting += 'Afternoon';
            else greeting += 'Evening';
            
            welcomeMsg.textContent = `${greeting}, ${user.name.split(' ')[0]}!`;
        }
    },

    // Setup navigation between sections
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-section]');
        const sections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetSection = item.dataset.section;
                
                // Update active states
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Show target section
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${targetSection}-section`) {
                        section.classList.add('active');
                    }
                });

                // Load section-specific content
                this.loadSectionContent(targetSection);

                // Update URL hash
                window.location.hash = targetSection;
            });
        });

        // Check for hash in URL
        if (window.location.hash) {
            const section = window.location.hash.substring(1);
            const targetNav = document.querySelector(`[data-section="${section}"]`);
            if (targetNav) {
                targetNav.click();
            }
        }
    },

    // Load section-specific content
    loadSectionContent(section) {
        switch(section) {
            case 'overview':
                this.loadOverview();
                break;
            case 'courses':
                this.loadMyCourses();
                // Also update enrollment badges
                this.updateEnrollmentBadges();
                break;
            case 'progress':
                this.loadProgress();
                break;
            case 'certificates':
                this.loadCertificates();
                break;
            case 'calendar':
                this.loadCalendar();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    },

    // Update enrollment badges
    updateEnrollmentBadges() {
        const user = this.getCurrentUser();
        if (!user) return;
        
        const enrollments = this.getUserEnrollments(user.id);
        
        // Update sidebar badge
        const badgeElement = document.getElementById('total-courses');
        if (badgeElement) {
            badgeElement.textContent = enrollments.length;
        }
        
        // Update certificate count if needed
        const certificates = this.getUserCertificates(user.id);
        const certBadge = document.getElementById('certificate-count');
        if (certBadge) {
            certBadge.textContent = certificates.length;
        }
        
        // Update overview stats
        const totalCoursesStat = document.getElementById('total-courses-stat');
        if (totalCoursesStat) {
            totalCoursesStat.textContent = enrollments.length;
        }
    },

    // Load overview section
    loadOverview() {
        const user = this.getCurrentUser();
        if (!user) return;

        // Get user data
        const enrollments = this.getUserEnrollments(user.id);
        const progress = this.getUserProgress(user.id);
        const certificates = this.getUserCertificates(user.id);
        
        // Calculate stats
        const totalCourses = enrollments.length;
        const completedCourses = certificates.length;
        const inProgress = enrollments.filter(id => {
            const courseProgress = progress[id];
            return courseProgress && courseProgress.percentage < 100;
        }).length;
        
        const avgProgress = enrollments.reduce((acc, id) => {
            return acc + (progress[id]?.percentage || 0);
        }, 0) / (totalCourses || 1);

        // Update stats
        this.updateStat('total-courses', totalCourses);
        this.updateStat('in-progress', inProgress);
        this.updateStat('completed-courses', completedCourses);
        this.updateStat('avg-progress', Math.round(avgProgress) + '%');

        // Load recent activity
        this.loadRecentActivity(user.id);
        
        // Load recommended courses
        this.loadRecommendedCourses();
    },

    // Load my courses section
    loadMyCourses() {
        const user = this.getCurrentUser();
        console.log('Loading courses for user:', user);
        
        if (!user) {
            console.log('No user found, showing empty state');
            const container = document.getElementById('my-courses-list');
            if (container) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-book"></i>
                        <h3>No courses enrolled yet</h3>
                        <p>Start your learning journey by enrolling in courses</p>
                        <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                    </div>
                `;
            }
            return;
        }

        const enrollments = this.getUserEnrollments(user.id);
        console.log('User enrollments:', enrollments);
        const progress = this.getUserProgress(user.id);
        const container = document.getElementById('my-courses-list');

        if (!container) {
            console.log('Container not found: my-courses-list');
            return;
        }

        const courses = window.Courses?.courses || [];
        console.log('Available courses:', courses.length);
        
        // If no enrollments, show empty state
        if (!enrollments || enrollments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book"></i>
                    <h3>No courses enrolled yet</h3>
                    <p>Start your learning journey by enrolling in courses</p>
                    <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                </div>
            `;
            return;
        }

        const enrolledCourses = courses.filter(c => enrollments.includes(c.id));
        console.log('Enrolled courses found:', enrolledCourses.length);

        container.innerHTML = `
            <div class="small-courses-grid">
                ${enrolledCourses.map((course, index) => {
                    const courseProgress = progress[course.id] || { percentage: 0, completedLessons: 0, totalLessons: course.lessons || 10 };
                    
                    return `
                        <div class="small-course-card glass-card" style="animation-delay: ${index * 0.1}s;">
                            <div class="small-course-video">
                                ${course.videoId ? `
                                    <iframe 
                                        width="100%" 
                                        height="120" 
                                        src="https://www.youtube.com/embed/${course.videoId}?rel=0&modestbranding=1" 
                                        title="${course.title}" 
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen
                                        class="small-video-iframe">
                                    </iframe>
                                ` : `
                                    <img src="https://via.placeholder.com/200x120?text=No+Video" 
                                         alt="${course.title}" 
                                         class="small-course-thumb"
                                         onerror="this.src='https://via.placeholder.com/200x120?text=Course'">
                                `}
                                <div class="small-video-overlay" onclick="Dashboard.openCoursePlayer(${course.id})">
                                    <i class="fas fa-play-circle"></i>
                                </div>
                            </div>
                            
                            <div class="small-course-info">
                                <h5 class="small-course-title">${course.title}</h5>
                                <div class="small-course-meta">
                                    <span class="small-instructor">
                                        <i class="fas fa-chalkboard-teacher"></i> ${course.instructor}
                                    </span>
                                    <span class="small-progress">${courseProgress.percentage}%</span>
                                </div>
                                
                                <div class="small-progress-bar">
                                    <div class="small-progress-fill" style="width: ${courseProgress.percentage}%"></div>
                                </div>
                                
                                <button class="btn btn-primary btn-small" onclick="Dashboard.openCoursePlayer(${course.id})">
                                    <i class="fas fa-play"></i> Continue
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // Open course player
    openCoursePlayer(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Navigate to course player with playlist
        window.location.href = `course-player.html?id=${courseId}&playlist=${encodeURIComponent(course.playlistUrl || '')}`;
    },
    generateLessonsList(courseId, completedLessons, totalLessons) {
        let lessonsHTML = '';
        for (let i = 1; i <= totalLessons; i++) {
            const isCompleted = i <= completedLessons;
            const isCurrent = i === completedLessons + 1;
            const lessonTitle = `Lesson ${i}: ${this.getLessonTitle(courseId, i)}`;
            
            lessonsHTML += `
                <div class="lesson-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}" 
                     onclick="Dashboard.openLesson(${courseId}, ${i})">
                    <div class="lesson-number">
                        ${isCompleted ? '<i class="fas fa-check-circle"></i>' : `<span>${i}</span>`}
                    </div>
                    <div class="lesson-info">
                        <h6>${lessonTitle}</h6>
                        <p>${isCompleted ? 'Completed' : isCurrent ? 'Continue here' : 'Not started'}</p>
                    </div>
                    <div class="lesson-action">
                        ${isCurrent ? '<i class="fas fa-play-circle"></i>' : isCompleted ? '<i class="fas fa-redo"></i>' : '<i class="fas fa-lock"></i>'}
                    </div>
                </div>
            `;
        }
        return lessonsHTML;
    },

    // Get lesson title
    getLessonTitle(courseId, lessonNumber) {
        const lessonTitles = {
            1: ['Introduction', 'Getting Started', 'Course Overview'],
            2: ['Basic Concepts', 'Fundamentals', 'Core Principles'],
            3: ['Advanced Topics', 'Deep Dive', 'Expert Level'],
            4: ['Practical Examples', 'Hands-on Practice', 'Real-world Applications'],
            5: ['Best Practices', 'Professional Tips', 'Industry Standards'],
            6: ['Project Work', 'Case Studies', 'Implementation'],
            7: ['Testing & Debugging', 'Quality Assurance', 'Problem Solving'],
            8: ['Optimization', 'Performance Tuning', 'Efficiency'],
            9: ['Final Project', 'Capstone', 'Integration'],
            10: ['Conclusion', 'Summary', 'Next Steps']
        };
        
        const titles = lessonTitles[lessonNumber] || ['Module', 'Chapter', 'Section'];
        return titles[(courseId - 1) % titles.length];
    },

    // Toggle lessons list
    toggleLessonsList(courseId) {
        const lessonsList = document.getElementById(`lessons-${courseId}`);
        if (lessonsList) {
            lessonsList.style.display = lessonsList.style.display === 'none' ? 'block' : 'none';
        }
    },

    // Play course video
    playCourseVideo(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Navigate to professional course player with playlist
        window.location.href = `course-player.html?id=${courseId}&playlist=${encodeURIComponent(course.playlistUrl || '')}`;
    },

    // Open specific lesson
    openLesson(courseId, lessonNumber) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Update progress
        const user = this.getCurrentUser();
        if (user) {
            const progress = this.getUserProgress(user.id);
            if (!progress[courseId]) {
                progress[courseId] = { 
                    completedLessons: 0, 
                    totalLessons: course.lessons || 10, 
                    percentage: 0,
                    currentLesson: lessonNumber,
                    lastWatched: new Date().toISOString()
                };
            }
            
            // Mark lesson as started/completed
            if (lessonNumber > progress[courseId].completedLessons) {
                progress[courseId].completedLessons = lessonNumber - 1;
                progress[courseId].percentage = Math.round((progress[courseId].completedLessons / progress[courseId].totalLessons) * 100);
                progress[courseId].currentLesson = lessonNumber;
                progress[courseId].lastWatched = new Date().toISOString();
                
                // Save progress
                localStorage.setItem(`progress_${user.id}`, JSON.stringify(progress));
                
                // Refresh display
                this.loadMyCourses();
                
                // Show notification
                this.showNotification(`Started ${course.title} - Lesson ${lessonNumber}`, 'info');
            }
        }
        
        // Navigate to course player with specific lesson and playlist
        window.location.href = `course-player.html?id=${courseId}&lesson=${lessonNumber}&playlist=${encodeURIComponent(course.playlistUrl || '')}`;
    },

    // Extract playlist videos from YouTube URL
    async extractPlaylistVideos(playlistUrl) {
        if (!playlistUrl) return [];
        
        try {
            // Extract playlist ID from URL
            const playlistMatch = playlistUrl.match(/[?&]list=([^&]+)/);
            if (!playlistMatch) return [];
            
            const playlistId = playlistMatch[1];
            
            // This would require YouTube API key in production
            // For now, return mock data structure
            return await this.fetchPlaylistFromAPI(playlistId);
        } catch (error) {
            console.error('Error extracting playlist:', error);
            return [];
        }
    },

    // Fetch playlist from YouTube API (mock implementation)
    async fetchPlaylistFromAPI(playlistId) {
        // In production, this would call YouTube API
        // For demo, return mock lessons based on course
        return [
            { id: 1, title: 'Introduction', videoId: 'dQw4w9WgXcQ', duration: '5:30' },
            { id: 2, title: 'Getting Started', videoId: 'jNQXAC9IVRw', duration: '8:15' },
            { id: 3, title: 'Basic Concepts', videoId: 'kJQP7kiw5Fk', duration: '12:45' },
            { id: 4, title: 'Advanced Topics', videoId: 'hY2k1B_8lQ', duration: '15:20' },
            { id: 5, title: 'Practical Examples', videoId: 'VgQ7aWxQKs', duration: '10:10' }
        ];
    },

    // Enhanced course card with playlist support
    generateEnhancedCourseCard(course, progress) {
        const courseProgress = progress[course.id] || { 
            percentage: 0, 
            completedLessons: 0, 
            totalLessons: course.lessons || 10,
            currentLesson: 1 
        };
        
        return `
            <div class="course-progress-card glass-card enhanced-course-card" data-course-id="${course.id}">
                <div class="course-header-section">
                    <div class="course-video-container enhanced-video">
                        ${course.videoId ? `
                            <div class="video-player-wrapper">
                                <iframe 
                                    width="100%" 
                                    height="200" 
                                    src="https://www.youtube.com/embed/${course.videoId}?rel=0&modestbranding=1" 
                                    title="${course.title}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen
                                    class="course-video-iframe enhanced">
                                </iframe>
                                <div class="video-controls-overlay">
                                    <button class="play-btn" onclick="Dashboard.playCourseVideo(${course.id})">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button class="playlist-btn" onclick="Dashboard.togglePlaylist(${course.id})">
                                        <i class="fas fa-list"></i>
                                    </button>
                                </div>
                            </div>
                        ` : `
                            <div class="no-video-placeholder">
                                <i class="fas fa-video-slash"></i>
                                <p>No video available</p>
                            </div>
                        `}
                    </div>
                    
                    <div class="course-info-section">
                        <div class="course-title-section">
                            <h3 class="course-title">${course.title}</h3>
                            <div class="course-badges">
                                <span class="level-badge ${course.level.toLowerCase()}">${course.level}</span>
                                <span class="rating-badge">⭐ ${course.rating}</span>
                            </div>
                        </div>
                        
                        <div class="course-meta-info">
                            <div class="meta-item">
                                <i class="fas fa-chalkboard-teacher"></i>
                                <span>${course.instructor}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${course.duration}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-book-open"></i>
                                <span>${courseProgress.totalLessons} lessons</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="progress-section">
                    <div class="progress-header">
                        <h4>Learning Progress</h4>
                        <div class="progress-percentage-display">
                            <span class="percentage-number">${courseProgress.percentage}%</span>
                            <div class="progress-ring">
                                <svg width="60" height="60">
                                    <circle cx="30" cy="30" r="25" stroke="#e0e0e0" stroke-width="5" fill="none"/>
                                    <circle cx="30" cy="30" r="25" stroke="#6366f1" stroke-width="5" fill="none"
                                            stroke-dasharray="${157 * courseProgress.percentage / 100} 157"
                                            stroke-dashoffset="0"
                                            transform="rotate(-90 30 30)"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="progress-bar-section">
                        <div class="progress-info-text">
                            <span>Lesson ${courseProgress.currentLesson || 1} of ${courseProgress.totalLessons}</span>
                            <span>${courseProgress.completedLessons} completed</span>
                        </div>
                        <div class="progress-bar-enhanced">
                            <div class="progress-fill-enhanced" style="width: ${courseProgress.percentage}%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="playlist-section" id="playlist-${course.id}" style="display: none;">
                    <div class="playlist-header">
                        <h4><i class="fas fa-list"></i> Course Playlist</h4>
                        <button class="close-playlist" onclick="Dashboard.togglePlaylist(${course.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="playlist-videos" id="playlist-videos-${course.id}">
                        ${this.generatePlaylistVideos(course.id)}
                    </div>
                </div>
                
                <div class="course-actions-enhanced">
                    <button class="btn btn-primary btn-large" onclick="Dashboard.continueCourse(${course.id})">
                        <i class="fas fa-play-circle"></i>
                        <span>Continue Learning</span>
                    </button>
                    <button class="btn btn-outline" onclick="Dashboard.viewCourseInfo(${course.id})">
                        <i class="fas fa-info-circle"></i>
                        <span>Course Details</span>
                    </button>
                    <button class="btn btn-secondary" onclick="Dashboard.downloadCourseMaterials(${course.id})">
                        <i class="fas fa-download"></i>
                        <span>Materials</span>
                    </button>
                </div>
            </div>
        `;
    },

    // Generate playlist videos
    generatePlaylistVideos(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return '';
        
        // Generate mock playlist videos (in production, fetch from YouTube API)
        const videos = [
            { id: 1, title: 'Introduction to Course', duration: '5:30', completed: false },
            { id: 2, title: 'Getting Started with Basics', duration: '8:15', completed: false },
            { id: 3, title: 'Core Concepts Explained', duration: '12:45', completed: false },
            { id: 4, title: 'Advanced Techniques', duration: '15:20', completed: false },
            { id: 5, title: 'Practical Applications', duration: '10:10', completed: false }
        ];
        
        return videos.map((video, index) => `
            <div class="playlist-video-item ${video.completed ? 'completed' : ''}" 
                 onclick="Dashboard.playVideoFromPlaylist(${courseId}, ${video.id})">
                <div class="video-thumbnail">
                    <img src="https://img.youtube.com/vi/${course.videoId}/mqdefault.jpg" 
                         alt="${video.title}" 
                         onerror="this.src='https://via.placeholder.com/120x68?text=Video'">
                    <div class="video-duration">${video.duration}</div>
                    ${video.completed ? '<div class="completed-badge"><i class="fas fa-check"></i></div>' : ''}
                </div>
                <div class="video-info">
                    <h6>Lesson ${video.id}: ${video.title}</h6>
                    <div class="video-meta">
                        <span class="lesson-number">Lesson ${video.id}</span>
                        <span class="video-status">${video.completed ? 'Completed' : 'Not started'}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Toggle playlist display
    togglePlaylist(courseId) {
        const playlistSection = document.getElementById(`playlist-${courseId}`);
        if (playlistSection) {
            playlistSection.style.display = playlistSection.style.display === 'none' ? 'block' : 'none';
        }
    },

    // Continue course (enhanced)
    continueCourse(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Navigate to enhanced course player
        window.location.href = `course-player.html?id=${courseId}&playlist=${encodeURIComponent(course.playlistUrl || '')}&mode=enhanced`;
    },

    // Play video from playlist
    playVideoFromPlaylist(courseId, videoId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Update progress
        const user = this.getCurrentUser();
        if (user) {
            const progress = this.getUserProgress(user.id);
            if (!progress[courseId]) {
                progress[courseId] = { 
                    completedLessons: 0, 
                    totalLessons: course.lessons || 10, 
                    percentage: 0,
                    currentLesson: videoId
                };
            }
            
            progress[courseId].currentLesson = videoId;
            progress[courseId].lastWatched = new Date().toISOString();
            
            // Save progress
            localStorage.setItem(`progress_${user.id}`, JSON.stringify(progress));
            
            // Refresh display
            this.loadMyCourses();
        }
        
        // Navigate to specific video
        window.location.href = `course-player.html?id=${courseId}&video=${videoId}&playlist=${encodeURIComponent(course.playlistUrl || '')}`;
    },

    // Download course materials
    downloadCourseMaterials(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Show notification
        this.showNotification(`Preparing download for ${course.title}...`, 'info');
        
        // In production, this would trigger actual download
        setTimeout(() => {
            this.showNotification(`${course.title} materials ready for download!`, 'success');
        }, 2000);
    },

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    },

    // Load progress section
    loadProgress() {
        const user = this.getCurrentUser();
        console.log('Loading progress for user:', user);
        
        if (!user) {
            console.log('No user found for progress');
            const container = document.getElementById('progress-list');
            if (container) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-chart-line"></i>
                        <h3>No progress data yet</h3>
                        <p>Start learning to see your progress here</p>
                        <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                    </div>
                `;
            }
            return;
        }

        const progress = this.getUserProgress(user.id);
        console.log('User progress data:', progress);
        const courses = window.Courses?.courses || [];
        const container = document.getElementById('progress-list');

        if (!container) return;

        const progressItems = Object.entries(progress).map(([courseId, data]) => {
            const course = courses.find(c => c.id === parseInt(courseId));
            if (!course) return '';

            return `
                <div class="progress-item">
                    <div class="progress-header">
                        <h4>${course.title}</h4>
                        <span class="progress-percentage">${data.percentage}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${data.percentage}%"></div>
                    </div>
                    <div class="progress-details">
                        <span><i class="fas fa-check-circle"></i> ${data.completedLessons || 0}/${data.totalLessons || course.lessons} lessons</span>
                        <span><i class="fas fa-clock"></i> Last accessed: ${this.formatDate(data.lastAccessed)}</span>
                    </div>
                </div>
            `;
        }).join('');

        if (progressItems) {
            container.innerHTML = progressItems;
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-chart-line"></i>
                    <h3>No progress data yet</h3>
                    <p>Start learning to see your progress here</p>
                    <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                </div>
            `;
        }
    },

    // Load certificates section
    loadCertificates() {
        const user = this.getCurrentUser();
        if (!user) return;

        const certificates = this.getUserCertificates(user.id);
        const container = document.getElementById('certificates-list');

        if (!container) return;

        if (certificates.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-certificate"></i>
                    <h3>No certificates yet</h3>
                    <p>Complete courses to earn certificates</p>
                    <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                </div>
            `;
            return;
        }

        container.innerHTML = certificates.map(cert => `
            <div class="certificate-card">
                <div class="certificate-icon">
                    <i class="fas fa-certificate"></i>
                </div>
                <h4>${cert.courseName}</h4>
                <p>Issued to: ${user.name}</p>
                <p class="certificate-date">${this.formatDate(cert.issueDate)}</p>
                <div class="certificate-actions">
                    <button class="btn btn-outline btn-sm" onclick="Certificate.viewCertificate('${cert.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="Certificate.downloadCertificate('${cert.id}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        `).join('');
    },

    // Load calendar
    loadCalendar() {
        console.log('Loading calendar...');
        const container = document.getElementById('calendar-section');
        if (!container) {
            console.log('Calendar section not found');
            return;
        }

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        console.log('Generating calendar for:', today.toLocaleDateString());

        // Generate calendar HTML
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let calendarHTML = `
            <div class="calendar-container">
                <div class="calendar-header">
                    <button class="btn-icon" onclick="Dashboard.prevMonth()"><i class="fas fa-chevron-left"></i></button>
                    <h3>${today.toLocaleString('default', { month: 'long' })} ${year}</h3>
                    <button class="btn-icon" onclick="Dashboard.nextMonth()"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="calendar-weekdays">
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>
                <div class="calendar-days">
        `;

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }

        // Fill in the days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate();
            calendarHTML += `
                <div class="calendar-day ${isToday ? 'today' : ''}">
                    <span class="day-number">${day}</span>
                </div>
            `;
        }

        calendarHTML += '</div></div>';
        
        // Find the section content area and update it
        const sectionContent = container.querySelector('.section-header');
        if (sectionContent) {
            sectionContent.insertAdjacentHTML('afterend', calendarHTML);
        } else {
            container.innerHTML = calendarHTML;
        }
    },

    // Load recent activity
    loadRecentActivity(userId) {
        const activities = JSON.parse(localStorage.getItem('onlineguru_activities')) || {};
        const userActivities = activities[userId] || [];
        const container = document.getElementById('recent-activity');

        if (!container) return;

        if (userActivities.length === 0) {
            container.innerHTML = `
                <div class="empty-state small">
                    <p>No recent activity</p>
                </div>
            `;
            return;
        }

        container.innerHTML = userActivities.slice(0, 5).map(activity => `
            <div class="feed-item">
                <div class="feed-icon">
                    <i class="fas fa-${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="feed-content">
                    <p>${activity.description}</p>
                    <span class="feed-time">${this.timeAgo(activity.timestamp)}</span>
                </div>
            </div>
        `).join('');
    },

    // Load recommended courses
    loadRecommendedCourses() {
        const user = this.getCurrentUser();
        if (!user) return;

        const enrollments = this.getUserEnrollments(user.id);
        const courses = window.Courses?.courses || [];
        const container = document.getElementById('recommended-courses');

        if (!container) return;

        // Filter out enrolled courses and get random recommendations
        const recommended = courses
            .filter(c => !enrollments.includes(c.id))
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        container.innerHTML = recommended.map(course => `
            <div class="course-card mini" onclick="window.location.href='course-player.html?id=${course.id}'">
                <img src="https://img.youtube.com/vi/${course.videoId}/mqdefault.jpg" alt="${course.title}">
                <div class="course-info">
                    <h4>${course.title}</h4>
                    <p>${course.instructor}</p>
                </div>
            </div>
        `).join('');
    },

    // Setup event listeners
    setupEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    window.logout();
                }
            });
        }
    },

    // Helper: Get user enrollments
    getUserEnrollments(userId) {
        // Try both possible storage keys for consistency
        let enrollments = JSON.parse(localStorage.getItem('onlineguru_enrollments')) || {};
        
        // If using the new format, parse it correctly
        if (typeof enrollments === 'object' && enrollments[userId]) {
            return enrollments[userId];
        }
        
        // Fallback to old format if needed
        const oldFormat = JSON.parse(localStorage.getItem(`enrollments_${userId}`)) || [];
        return oldFormat;
    },

    // Helper: Get user progress
    getUserProgress(userId) {
        const progress = JSON.parse(localStorage.getItem('onlineguru_progress')) || {};
        return progress[userId] || {};
    },

    // Helper: Get user certificates
    getUserCertificates(userId) {
        const certificates = JSON.parse(localStorage.getItem('onlineguru_certificates')) || {};
        return certificates[userId] || [];
    },

    // Helper: Update stat element
    updateStat(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    },

    // Helper: Format date
    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Helper: Time ago
    timeAgo(dateString) {
        if (!dateString) return 'Never';
        
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        
        return this.formatDate(dateString);
    },

    // Helper: Get activity icon
    getActivityIcon(type) {
        const icons = {
            enrollment: 'graduation-cap',
            completion: 'trophy',
            progress: 'chart-line',
            login: 'sign-in-alt',
            default: 'clock'
        };
        return icons[type] || icons.default;
    },
    
    // Load settings section
    loadSettings() {
        this.renderSettings();
    },

    // Settings functionality
    renderSettings() {
        // Update settings form with current user data
        const nameInput = document.getElementById('settings-name');
        const emailInput = document.getElementById('settings-email');
        const notificationsSelect = document.getElementById('settings-notifications');
        
        if (OnlineGuru.user) {
            if (nameInput) nameInput.value = OnlineGuru.user.name;
            if (emailInput) emailInput.value = OnlineGuru.user.email;
            if (notificationsSelect) {
                notificationsSelect.value = OnlineGuru.user.settings?.notifications || 'all';
            }
        }
        
        // Setup save settings handler
        this.setupSettingsSaveHandler();
    },
    
    setupSettingsSaveHandler() {
        const saveBtn = document.getElementById('save-settings-btn');
        if (saveBtn) {
            saveBtn.onclick = () => this.saveSettings();
        }
    },
    
    saveSettings() {
        const nameInput = document.getElementById('settings-name');
        const emailInput = document.getElementById('settings-email');
        const notificationsSelect = document.getElementById('settings-notifications');
        
        if (!nameInput || !emailInput || !notificationsSelect) {
            showNotification('Settings form not found', 'error');
            return;
        }
        
        const newName = nameInput.value.trim();
        const newEmail = emailInput.value.trim();
        const notifications = notificationsSelect.value;
        
        // Validation
        if (!newName || !newEmail) {
            showNotification('Name and email are required', 'error');
            return;
        }
        
        if (!this.isValidEmail(newEmail)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Update user data
        if (OnlineGuru.user) {
            const oldName = OnlineGuru.user.name;
            const oldEmail = OnlineGuru.user.email;
            
            OnlineGuru.user.name = newName;
            OnlineGuru.user.email = newEmail;
            OnlineGuru.user.settings = OnlineGuru.user.settings || {};
            OnlineGuru.user.settings.notifications = notifications;
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(OnlineGuru.user));
            
            // Update UI elements
            this.updateUserInterface(oldName, oldEmail, newName, newEmail);
            
            // Show success message
            showNotification('Settings updated successfully!', 'success');
        }
    },
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    updateUserInterface(oldName, oldEmail, newName, newEmail) {
        // Update user name in navigation
        const userNameElements = document.querySelectorAll('#user-name, .user-name');
        userNameElements.forEach(element => {
            if (element) element.textContent = newName;
        });
        
        // Update email in profile section if exists
        const emailElements = document.querySelectorAll('.user-email');
        emailElements.forEach(element => {
            if (element) element.textContent = newEmail;
        });
        
        // Update any certificates with new name
        this.updateCertificateNames(oldName, newName);
    },
    
    updateCertificateNames(oldName, newName) {
        // Update certificate templates if they exist
        const certificateElements = document.querySelectorAll('.certificate-name');
        certificateElements.forEach(element => {
            if (element && element.textContent.includes(oldName)) {
                element.textContent = newName;
            }
        });
    },

    // View course information
    viewCourseInfo(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Show course details modal or navigate to course page
        alert(`Course Details:\n\nTitle: ${course.title}\nInstructor: ${course.instructor}\nDuration: ${course.duration}\nLevel: ${course.level}\nRating: ${course.rating} ⭐\n\nDescription: ${course.description || 'No description available'}`);
    },

    // Navigate to course player
    continueCourse(courseId) {
        window.location.href = `course-player.html?id=${courseId}`;
    },

    // Ultra-professional course interactions
    selectCourse(courseId, element) {
        // Remove previous selections
        document.querySelectorAll('.course-card').forEach(card => {
            card.classList.remove('selected');
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add selected class and animation
        element.currentTarget.classList.add('selected');
        element.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        
        // Store selected course
        this.selectedCourseId = courseId;
        
        // Show course details
        this.showCourseDetails(courseId);
    },
    
    hoverCourse(courseId, element) {
        if (!element.currentTarget.classList.contains('selected')) {
            element.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
        }
    },
    
    unhoverCourse(courseId, element) {
        if (!element.currentTarget.classList.contains('selected')) {
            element.currentTarget.style.transform = 'translateY(0) scale(1)';
        }
    },
    
    viewCourseDetails(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Navigate to course player or show modal
        window.location.href = `course-player.html?id=${courseId}`;
    },
    
    showCourseDetails(courseId) {
        const course = window.Courses?.courses?.find(c => c.id === courseId);
        if (!course) return;
        
        // Update selected course info
        const selectedInfo = document.getElementById('selected-course-info');
        if (selectedInfo) {
            selectedInfo.innerHTML = `
                <div class="glass-card">
                    <h3>${course.title}</h3>
                    <p><strong>Instructor:</strong> ${course.instructor}</p>
                    <p><strong>Duration:</strong> ${course.duration}</p>
                    <p><strong>Level:</strong> ${course.level}</p>
                    <p><strong>Rating:</strong> ${course.rating} ⭐</p>
                    <button class="btn btn-primary" onclick="window.location.href='course-player.html?id=${courseId}'">
                        <i class="fas fa-play"></i> Start Learning
                    </button>
                </div>
            `;
        }
    }
};

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Dashboard.init();
});

// Make Dashboard available globally
window.Dashboard = Dashboard;