// Copy your existing script.js content here
// This is a placeholder - you should copy your actual script.js content

// Global variables
let playStoreData = [];
let charts = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadAndProcessData();
    updateUnivariateButtons();
    updateBivariateButtons();
    updateDistributionButtons();
    updateCorrelationButtons();
    updateMLButtons();
    
    // Add keyboard navigation support
    setupKeyboardNavigation();
});

// ==================== KEYBOARD NAVIGATION ====================

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Check if the user is not typing in an input field
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            return; // Don't interfere with typing
        }
        
        // Get the currently active tab
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;
        
        const tabId = activeTab.id;
        
        // Handle arrow keys based on active tab
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                handlePrevious(tabId);
                break;
            case 'ArrowRight':
                event.preventDefault();
                handleNext(tabId);
                break;
        }
    });
}

function handlePrevious(tabId) {
    switch(tabId) {
        case 'univariate':
            navigateUnivariateGraph('prev');
            break;
        case 'bivariate':
            navigateBivariateGraph('prev');
            break;
        case 'distribution':
            navigateDistributionGraph('prev');
            break;
        case 'correlation':
            navigateCorrelationGraph('prev');
            break;
        case 'machine-learning':
            navigateMLGraph('prev');
            break;
    }
}

function handleNext(tabId) {
    switch(tabId) {
        case 'univariate':
            navigateUnivariateGraph('next');
            break;
        case 'bivariate':
            navigateBivariateGraph('next');
            break;
        case 'distribution':
            navigateDistributionGraph('next');
            break;
        case 'correlation':
            navigateCorrelationGraph('next');
            break;
        case 'machine-learning':
            navigateMLGraph('next');
            break;
    }
}

// ==================== UNIVARIATE GRAPH NAVIGATION ====================

let currentUnivariateGraph = 1;
const totalUnivariateGraphs = 15;

function navigateUnivariateGraph(direction) {
    // Hide current graph
    document.getElementById(`univariate-graph-${currentUnivariateGraph}`).style.display = 'none';
    
    // Calculate new graph number
    if (direction === 'next') {
        currentUnivariateGraph = (currentUnivariateGraph % totalUnivariateGraphs) + 1;
    } else {
        currentUnivariateGraph = currentUnivariateGraph === 1 ? totalUnivariateGraphs : currentUnivariateGraph - 1;
    }
    
    // Show new graph
    document.getElementById(`univariate-graph-${currentUnivariateGraph}`).style.display = 'block';
    
    // Update buttons
    updateUnivariateButtons();
}

function updateUnivariateButtons() {
    const prevBtn = document.getElementById('univariate-prev-btn');
    const nextBtn = document.getElementById('univariate-next-btn');
    
    prevBtn.disabled = currentUnivariateGraph === 1;
    nextBtn.disabled = currentUnivariateGraph === totalUnivariateGraphs;
}

// ==================== BIVARIATE GRAPH NAVIGATION ====================

let currentBivariateGraph = 16;
const totalBivariateGraphs = 14;

function navigateBivariateGraph(direction) {
    // Hide current graph
    document.getElementById(`bivariate-graph-${currentBivariateGraph}`).style.display = 'none';
    
    // Calculate new graph number
    if (direction === 'next') {
        currentBivariateGraph = currentBivariateGraph === 29 ? 16 : currentBivariateGraph + 1;
    } else {
        currentBivariateGraph = currentBivariateGraph === 16 ? 29 : currentBivariateGraph - 1;
    }
    
    // Show new graph
    document.getElementById(`bivariate-graph-${currentBivariateGraph}`).style.display = 'block';
    
    // Update buttons
    updateBivariateButtons();
}

function updateBivariateButtons() {
    const prevBtn = document.getElementById('bivariate-prev-btn');
    const nextBtn = document.getElementById('bivariate-next-btn');
    
    prevBtn.disabled = currentBivariateGraph === 16;
    nextBtn.disabled = currentBivariateGraph === 29;
}

// ==================== DISTRIBUTION GRAPH NAVIGATION ====================

let currentDistributionGraph = 30;
const totalDistributionGraphs = 4;

function navigateDistributionGraph(direction) {
    // Hide current graph
    document.getElementById(`distribution-graph-${currentDistributionGraph}`).style.display = 'none';
    
    // Calculate new graph number
    if (direction === 'next') {
        currentDistributionGraph = currentDistributionGraph === 33 ? 30 : currentDistributionGraph + 1;
    } else {
        currentDistributionGraph = currentDistributionGraph === 30 ? 33 : currentDistributionGraph - 1;
    }
    
    // Show new graph
    document.getElementById(`distribution-graph-${currentDistributionGraph}`).style.display = 'block';
    
    // Update buttons
    updateDistributionButtons();
}

