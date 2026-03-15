// ========================================
// ONLINE GURU - CERTIFICATE GENERATION MODULE
// Professional certificate creation and management
// ========================================

const Certificate = {
    // Certificate template
    template: {
        header: 'ONLINEGURU',
        title: 'Certificate of Completion',
        body: 'This is proudly presented to',
        footer: 'for successfully completing the course',
        signature: 'OnlineGuru Education Team',
        website: 'www.onlineguru.com'
    },

    // Generate unique certificate ID
    generateCertificateId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const user = this.getCurrentUser();
        return `OG-${timestamp}-${random}-${user?.id || '000'}`;
    },

    // Generate certificate data
    generateCertificateData(courseId) {
        const user = this.getCurrentUser();
        const course = this.getCourseById(courseId);
        
        if (!user || !course) return null;

        return {
            id: this.generateCertificateId(),
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            courseId: course.id,
            courseName: course.title,
            instructor: course.instructor,
            issueDate: new Date().toISOString(),
            completionDate: new Date().toISOString().split('T')[0],
            template: this.template,
            verified: true
        };
    },

    // Create certificate HTML
    createCertificateHTML(certificateData) {
        const issueDate = new Date(certificateData.issueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="certificate-container" id="certificate-${certificateData.id}">
                <div class="certificate-header">
                    <h1>${certificateData.template.header}</h1>
                    <div class="subtitle">Elite Learning Platform</div>
                </div>
                
                <div class="certificate-content">
                    <h2>${certificateData.template.title}</h2>
                    <p class="presented-to">${certificateData.template.body}</p>
                    <div class="student-name">${certificateData.userName}</div>
                    <p class="completion-text">${certificateData.template.footer}</p>
                    <div class="course-name">${certificateData.courseName}</div>
                    <p class="instructor-name">Instructor: ${certificateData.instructor}</p>
                </div>
                
                <div class="certificate-footer">
                    <div class="signature-section">
                        <div class="signature-line"></div>
                        <div class="signature-title">${certificateData.template.signature}</div>
                    </div>
                    <div class="certificate-id-section">
                        <div class="certificate-id">ID: ${certificateData.id}</div>
                        <div class="issue-date">Issued: ${issueDate}</div>
                        <div class="verify-badge">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i> Verified
                        </div>
                    </div>
                </div>
                
                <div class="certificate-watermark">
                    <i class="fas fa-certificate"></i>
                </div>
            </div>
        `;
    },

    // Generate certificate on course completion
    generateCertificate(courseId) {
        const user = this.getCurrentUser();
        if (!user) {
            showNotification('Please login to generate certificate', 'error');
            return null;
        }

        const course = this.getCourseById(courseId);
        if (!course) {
            showNotification('Course not found', 'error');
            return null;
        }

        // Check if course is completed (100% progress)
        const progress = this.getCourseProgress(user.id, courseId);
        if (progress.percentage < 100) {
            showNotification('Complete the course first to earn certificate', 'warning');
            return null;
        }

        // Check if certificate already exists
        const existingCert = this.getCertificate(user.id, courseId);
        if (existingCert) {
            showNotification('Certificate already generated', 'info');
            return existingCert;
        }

        // Generate new certificate
        const certificateData = this.generateCertificateData(courseId);
        if (!certificateData) {
            showNotification('Failed to generate certificate', 'error');
            return null;
        }

        // Save certificate
        this.saveCertificate(certificateData);

        // Update progress to mark certificate as issued
        this.markCertificateIssued(user.id, courseId, certificateData.id);

        showNotification('Congratulations! Certificate generated successfully!', 'success');
        
        return certificateData;
    },

    // Save certificate to localStorage
    saveCertificate(certificateData) {
        const certificates = JSON.parse(localStorage.getItem('onlineguru_certificates')) || {};
        const userId = certificateData.userId;
        
        if (!certificates[userId]) {
            certificates[userId] = [];
        }
        
        certificates[userId].push(certificateData);
        localStorage.setItem('onlineguru_certificates', JSON.stringify(certificates));

        // Add activity
        this.addActivity(userId, 'completion', `Earned certificate for ${certificateData.courseName}`);
    },

    // Get certificate for user and course
    getCertificate(userId, courseId) {
        const certificates = JSON.parse(localStorage.getItem('onlineguru_certificates')) || {};
        const userCerts = certificates[userId] || [];
        return userCerts.find(cert => cert.courseId === courseId);
    },

    // Get all certificates for user
    getUserCertificates(userId) {
        const certificates = JSON.parse(localStorage.getItem('onlineguru_certificates')) || {};
        return certificates[userId] || [];
    },

    // Mark certificate as issued in progress
    markCertificateIssued(userId, courseId, certificateId) {
        const progress = JSON.parse(localStorage.getItem('onlineguru_progress')) || {};
        if (progress[userId] && progress[userId][courseId]) {
            progress[userId][courseId].certificateIssued = true;
            progress[userId][courseId].certificateId = certificateId;
            localStorage.setItem('onlineguru_progress', JSON.stringify(progress));
        }
    },

    // Get course progress
    getCourseProgress(userId, courseId) {
        const progress = JSON.parse(localStorage.getItem('onlineguru_progress')) || {};
        return progress[userId]?.[courseId] || { percentage: 0 };
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

    // Get course by ID
    getCourseById(courseId) {
        const courses = window.Courses?.courses || [];
        return courses.find(c => c.id === parseInt(courseId));
    },

    // Add activity
    addActivity(userId, type, description) {
        const activities = JSON.parse(localStorage.getItem('onlineguru_activities')) || {};
        if (!activities[userId]) activities[userId] = [];
        
        activities[userId].unshift({
            id: Date.now(),
            type,
            description,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('onlineguru_activities', JSON.stringify(activities));
    },

    // View certificate
    viewCertificate(certificateId) {
        const certificate = this.findCertificateById(certificateId);
        if (!certificate) {
            showNotification('Certificate not found', 'error');
            return;
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        modal.innerHTML = `
            <div class="certificate-modal-content">
                <button class="certificate-modal-close" onclick="this.closest('.certificate-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
                ${this.createCertificateHTML(certificate)}
            </div>
        `;

        document.body.appendChild(modal);
    },

    // Download certificate as PDF
    downloadCertificate(certificateId) {
        const certificate = this.findCertificateById(certificateId);
        if (!certificate) {
            showNotification('Certificate not found', 'error');
            return;
        }

        // Create printable version
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Certificate - ${certificate.courseName}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <link rel="stylesheet" href="css/certificates.css">
                <style>
                    @media print {
                        body { margin: 0; }
                        .certificate-container { 
                            page-break-after: always;
                            box-shadow: none;
                        }
                    }
                </style>
            </head>
            <body>
                ${this.createCertificateHTML(certificate)}
                <script>
                    window.onload = function() {
                        setTimeout(() => {
                            window.print();
                            setTimeout(() => window.close(), 500);
                        }, 500);
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    },

    // Find certificate by ID
    findCertificateById(certificateId) {
        const certificates = JSON.parse(localStorage.getItem('onlineguru_certificates')) || {};
        for (const userId in certificates) {
            const cert = certificates[userId].find(c => c.id === certificateId);
            if (cert) return cert;
        }
        return null;
    },

    // Verify certificate
    verifyCertificate(certificateId) {
        const certificate = this.findCertificateById(certificateId);
        
        if (certificate) {
            return {
                valid: true,
                certificate: certificate,
                message: 'Certificate is valid and verified'
            };
        } else {
            return {
                valid: false,
                message: 'Certificate not found or invalid'
            };
        }
    },

    // Share certificate (get shareable link)
    getShareableLink(certificateId) {
        const baseUrl = window.location.origin;
        return `${baseUrl}/verify-certificate.html?id=${certificateId}`;
    }
};

// Make Certificate available globally
window.Certificate = Certificate;