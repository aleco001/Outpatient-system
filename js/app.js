// Main application JavaScript
// This file contains common functions used across the application

// Utility function to check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!isLoggedIn || isLoggedIn !== 'true' || !currentUser.id) {
        return null;
    }
    
    return currentUser;
}

// Initialize dashboard data
function initDashboard() {
    const user = checkAuth();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display user info
    if (document.getElementById('userGreeting')) {
        document.getElementById('userGreeting').textContent = `Hello, ${user.firstName}`;
    }
    
    if (document.getElementById('patientName')) {
        document.getElementById('patientName').textContent = user.firstName;
    }
    
    // Setup logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
    
    // Generate sample data for dashboard
    generateSampleData(user);
}

// Generate sample data for demonstration
function generateSampleData(user) {
    // Sample appointments
    const appointments = [
        { date: '2023-12-15', time: '10:00 AM', doctor: 'Dr. Johnson', type: 'Annual Checkup' },
        { date: '2023-12-22', time: '2:30 PM', doctor: 'Dr. Smith', type: 'Follow-up' }
    ];
    
    // Sample prescriptions
    const prescriptions = [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', refills: 2 },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', refills: 1 },
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', refills: 3 }
    ];
    
    // Store sample data in localStorage if not already there
    if (!localStorage.getItem('appointments')) {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }
    
    if (!localStorage.getItem('prescriptions')) {
        localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    }
    
    // Generate medical records
    if (!localStorage.getItem('medicalRecords')) {
        const records = [
            { date: '2023-11-28', type: 'Blood Test', status: 'Completed', doctor: 'Dr. Johnson' },
            { date: '2023-11-15', type: 'Physical Exam', status: 'Completed', doctor: 'Dr. Smith' },
            { date: '2023-10-20', type: 'X-Ray', status: 'Completed', doctor: 'Dr. Williams' }
        ];
        localStorage.setItem('medicalRecords', JSON.stringify(records));
    }
}

// Format date to readable string
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format time to AM/PM
function formatTime(timeString) {
    return timeString;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
                border-left: 4px solid #0d4d8c;
            }
            
            .notification-success {
                border-left-color: #2e7d32;
            }
            
            .notification-error {
                border-left-color: #d32f2f;
            }
            
            .notification-warning {
                border-left-color: #ef6c00;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                font-size: 20px;
            }
            
            .notification-success .notification-content i {
                color: #2e7d32;
            }
            
            .notification-error .notification-content i {
                color: #d32f2f;
            }
            
            .notification-warning .notification-content i {
                color: #ef6c00;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 16px;
                padding: 0;
                margin-left: 15px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add any global initialization code here
});