function updateDistributionButtons() {
    const prevBtn = document.getElementById('distribution-prev-btn');
    const nextBtn = document.getElementById('distribution-next-btn');
    
    prevBtn.disabled = currentDistributionGraph === 30;
    nextBtn.disabled = currentDistributionGraph === 33;
}

// ==================== CORRELATION GRAPH NAVIGATION ====================

let currentCorrelationGraph = 34;
const totalCorrelationGraphs = 3;

function navigateCorrelationGraph(direction) {
    // Hide current graph
    document.getElementById(`correlation-graph-${currentCorrelationGraph}`).style.display = 'none';
    
    // Calculate new graph number
    if (direction === 'next') {
        currentCorrelationGraph = currentCorrelationGraph === 36 ? 34 : currentCorrelationGraph + 1;
    } else {
        currentCorrelationGraph = currentCorrelationGraph === 34 ? 36 : currentCorrelationGraph - 1;
    }
    
    // Show new graph
    document.getElementById(`correlation-graph-${currentCorrelationGraph}`).style.display = 'block';
    
    // Update buttons
    updateCorrelationButtons();
}

function updateCorrelationButtons() {
    const prevBtn = document.getElementById('correlation-prev-btn');
    const nextBtn = document.getElementById('correlation-next-btn');
    
    prevBtn.disabled = currentCorrelationGraph === 34;
    nextBtn.disabled = currentCorrelationGraph === 36;
}

// ==================== MACHINE LEARNING GRAPH NAVIGATION ====================

let currentMLGraph = 37;
const totalMLGraphs = 6;

function navigateMLGraph(direction) {
    // Hide current graph
    document.getElementById(`machine-learning-graph-${currentMLGraph}`).style.display = 'none';
    
    // Calculate new graph number
    if (direction === 'next') {
        currentMLGraph = currentMLGraph === 42 ? 37 : currentMLGraph + 1;
    } else {
        currentMLGraph = currentMLGraph === 37 ? 42 : currentMLGraph - 1;
    }
    
    // Show new graph
    document.getElementById(`machine-learning-graph-${currentMLGraph}`).style.display = 'block';
    
    // Update buttons
    updateMLButtons();
}

function updateMLButtons() {
    const prevBtn = document.getElementById('machine-learning-prev-btn');
    const nextBtn = document.getElementById('machine-learning-next-btn');
    
    prevBtn.disabled = currentMLGraph === 37;
    nextBtn.disabled = currentMLGraph === 42;
}

// ==================== DATA LOADING ====================

function loadAndProcessData() {
    // Fetch real data from the backend
    fetch('/api/dashboard-stats')
        .then(response => response.json())
        .then(data => {
            console.log('Dashboard data loaded:', data);
            updateDashboardStats(data);
        })
        .catch(error => {
            console.error('Error loading dashboard stats:', error);
        });
    
    // Initialize graph navigation
    updateUnivariateButtons();
    updateBivariateButtons();
    updateDistributionButtons();
    updateCorrelationButtons();
    updateMLButtons();
    
    // Add keyboard navigation support
    setupKeyboardNavigation();
}

