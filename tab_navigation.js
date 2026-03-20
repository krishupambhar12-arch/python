// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and tabs
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked nav link and corresponding tab
            this.classList.add('active');
            const targetTab = this.getAttribute('data-tab');
            const targetTabElement = document.getElementById(targetTab);
            
            if (targetTabElement) {
                targetTabElement.classList.add('active');
                
                // Render charts for the active tab
                if (typeof renderChartsForTab === 'function') {
                    setTimeout(() => {
                        renderChartsForTab(targetTab);
                    }, 100);
                }
            }
        });
    });
});
