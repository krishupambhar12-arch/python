// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and tabs
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked link and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            const tab = document.getElementById(tabId);
            
            if (tab) {
                tab.classList.add('active');
            }
        });
    });
    
    // Set initial active tab
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        const tabId = activeLink.getAttribute('data-tab');
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.classList.add('active');
        }
    }
});