function updateDashboardStats(data) {
    // Basic Stats
    const totalAppsEl = document.getElementById('total-apps');
    if (totalAppsEl && data.totalApps) {
        totalAppsEl.textContent = data.totalApps.toLocaleString();
    }
    
    const avgRatingEl = document.getElementById('avg-rating');
    if (avgRatingEl && data.averageRating) {
        avgRatingEl.textContent = data.averageRating.toFixed(2);
    }
    
    const missingValuesEl = document.getElementById('missing-values');
    if (missingValuesEl && data.missingValues) {
        missingValuesEl.textContent = data.missingValues.toLocaleString();
    }
    
    const categoriesEl = document.getElementById('categories');
    if (categoriesEl && data.categories) {
        categoriesEl.textContent = data.categories.toLocaleString();
    }
    
    // Reviews Stats
    const totalReviewsEl = document.getElementById('total-reviews');
    if (totalReviewsEl && data.totalReviews) {
        totalReviewsEl.textContent = data.totalReviews.toLocaleString();
    }
    
    const avgReviewsEl = document.getElementById('avg-reviews');
    if (avgReviewsEl && data.averageReviews) {
        avgReviewsEl.textContent = Math.round(data.averageReviews).toLocaleString();
    }
    
    // Installs Stats
    const totalInstallsEl = document.getElementById('total-installs');
    if (totalInstallsEl && data.totalInstalls) {
        totalInstallsEl.textContent = data.totalInstalls.toLocaleString();
    }
    
    const avgInstallsEl = document.getElementById('avg-installs');
    if (avgInstallsEl && data.averageInstalls) {
        avgInstallsEl.textContent = Math.round(data.averageInstalls).toLocaleString();
    }
    
    // Type Stats
    const freeAppsEl = document.getElementById('free-apps');
    if (freeAppsEl && data.freeApps) {
        freeAppsEl.textContent = data.freeApps.toLocaleString();
    }
    
    const paidAppsEl = document.getElementById('paid-apps');
    if (paidAppsEl && data.paidApps) {
        paidAppsEl.textContent = data.paidApps.toLocaleString();
    }
    
    const avgPriceEl = document.getElementById('avg-price');
    if (avgPriceEl && data.averagePrice) {
        avgPriceEl.textContent = '$' + data.averagePrice.toFixed(2);
    }
    
    // Content Stats
    const totalGenresEl = document.getElementById('total-genres');
    if (totalGenresEl && data.totalGenres) {
        totalGenresEl.textContent = data.totalGenres.toLocaleString();
    }
    
    // Detailed Statistics
    if (data.ratingStats) {
        document.getElementById('rating-min').textContent = data.ratingStats.min.toFixed(2);
        document.getElementById('rating-max').textContent = data.ratingStats.max.toFixed(2);
        document.getElementById('rating-median').textContent = data.ratingStats.median.toFixed(2);
        document.getElementById('rating-std').textContent = data.ratingStats.std.toFixed(2);
    }
    
    if (data.reviewsStats) {
        document.getElementById('reviews-min').textContent = data.reviewsStats.min.toLocaleString();
        document.getElementById('reviews-max').textContent = data.reviewsStats.max.toLocaleString();
        document.getElementById('reviews-median').textContent = Math.round(data.reviewsStats.median).toLocaleString();
        document.getElementById('reviews-std').textContent = Math.round(data.reviewsStats.std).toLocaleString();
    }
    
    if (data.installsStats) {
        document.getElementById('installs-min').textContent = data.installsStats.min.toLocaleString();
        document.getElementById('installs-max').textContent = data.installsStats.max.toLocaleString();
        document.getElementById('installs-median').textContent = Math.round(data.installsStats.median).toLocaleString();
        document.getElementById('installs-std').textContent = Math.round(data.installsStats.std).toLocaleString();
    }
    
    // Top Categories and Genres
    if (data.topCategories) {
        const categoriesList = document.getElementById('top-categories-list');
        categoriesList.innerHTML = '';
        Object.entries(data.topCategories).forEach(([category, count], index) => {
            const item = document.createElement('div');
            item.className = 'top-list-item';
            item.innerHTML = `
                <span class="top-list-name">${index + 1}. ${category}</span>
                <span class="top-list-count">${count.toLocaleString()}</span>
            `;
            categoriesList.appendChild(item);
        });
    }
    
    if (data.topGenres) {
        const genresList = document.getElementById('top-genres-list');
        genresList.innerHTML = '';
        Object.entries(data.topGenres).forEach(([genre, count], index) => {
            const item = document.createElement('div');
            item.className = 'top-list-item';
            item.innerHTML = `
                <span class="top-list-name">${index + 1}. ${genre}</span>
                <span class="top-list-count">${count.toLocaleString()}</span>
            `;
            genresList.appendChild(item);
        });
    }
    
    // Create dashboard charts with real data
    createDashboardCharts(data);
}

// ==================== TAB NAVIGATION ====================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links and tabs
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked link and corresponding tab
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// ==================== ADDITIONAL CHART FUNCTIONS ====================

function createContentRatingChart(contentData) {
    const canvas = document.getElementById('content-rating-chart');
    if (!canvas || !contentData) return;
    
    const ctx = canvas.getContext('2d');
    const ratings = Object.keys(contentData);
    const values = Object.values(contentData);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create simple bar chart
    const barWidth = canvas.width / (ratings.length * 2);
    const maxValue = Math.max(...values);
    
    values.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height * 0.8);
        const x = index * barWidth * 2 + barWidth / 2;
        const y = canvas.height - barHeight;
        
        // Draw bar
        ctx.fillStyle = '#9b59b6';
        ctx.fillRect(x, y, barWidth - 10, barHeight);
        
        // Draw value label
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
}

function createTypeDistributionChart(typeData) {
    const canvas = document.getElementById('type-distribution-chart');
    if (!canvas || !typeData) return;
    
    const ctx = canvas.getContext('2d');
    const types = Object.keys(typeData);
    const values = Object.values(typeData);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create pie chart
    const total = values.reduce((sum, val) => sum + val, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    let currentAngle = -Math.PI / 2;
    const colors = ['#27ae60', '#e74c3c'];
    
    values.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(types[index], labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

function createDashboardCharts(data) {
    // Rating Distribution Chart
    createRatingDistributionChart(data.ratingDistribution);
    
    // Category Distribution Chart
    createCategoryDistributionChart(data.categoryDistribution);
    
    // Content Rating Distribution Chart
    createContentRatingChart(data.contentRatingDistribution);
    
    // Type Distribution Chart (Free vs Paid)
    createTypeDistributionChart(data.typeDistribution);
}
