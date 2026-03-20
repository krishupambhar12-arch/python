// Global variables
let playStoreData = [];
let charts = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadAndProcessData();
});

// Load and process data
function loadAndProcessData() {
    // Since we can't directly load CSV in browser without a server,
    // let's create sample data that matches the structure
    createSampleData();
    processData();
    
    // Initialize charts for the default active tab (Distribution Analysis)
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        const tabId = activeTab.id;
        renderChartsForTab(tabId);
    }
}

// Create sample data (in real scenario, this would load from CSV)
function createSampleData() {
    const categories = ['FAMILY', 'GAME', 'TOOLS', 'BUSINESS', 'MEDICAL', 'PERSONALIZATION', 'PRODUCTIVITY', 'LIFESTYLE', 'FINANCE', 'SPORTS'];
    const types = ['Free', 'Paid'];
    const contentRatings = ['Everyone', 'Teen', 'Mature 17+', 'Everyone 10+'];
    
    playStoreData = [];
    for (let i = 0; i < 1000; i++) {
        playStoreData.push({
            App: `App ${i}`,
            Category: categories[Math.floor(Math.random() * categories.length)],
            Rating: (Math.random() * 4 + 1).toFixed(1),
            Reviews: Math.floor(Math.random() * 100000),
            Installs: Math.floor(Math.random() * 10000000),
            Type: types[Math.floor(Math.random() * types.length)],
            Price: Math.random() * 50,
            'Content Rating': contentRatings[Math.floor(Math.random() * contentRatings.length)],
            Genres: categories[Math.floor(Math.random() * categories.length)]
        });
    }
}

// Process data similar to p1.py
function processData() {
    // Convert to numeric (like pd.to_numeric)
    playStoreData = playStoreData.map(row => ({
        ...row,
        Rating: parseFloat(row.Rating) || NaN,
        Reviews: parseInt(row.Reviews) || 0,
        Installs: parseInt(String(row.Installs).replace(/[,+]/g, '')) || 0
    }));

    // Fill missing values (like fillna with median)
    const ratingMedian = median(playStoreData.map(d => d.Rating).filter(r => !isNaN(r)));
    const reviewsMedian = median(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)));
    const installsMedian = median(playStoreData.map(d => d.Installs).filter(r => !isNaN(r)));
    
    playStoreData = playStoreData.map(row => ({
        ...row,
        Rating: isNaN(row.Rating) ? ratingMedian : row.Rating,
        Reviews: row.Reviews === 0 ? reviewsMedian : row.Reviews,
        Installs: row.Installs === 0 ? installsMedian : row.Installs
    }));
}

// Calculate median
function median(values) {
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
}

// Calculate percentile
function percentile(values, p) {
    values.sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * values.length) - 1;
    return values[index];
}

// ==================== RENDER CHARTS FOR TAB ====================
function renderChartsForTab(tabName) {
    if (tabName === 'univariate') {
        renderAllUnivariateCharts();
    } else if (tabName === 'bivariate') {
        renderAllBivariateCharts();
    } else if (tabName === 'distribution') {
        renderAllDistributionCharts();
    }
}

// Render all univariate charts at once
function renderAllUnivariateCharts() {
    console.log('Rendering all univariate charts...');
    console.log('Data loaded:', playStoreData.length, 'rows');
    
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    
    // Create all charts with error handling
    try {
        createRatingHistogram();
        console.log('Graph 1 created');
    } catch (error) {
        console.error('Error creating Graph 1:', error);
    }
    
    try {
        createReviewsHistogram();
        console.log('Graph 2 created');
    } catch (error) {
        console.error('Error creating Graph 2:', error);
    }
    
    try {
        createInstallsHistogram();
        console.log('Graph 3 created');
    } catch (error) {
        console.error('Error creating Graph 3:', error);
    }
    
    try {
        createRatingBoxplot();
        console.log('Graph 4 created');
    } catch (error) {
        console.error('Error creating Graph 4:', error);
    }
    
    try {
        createReviewsBoxplot();
        console.log('Graph 5 created');
    } catch (error) {
        console.error('Error creating Graph 5:', error);
    }
    
    try {
        createInstallsBoxplot();
        console.log('Graph 6 created');
    } catch (error) {
        console.error('Error creating Graph 6:', error);
    }
    
    try {
        createCategoryBarChart();
        console.log('Graph 7 created');
    } catch (error) {
        console.error('Error creating Graph 7:', error);
    }
    
    try {
        createFreePaidPieChart();
        console.log('Graph 8 created');
    } catch (error) {
        console.error('Error creating Graph 8:', error);
    }
    
    try {
        createContentRatingBarChart();
        console.log('Graph 9 created');
    } catch (error) {
        console.error('Error creating Graph 9:', error);
    }
    
    try {
        createSortedRatingLineGraph();
        console.log('Graph 10 created');
    } catch (error) {
        console.error('Error creating Graph 10:', error);
    }
    
    try {
        createRatingKDEPlot();
        console.log('Graph 11 created');
    } catch (error) {
        console.error('Error creating Graph 11:', error);
    }
    
    try {
        createReviewsKDEPlot();
        console.log('Graph 12 created');
    } catch (error) {
        console.error('Error creating Graph 12:', error);
    }
    
    try {
        createFirst20RatingsBarChart();
        console.log('Graph 13 created');
    } catch (error) {
        console.error('Error creating Graph 13:', error);
    }
    
    try {
        createFirst20ReviewsBarChart();
        console.log('Graph 14 created');
    } catch (error) {
        console.error('Error creating Graph 14:', error);
    }
    
    try {
        createFirst20InstallsBarChart();
        console.log('Graph 15 created');
    } catch (error) {
        console.error('Error creating Graph 15:', error);
    }
    
    // Add Distribution Analysis graphs (30-33) to Univariate Analysis
    try {
        createRatingDistributionUni();
        console.log('Graph 30 created');
    } catch (error) {
        console.error('Error creating Graph 30:', error);
    }
    
    try {
        createReviewsDistributionUni();
        console.log('Graph 31 created');
    } catch (error) {
        console.error('Error creating Graph 31:', error);
    }
    
    try {
        createInstallsDistributionUni();
        console.log('Graph 32 created');
    } catch (error) {
        console.error('Error creating Graph 32:', error);
    }
    
    try {
        createRatingBoxplotUni();
        console.log('Graph 33 created');
    } catch (error) {
        console.error('Error creating Graph 33:', error);
    }
}

// Render all bivariate charts at once
function renderAllBivariateCharts() {
    console.log('Rendering all bivariate charts...');
    
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    
    // Create all bivariate charts
    try {
        createReviewsRatingScatter();
        console.log('Graph 16 created');
    } catch (error) {
        console.error('Error creating Graph 16:', error);
    }
    
    try {
        createInstallsRatingScatter();
        console.log('Graph 17 created');
    } catch (error) {
        console.error('Error creating Graph 17:', error);
    }
    
    try {
        createInstallsReviewsScatter();
        console.log('Graph 18 created');
    } catch (error) {
        console.error('Error creating Graph 18:', error);
    }
    
    try {
        createAvgRatingCategory();
        console.log('Graph 19 created');
    } catch (error) {
        console.error('Error creating Graph 19:', error);
    }
    
    try {
        createRatingTypeBoxplot();
        console.log('Graph 20 created');
    } catch (error) {
        console.error('Error creating Graph 20:', error);
    }
    
    try {
        createReviewsTypeBoxplot();
        console.log('Graph 21 created');
    } catch (error) {
        console.error('Error creating Graph 21:', error);
    }
    
    try {
        createInstallsTypeBoxplot();
        console.log('Graph 22 created');
    } catch (error) {
        console.error('Error creating Graph 22:', error);
    }
    
    try {
        createHexbinPlot();
        console.log('Graph 23 created');
    } catch (error) {
        console.error('Error creating Graph 23:', error);
    }
    
    try {
        create2DHistogram();
        console.log('Graph 24 created');
    } catch (error) {
        console.error('Error creating Graph 24:', error);
    }
    
    try {
        createSeabornScatter();
        console.log('Graph 25 created');
    } catch (error) {
        console.error('Error creating Graph 25:', error);
    }
    
    try {
        createInstallsRatingScatter2();
        console.log('Graph 26 created');
    } catch (error) {
        console.error('Error creating Graph 26:', error);
    }
    
    try {
        createInstallsReviewsScatter2();
        console.log('Graph 27 created');
    } catch (error) {
        console.error('Error creating Graph 27:', error);
    }
    
    try {
        createRegressionReviewsRating();
        console.log('Graph 28 created');
    } catch (error) {
        console.error('Error creating Graph 28:', error);
    }
    
    try {
        createRegressionInstallsRating();
        console.log('Graph 29 created');
    } catch (error) {
        console.error('Error creating Graph 29:', error);
    }
}

// ==================== UNIVARIATE CHART CREATION FUNCTIONS ====================

// Graph 1: Rating Histogram
function createRatingHistogram() {
    const ctx = document.getElementById('rating-histogram').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5);
    
    const bins = [0, 0, 0, 0];
    ratingData.forEach(rating => {
        if (rating >= 1 && rating < 2) bins[0]++;
        else if (rating >= 2 && rating < 3) bins[1]++;
        else if (rating >= 3 && rating < 4) bins[2]++;
        else if (rating >= 4 && rating <= 5) bins[3]++;
    });
    
    charts['univariate-0'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1-2', '2-3', '3-4', '4-5'],
            datasets: [{
                label: 'Rating Distribution',
                data: bins,
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 1: Rating Histogram' }
            }
        }
    });
}

// Graph 2: Reviews Histogram
function createReviewsHistogram() {
    const ctx = document.getElementById('reviews-histogram').getContext('2d');
    const reviewsData = playStoreData
        .map(d => parseFloat(d.Reviews))
        .filter(reviews => !isNaN(reviews) && reviews >= 0);
    
    const threshold = percentile(reviewsData, 95);
    const filteredData = reviewsData.filter(r => r <= threshold);
    
    const bins = [0, 0, 0, 0, 0];
    const maxReview = Math.max(...filteredData);
    const binSize = maxReview / 5;
    
    filteredData.forEach(review => {
        const binIndex = Math.min(Math.floor(review / binSize), 4);
        bins[binIndex]++;
    });
    
    charts['univariate-1'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            datasets: [{
                label: 'Reviews Distribution',
                data: bins,
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Reviews' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 2: Reviews Histogram' }
            }
        }
    });
}

// Graph 3: Installs Histogram
function createInstallsHistogram() {
    const ctx = document.getElementById('installs-histogram').getContext('2d');
    const installsData = playStoreData
        .map(d => parseFloat(d.Installs))
        .filter(installs => !isNaN(installs) && installs >= 0);
    
    const threshold = percentile(installsData, 95);
    const filteredData = installsData.filter(i => i <= threshold);
    
    const bins = [0, 0, 0, 0, 0];
    const maxInstalls = Math.max(...filteredData);
    const binSize = maxInstalls / 5;
    
    filteredData.forEach(install => {
        const binIndex = Math.min(Math.floor(install / binSize), 4);
        bins[binIndex]++;
    });
    
    charts['univariate-2'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            datasets: [{
                label: 'Installs Distribution',
                data: bins,
                backgroundColor: 'rgba(241, 196, 15, 0.6)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Installs' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 3: Installs Histogram' }
            }
        }
    });
}

// Graph 4: Rating Boxplot (Alternative using bar chart)
function createRatingBoxplot() {
    console.log('Creating Graph 4: Rating Boxplot...');
    const ctx = document.getElementById('rating-boxplot').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5)
        .sort((a, b) => a - b);
    
    console.log('Rating data for boxplot:', ratingData.length, 'values');
    
    // Calculate boxplot statistics
    const q1 = percentile(ratingData, 25);
    const median = percentile(ratingData, 50);
    const q3 = percentile(ratingData, 75);
    const min = Math.min(...ratingData);
    const max = Math.max(...ratingData);
    
    console.log('Boxplot stats - Q1:', q1, 'Median:', median, 'Q3:', q3, 'Min:', min, 'Max:', max);
    
    // Create bar chart to simulate boxplot
    charts['univariate-3'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: [{
                label: 'Rating Distribution',
                data: [min, q1, median, q3, max],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 }
            },
            plugins: {
                title: { display: true, text: 'Graph 4: Rating Boxplot' }
            }
        }
    });
    console.log('Graph 4 created successfully');
}

// Graph 5: Reviews Boxplot (Alternative using bar chart)
function createReviewsBoxplot() {
    console.log('Creating Graph 5: Reviews Boxplot...');
    const ctx = document.getElementById('reviews-boxplot').getContext('2d');
    const reviewsData = playStoreData
        .map(d => parseFloat(d.Reviews))
        .filter(reviews => !isNaN(reviews) && reviews >= 0);
    
    console.log('Reviews data for boxplot:', reviewsData.length, 'values');
    
    const threshold = percentile(reviewsData, 95);
    const filteredData = reviewsData.filter(r => r <= threshold);
    
    // Calculate boxplot statistics
    const q1 = percentile(filteredData, 25);
    const median = percentile(filteredData, 50);
    const q3 = percentile(filteredData, 75);
    const min = Math.min(...filteredData);
    const max = Math.max(...filteredData);
    
    console.log('Boxplot stats - Q1:', q1, 'Median:', median, 'Q3:', q3, 'Min:', min, 'Max:', max);
    
    // Create bar chart to simulate boxplot
    charts['univariate-4'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: [{
                label: 'Reviews Distribution',
                data: [min, q1, median, q3, max],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                title: { display: true, text: 'Graph 5: Reviews Boxplot' }
            }
        }
    });
    console.log('Graph 5 created successfully');
}

// Graph 6: Installs Boxplot (Alternative using bar chart)
function createInstallsBoxplot() {
    console.log('Creating Graph 6: Installs Boxplot...');
    const ctx = document.getElementById('installs-boxplot').getContext('2d');
    const installsData = playStoreData
        .map(d => parseFloat(d.Installs))
        .filter(installs => !isNaN(installs) && installs >= 0);
    
    console.log('Installs data for boxplot:', installsData.length, 'values');
    
    const threshold = percentile(installsData, 95);
    const filteredData = installsData.filter(install => install <= threshold);
    
    // Calculate boxplot statistics
    const q1 = percentile(filteredData, 25);
    const median = percentile(filteredData, 50);
    const q3 = percentile(filteredData, 75);
    const min = Math.min(...filteredData);
    const max = Math.max(...filteredData);
    
    console.log('Boxplot stats - Q1:', q1, 'Median:', median, 'Q3:', q3, 'Min:', min, 'Max:', max);
    
    // Create bar chart to simulate boxplot
    charts['univariate-5'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: [{
                label: 'Installs Distribution',
                data: [min, q1, median, q3, max],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                title: { display: true, text: 'Graph 6: Installs Boxplot' }
            }
        }
    });
    console.log('Graph 6 created successfully');
}

// Graph 7: Category Bar Chart
function createCategoryBarChart() {
    const ctx = document.getElementById('category-bar-chart').getContext('2d');
    const categoryCounts = {};
    playStoreData.forEach(app => {
        categoryCounts[app.Category] = (categoryCounts[app.Category] || 0) + 1;
    });
    
    const sortedCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    charts['univariate-6'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedCategories.map(cat => cat[0]),
            datasets: [{
                label: 'Number of Apps',
                data: sortedCategories.map(cat => cat[1]),
                backgroundColor: 'rgba(155, 89, 182, 0.6)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { ticks: { maxRotation: 45 } }
            },
            plugins: {
                title: { display: true, text: 'Graph 7: Category Bar Chart' }
            }
        }
    });
}

// Graph 8: Free vs Paid Pie Chart
function createFreePaidPieChart() {
    const ctx = document.getElementById('free-paid-pie-chart').getContext('2d');
    const typeCounts = { Free: 0, Paid: 0 };
    playStoreData.forEach(app => {
        typeCounts[app.Type] = (typeCounts[app.Type] || 0) + 1;
    });
    
    charts['univariate-7'] = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(typeCounts),
            datasets: [{
                data: Object.values(typeCounts),
                backgroundColor: [
                    'rgba(52, 152, 219, 0.6)',
                    'rgba(231, 76, 60, 0.6)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(231, 76, 60, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Graph 8: Free vs Paid Pie Chart' }
            }
        }
    });
}

// Graph 9: Content Rating Bar Chart
function createContentRatingBarChart() {
    const ctx = document.getElementById('content-rating-bar-chart').getContext('2d');
    const contentRatingCounts = {};
    playStoreData.forEach(app => {
        contentRatingCounts[app['Content Rating']] = (contentRatingCounts[app['Content Rating']] || 0) + 1;
    });
    
    charts['univariate-8'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(contentRatingCounts),
            datasets: [{
                label: 'Number of Apps',
                data: Object.values(contentRatingCounts),
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { ticks: { maxRotation: 45 } }
            },
            plugins: {
                title: { display: true, text: 'Graph 9: Content Rating Bar Chart' }
            }
        }
    });
}

// Graph 10: Sorted Rating Line Graph
function createSortedRatingLineGraph() {
    const ctx = document.getElementById('sorted-rating-line').getContext('2d');
    const sortedRatings = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5)
        .sort((a, b) => a - b);
    
    charts['univariate-9'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedRatings.map((_, i) => i + 1),
            datasets: [{
                label: 'Sorted Ratings',
                data: sortedRatings,
                backgroundColor: 'rgba(155, 89, 182, 0.2)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 },
                x: { title: { display: true, text: 'App Index' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 10: Sorted Rating Line Graph' }
            }
        }
    });
}

// Graph 11: Rating KDE Plot
function createRatingKDEPlot() {
    const ctx = document.getElementById('rating-kde-plot').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5);
    
    const kdeData = generateKDEData(ratingData, 1, 5, 50);
    
    charts['univariate-10'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 50}, (_, i) => (i * 4 / 50 + 1).toFixed(1)),
            datasets: [{
                label: 'Rating Density',
                data: kdeData,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 11: Rating KDE Plot' }
            }
        }
    });
}

// Graph 12: Reviews KDE Plot
function createReviewsKDEPlot() {
    const ctx = document.getElementById('reviews-kde-plot').getContext('2d');
    const reviewsData = playStoreData
        .map(d => parseFloat(d.Reviews))
        .filter(reviews => !isNaN(reviews) && reviews >= 0);
    
    const threshold = percentile(reviewsData, 95);
    const filteredData = reviewsData.filter(r => r <= threshold);
    const kdeData = generateKDEData(filteredData, 0, threshold, 50);
    
    charts['univariate-11'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 50}, (_, i) => Math.round(i * threshold / 50)),
            datasets: [{
                label: 'Reviews Density',
                data: kdeData,
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: 'rgba(46, 204, 113, 1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Reviews' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 12: Reviews KDE Plot' }
            }
        }
    });
}

// Graph 13: First 20 Ratings Bar Chart
function createFirst20RatingsBarChart() {
    const ctx = document.getElementById('first-20-ratings').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5)
        .slice(0, 20);
    
    charts['univariate-12'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 20}, (_, i) => `App ${i + 1}`),
            datasets: [{
                label: 'Rating',
                data: ratingData,
                backgroundColor: 'rgba(155, 89, 182, 0.6)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 },
                x: { ticks: { maxRotation: 45 } }
            },
            plugins: {
                title: { display: true, text: 'Graph 13: First 20 Ratings Bar Chart' }
            }
        }
    });
}

// Graph 14: First 20 Reviews Bar Chart
function createFirst20ReviewsBarChart() {
    const ctx = document.getElementById('first-20-reviews').getContext('2d');
    const reviewsData = playStoreData
        .map(d => parseFloat(d.Reviews))
        .filter(reviews => !isNaN(reviews) && reviews >= 0)
        .slice(0, 20);
    
    charts['univariate-13'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 20}, (_, i) => `App ${i + 1}`),
            datasets: [{
                label: 'Reviews',
                data: reviewsData,
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { ticks: { maxRotation: 45 } }
            },
            plugins: {
                title: { display: true, text: 'Graph 14: First 20 Reviews Bar Chart' }
            }
        }
    });
}

// Graph 15: First 20 Installs Bar Chart
function createFirst20InstallsBarChart() {
    const ctx = document.getElementById('first-20-installs').getContext('2d');
    const installsData = playStoreData
        .map(d => parseFloat(d.Installs))
        .filter(installs => !isNaN(installs) && installs >= 0)
        .slice(0, 20);
    
    charts['univariate-14'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 20}, (_, i) => `App ${i + 1}`),
            datasets: [{
                label: 'Installs',
                data: installsData,
                backgroundColor: 'rgba(241, 196, 15, 0.6)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { ticks: { maxRotation: 45 } }
            },
            plugins: {
                title: { display: true, text: 'Graph 15: First 20 Installs Bar Chart' }
            }
        }
    });
}

// ==================== BIVARIATE CHART CREATION FUNCTIONS ====================

// Graph 16: Reviews vs Rating Scatter Plot
function createReviewsRatingScatter() {
    const ctx = document.getElementById('reviews-rating-scatter').getContext('2d');
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const data = playStoreData.filter(d => 
        d.Rating >= 1 && d.Rating <= 5 && d.Reviews <= reviews_threshold
    );
    
    charts['bivariate-0'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Reviews vs Rating',
                data: data.map(d => ({x: d.Reviews, y: d.Rating})),
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Reviews' } },
                y: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 16: Reviews vs Rating' }
            }
        }
    });
}

// Graph 17: Installs vs Rating Scatter Plot
function createInstallsRatingScatter() {
    const ctx = document.getElementById('installs-rating-scatter').getContext('2d');
    const installs_threshold = percentile(playStoreData.map(d => d.Installs).filter(i => !isNaN(i)), 95);
    const data = playStoreData.filter(d => 
        d.Rating >= 1 && d.Rating <= 5 && d.Installs <= installs_threshold
    );
    
    charts['bivariate-1'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Installs vs Rating',
                data: data.map(d => ({x: d.Installs, y: d.Rating})),
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Installs' } },
                y: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 17: Installs vs Rating' }
            }
        }
    });
}

// Graph 18: Installs vs Reviews Scatter Plot
function createInstallsReviewsScatter() {
    const ctx = document.getElementById('installs-reviews-scatter').getContext('2d');
    const installs_threshold = percentile(playStoreData.map(d => d.Installs).filter(i => !isNaN(i)), 95);
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const data = playStoreData.filter(d => 
        d.Installs <= installs_threshold && d.Reviews <= reviews_threshold
    );
    
    charts['bivariate-2'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Installs vs Reviews',
                data: data.map(d => ({x: d.Installs, y: d.Reviews})),
                backgroundColor: 'rgba(241, 196, 15, 0.6)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Installs' } },
                y: { title: { display: true, text: 'Reviews' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 18: Installs vs Reviews' }
            }
        }
    });
}

// Graph 19: Average Rating by Category
function createAvgRatingCategory() {
    const ctx = document.getElementById('avg-rating-category').getContext('2d');
    const categoryRatings = {};
    
    playStoreData.forEach(app => {
        if (!categoryRatings[app.Category]) {
            categoryRatings[app.Category] = [];
        }
        categoryRatings[app.Category].push(app.Rating);
    });
    
    const avgRatings = Object.keys(categoryRatings).map(category => ({
        category: category,
        avgRating: categoryRatings[category].reduce((a, b) => a + b, 0) / categoryRatings[category].length
    })).sort((a, b) => b.avgRating - a.avgRating).slice(0, 10);
    
    charts['bivariate-3'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: avgRatings.map(item => item.category),
            datasets: [{
                label: 'Average Rating',
                data: avgRatings.map(item => item.avgRating),
                backgroundColor: 'rgba(155, 89, 182, 0.6)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 },
                x: { ticks: { maxRotation: 45 } }
            },
            plugins: {
                title: { display: true, text: 'Graph 19: Average Rating by Category' }
            }
        }
    });
}

// Graph 20: Rating by Type Boxplot (Alternative using bar chart)
function createRatingTypeBoxplot() {
    const ctx = document.getElementById('rating-type-boxplot').getContext('2d');
    const freeApps = playStoreData.filter(app => app.Type === 'Free').map(app => app.Rating);
    const paidApps = playStoreData.filter(app => app.Type === 'Paid').map(app => app.Rating);
    
    const freeStats = {
        min: Math.min(...freeApps),
        q1: percentile(freeApps, 25),
        median: percentile(freeApps, 50),
        q3: percentile(freeApps, 75),
        max: Math.max(...freeApps)
    };
    
    const paidStats = {
        min: Math.min(...paidApps),
        q1: percentile(paidApps, 25),
        median: percentile(paidApps, 50),
        q3: percentile(paidApps, 75),
        max: Math.max(...paidApps)
    };
    
    charts['bivariate-4'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Free Min', 'Free Q1', 'Free Median', 'Free Q3', 'Free Max', 'Paid Min', 'Paid Q1', 'Paid Median', 'Paid Q3', 'Paid Max'],
            datasets: [{
                label: 'Rating by Type',
                data: [freeStats.min, freeStats.q1, freeStats.median, freeStats.q3, freeStats.max, 
                       paidStats.min, paidStats.q1, paidStats.median, paidStats.q3, paidStats.max],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)', 
                    'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)',
                    'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)', 
                    'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 }
            },
            plugins: {
                title: { display: true, text: 'Graph 20: Rating by Type' }
            }
        }
    });
}

// Graph 21: Reviews by Type Boxplot (Alternative using bar chart)
function createReviewsTypeBoxplot() {
    const ctx = document.getElementById('reviews-type-boxplot').getContext('2d');
    const freeApps = playStoreData.filter(app => app.Type === 'Free').map(app => app.Reviews);
    const paidApps = playStoreData.filter(app => app.Type === 'Paid').map(app => app.Reviews);
    
    const freeStats = {
        min: Math.min(...freeApps),
        q1: percentile(freeApps, 25),
        median: percentile(freeApps, 50),
        q3: percentile(freeApps, 75),
        max: Math.max(...freeApps)
    };
    
    const paidStats = {
        min: Math.min(...paidApps),
        q1: percentile(paidApps, 25),
        median: percentile(paidApps, 50),
        q3: percentile(paidApps, 75),
        max: Math.max(...paidApps)
    };
    
    charts['bivariate-5'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Free Min', 'Free Q1', 'Free Median', 'Free Q3', 'Free Max', 'Paid Min', 'Paid Q1', 'Paid Median', 'Paid Q3', 'Paid Max'],
            datasets: [{
                label: 'Reviews by Type',
                data: [freeStats.min, freeStats.q1, freeStats.median, freeStats.q3, freeStats.max, 
                       paidStats.min, paidStats.q1, paidStats.median, paidStats.q3, paidStats.max],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)', 
                    'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)',
                    'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)', 
                    'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                title: { display: true, text: 'Graph 21: Reviews by Type' }
            }
        }
    });
}

// Graph 22: Installs by Type Boxplot (Alternative using bar chart)
function createInstallsTypeBoxplot() {
    const ctx = document.getElementById('installs-type-boxplot').getContext('2d');
    const freeApps = playStoreData.filter(app => app.Type === 'Free').map(app => app.Installs);
    const paidApps = playStoreData.filter(app => app.Type === 'Paid').map(app => app.Installs);
    
    const freeStats = {
        min: Math.min(...freeApps),
        q1: percentile(freeApps, 25),
        median: percentile(freeApps, 50),
        q3: percentile(freeApps, 75),
        max: Math.max(...freeApps)
    };
    
    const paidStats = {
        min: Math.min(...paidApps),
        q1: percentile(paidApps, 25),
        median: percentile(paidApps, 50),
        q3: percentile(paidApps, 75),
        max: Math.max(...paidApps)
    };
    
    charts['bivariate-6'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Free Min', 'Free Q1', 'Free Median', 'Free Q3', 'Free Max', 'Paid Min', 'Paid Q1', 'Paid Median', 'Paid Q3', 'Paid Max'],
            datasets: [{
                label: 'Installs by Type',
                data: [freeStats.min, freeStats.q1, freeStats.median, freeStats.q3, freeStats.max, 
                       paidStats.min, paidStats.q1, paidStats.median, paidStats.q3, paidStats.max],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)', 
                    'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.6)',
                    'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)', 
                    'rgba(231, 76, 60, 0.6)', 'rgba(231, 76, 60, 0.6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                title: { display: true, text: 'Graph 22: Installs by Type' }
            }
        }
    });
}

// Graph 23: Hexbin Plot (Alternative using scatter)
function createHexbinPlot() {
    const ctx = document.getElementById('hexbin-plot').getContext('2d');
    const installs_threshold = percentile(playStoreData.map(d => d.Installs).filter(i => !isNaN(i)), 95);
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const data = playStoreData.filter(d => 
        d.Installs <= installs_threshold && d.Reviews <= reviews_threshold
    );
    
    charts['bivariate-7'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Installs vs Reviews (Hexbin Alternative)',
                data: data.map(d => ({x: d.Reviews, y: d.Installs})),
                backgroundColor: 'rgba(155, 89, 182, 0.6)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Reviews' } },
                y: { title: { display: true, text: 'Installs' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 23: Hexbin Plot' }
            }
        }
    });
}

// Graph 24: 2D Histogram (Alternative using scatter)
function create2DHistogram() {
    const ctx = document.getElementById('2d-histogram').getContext('2d');
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const data = playStoreData.filter(d => 
        d.Rating >= 1 && d.Rating <= 5 && d.Reviews <= reviews_threshold
    );
    
    charts['bivariate-8'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Reviews vs Rating (2D Histogram Alternative)',
                data: data.map(d => ({x: d.Reviews, y: d.Rating})),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Reviews' } },
                y: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 24: 2D Histogram' }
            }
        }
    });
}

// Graph 25: Seaborn Scatter Plot
function createSeabornScatter() {
    const ctx = document.getElementById('seaborn-scatter').getContext('2d');
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const data = playStoreData.filter(d => 
        d.Rating >= 1 && d.Rating <= 5 && d.Reviews <= reviews_threshold
    );
    
    charts['bivariate-9'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Reviews vs Rating (Seaborn Style)',
                data: data.map(d => ({x: d.Reviews, y: d.Rating})),
                backgroundColor: 'rgba(241, 196, 15, 0.6)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Reviews' } },
                y: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 25: Seaborn Scatter Plot' }
            }
        }
    });
}

// Graph 26: Installs vs Rating Scatter (Second version)
function createInstallsRatingScatter2() {
    const ctx = document.getElementById('installs-rating-scatter-2').getContext('2d');
    const installs_threshold = percentile(playStoreData.map(d => d.Installs).filter(i => !isNaN(i)), 95);
    const data = playStoreData.filter(d => 
        d.Rating >= 1 && d.Rating <= 5 && d.Installs <= installs_threshold
    );
    
    charts['bivariate-10'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Installs vs Rating (Version 2)',
                data: data.map(d => ({x: d.Installs, y: d.Rating})),
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Installs' } },
                y: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 26: Installs vs Rating' }
            }
        }
    });
}

// Graph 27: Installs vs Reviews Scatter (Second version)
function createInstallsReviewsScatter2() {
    const ctx = document.getElementById('installs-reviews-scatter-2').getContext('2d');
    const installs_threshold = percentile(playStoreData.map(d => d.Installs).filter(i => !isNaN(i)), 95);
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const data = playStoreData.filter(d => 
        d.Installs <= installs_threshold && d.Reviews <= reviews_threshold
    );
    
    charts['bivariate-11'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Installs vs Reviews (Version 2)',
                data: data.map(d => ({x: d.Installs, y: d.Reviews})),
                backgroundColor: 'rgba(241, 196, 15, 0.6)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Installs' } },
                y: { title: { display: true, text: 'Reviews' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 27: Installs vs Reviews' }
            }
        }
    });
}

// Graph 28: Regression Plot Reviews vs Rating
function createRegressionReviewsRating() {
    const ctx = document.getElementById('regression-reviews-rating').getContext('2d');
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const data = playStoreData.filter(d => 
        d.Rating >= 1 && d.Rating <= 5 && d.Reviews <= reviews_threshold
    );
    
    // Simple linear regression calculation
    const n = data.length;
    const sumX = data.reduce((sum, d) => sum + d.Reviews, 0);
    const sumY = data.reduce((sum, d) => sum + d.Rating, 0);
    const sumXY = data.reduce((sum, d) => sum + d.Reviews * d.Rating, 0);
    const sumX2 = data.reduce((sum, d) => sum + d.Reviews * d.Reviews, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const minX = Math.min(...data.map(d => d.Reviews));
    const maxX = Math.max(...data.map(d => d.Reviews));
    
    const regressionLine = [
        {x: minX, y: slope * minX + intercept},
        {x: maxX, y: slope * maxX + intercept}
    ];
    
    charts['bivariate-12'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Reviews vs Rating',
                    data: data.map(d => ({x: d.Reviews, y: d.Rating})),
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Regression Line',
                    data: regressionLine,
                    type: 'line',
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Reviews' } },
                y: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 28: Regression Plot Reviews vs Rating' }
            }
        }
    });
}

// Graph 29: Regression Plot Installs vs Rating
function createRegressionInstallsRating() {
    const ctx = document.getElementById('regression-installs-rating').getContext('2d');
    const installs_threshold = percentile(playStoreData.map(d => d.Installs).filter(i => !isNaN(i)), 95);
    const data = playStoreData.filter(d => 
        d.Rating >= 1 && d.Rating <= 5 && d.Installs <= installs_threshold
    );
    
    // Simple linear regression calculation
    const n = data.length;
    const sumX = data.reduce((sum, d) => sum + d.Installs, 0);
    const sumY = data.reduce((sum, d) => sum + d.Rating, 0);
    const sumXY = data.reduce((sum, d) => sum + d.Installs * d.Rating, 0);
    const sumX2 = data.reduce((sum, d) => sum + d.Installs * d.Installs, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const minX = Math.min(...data.map(d => d.Installs));
    const maxX = Math.max(...data.map(d => d.Installs));
    
    const regressionLine = [
        {x: minX, y: slope * minX + intercept},
        {x: maxX, y: slope * maxX + intercept}
    ];
    
    charts['bivariate-13'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Installs vs Rating',
                    data: data.map(d => ({x: d.Installs, y: d.Rating})),
                    backgroundColor: 'rgba(46, 204, 113, 0.6)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Regression Line',
                    data: regressionLine,
                    type: 'line',
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Installs' } },
                y: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 29: Regression Plot Installs vs Rating' }
            }
        }
    });
}

// Helper function to generate KDE data
function generateKDEData(data, min, max, points) {
    const bandwidth = (max - min) / 10;
    const kdeData = [];
    
    for (let i = 0; i < points; i++) {
        const x = min + (max - min) * i / (points - 1);
        let density = 0;
        
        data.forEach(value => {
            const u = (x - value) / bandwidth;
            density += Math.exp(-0.5 * u * u) / (bandwidth * Math.sqrt(2 * Math.PI));
        });
        
        kdeData.push(density);
    }
    
    return kdeData;
}

// ==================== DISTRIBUTION CHART RENDERING ====================
function renderAllDistributionCharts() {
    console.log('Rendering all distribution charts...');
    
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    
    // Create all distribution charts
    try {
        createRatingDistributionDist();
        console.log('Graph 30 created');
    } catch (error) {
        console.error('Error creating Graph 30:', error);
    }
    
    try {
        createReviewsDistributionDist();
        console.log('Graph 31 created');
    } catch (error) {
        console.error('Error creating Graph 31:', error);
    }
    
    try {
        createInstallsDistributionDist();
        console.log('Graph 32 created');
    } catch (error) {
        console.error('Error creating Graph 32:', error);
    }
    
    try {
        createRatingBoxplotDist();
        console.log('Graph 33 created');
    } catch (error) {
        console.error('Error creating Graph 33:', error);
    }
}

// ==================== DISTRIBUTION CHART CREATION FUNCTIONS ====================

// Graph 30: Rating Distribution
function createRatingDistributionDist() {
    const ctx = document.getElementById('rating-distribution-dist').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5);
    
    // Create histogram bins
    const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const binSize = 0.4; // 4/10
    
    ratingData.forEach(rating => {
        const binIndex = Math.min(Math.floor((rating - 1) / binSize), 9);
        bins[binIndex]++;
    });
    
    // Generate KDE-like data
    const kdeData = generateKDEData(ratingData, 1, 5, 50);
    
    charts['distribution-0'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 10}, (_, i) => (i * 0.4 + 1.2).toFixed(1)),
            datasets: [
                {
                    label: 'Rating Histogram',
                    data: bins,
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Density Curve',
                    data: kdeData,
                    type: 'line',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 30: Rating Distribution' }
            }
        }
    });
}

// Graph 31: Reviews Distribution
function createReviewsDistributionDist() {
    const ctx = document.getElementById('reviews-distribution-dist').getContext('2d');
    const reviewsData = playStoreData
        .map(d => parseFloat(d.Reviews))
        .filter(reviews => !isNaN(reviews) && reviews >= 0);
    
    const threshold = percentile(reviewsData, 90);
    const filteredData = reviewsData.filter(r => r <= threshold);
    
    // Create histogram bins
    const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const maxReview = Math.max(...filteredData);
    const binSize = maxReview / 10;
    
    filteredData.forEach(review => {
        const binIndex = Math.min(Math.floor(review / binSize), 9);
        bins[binIndex]++;
    });
    
    // Generate KDE-like data
    const kdeData = generateKDEData(filteredData, 0, maxReview, 50);
    
    charts['distribution-1'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 10}, (_, i) => Math.round(i * binSize)),
            datasets: [
                {
                    label: 'Reviews Histogram',
                    data: bins,
                    backgroundColor: 'rgba(46, 204, 113, 0.6)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Density Curve',
                    data: kdeData,
                    type: 'line',
                    backgroundColor: 'rgba(155, 89, 182, 0.2)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Reviews' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 31: Reviews Distribution' }
            }
        }
    });
}

// Graph 32: Installs Distribution
function createInstallsDistributionDist() {
    const ctx = document.getElementById('installs-distribution-dist').getContext('2d');
    const installsData = playStoreData
        .map(d => parseFloat(d.Installs))
        .filter(installs => !isNaN(installs) && installs >= 0);
    
    const threshold = percentile(installsData, 95);
    const filteredData = installsData.filter(i => i <= threshold);
    
    // Create histogram bins
    const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const maxInstall = Math.max(...filteredData);
    const binSize = maxInstall / 10;
    
    filteredData.forEach(install => {
        const binIndex = Math.min(Math.floor(install / binSize), 9);
        bins[binIndex]++;
    });
    
    // Generate KDE-like data
    const kdeData = generateKDEData(filteredData, 0, maxInstall, 50);
    
    charts['distribution-2'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 10}, (_, i) => Math.round(i * binSize)),
            datasets: [
                {
                    label: 'Installs Histogram',
                    data: bins,
                    backgroundColor: 'rgba(241, 196, 15, 0.6)',
                    borderColor: 'rgba(241, 196, 15, 1)',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Density Curve',
                    data: kdeData,
                    type: 'line',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Installs' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 32: Installs Distribution' }
            }
        }
    });
}

// Graph 33: Rating Boxplot (Alternative using bar chart)
function createRatingBoxplotDist() {
    const ctx = document.getElementById('rating-boxplot-dist').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5)
        .sort((a, b) => a - b);
    
    // Calculate boxplot statistics
    const q1 = percentile(ratingData, 25);
    const median = percentile(ratingData, 50);
    const q3 = percentile(ratingData, 75);
    const min = Math.min(...ratingData);
    const max = Math.max(...ratingData);
    
    // Create bar chart to simulate boxplot
    charts['distribution-3'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: [{
                label: 'Rating Distribution',
                data: [min, q1, median, q3, max],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 }
            },
            plugins: {
                title: { display: true, text: 'Graph 33: Rating Boxplot' }
            }
        }
    });
}

// ==================== UNIVARIATE DISTRIBUTION CHART CREATION FUNCTIONS ====================

// Graph 30: Rating Distribution (Univariate version)
function createRatingDistributionUni() {
    const ctx = document.getElementById('rating-distribution-uni').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5);
    
    // Create histogram bins
    const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const binSize = 0.4; // 4/10
    
    ratingData.forEach(rating => {
        const binIndex = Math.min(Math.floor((rating - 1) / binSize), 9);
        bins[binIndex]++;
    });
    
    // Generate KDE-like data
    const kdeData = generateKDEData(ratingData, 1, 5, 50);
    
    charts['univariate-30'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 10}, (_, i) => (i * 0.4 + 1.2).toFixed(1)),
            datasets: [
                {
                    label: 'Rating Histogram',
                    data: bins,
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Density Curve',
                    data: kdeData,
                    type: 'line',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { min: 1, max: 5, title: { display: true, text: 'Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 30: Rating Distribution' }
            }
        }
    });
}

// Graph 31: Reviews Distribution (Univariate version)
function createReviewsDistributionUni() {
    const ctx = document.getElementById('reviews-distribution-uni').getContext('2d');
    const reviewsData = playStoreData
        .map(d => parseFloat(d.Reviews))
        .filter(reviews => !isNaN(reviews) && reviews >= 0);
    
    const threshold = percentile(reviewsData, 90);
    const filteredData = reviewsData.filter(r => r <= threshold);
    
    // Create histogram bins
    const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const maxReview = Math.max(...filteredData);
    const binSize = maxReview / 10;
    
    filteredData.forEach(review => {
        const binIndex = Math.min(Math.floor(review / binSize), 9);
        bins[binIndex]++;
    });
    
    // Generate KDE-like data
    const kdeData = generateKDEData(filteredData, 0, maxReview, 50);
    
    charts['univariate-31'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 10}, (_, i) => Math.round(i * binSize)),
            datasets: [
                {
                    label: 'Reviews Histogram',
                    data: bins,
                    backgroundColor: 'rgba(46, 204, 113, 0.6)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Density Curve',
                    data: kdeData,
                    type: 'line',
                    backgroundColor: 'rgba(155, 89, 182, 0.2)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Reviews' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 31: Reviews Distribution' }
            }
        }
    });
}

// Graph 32: Installs Distribution (Univariate version)
function createInstallsDistributionUni() {
    const ctx = document.getElementById('installs-distribution-uni').getContext('2d');
    const installsData = playStoreData
        .map(d => parseFloat(d.Installs))
        .filter(installs => !isNaN(installs) && installs >= 0);
    
    const threshold = percentile(installsData, 95);
    const filteredData = installsData.filter(i => i <= threshold);
    
    // Create histogram bins
    const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const maxInstall = Math.max(...filteredData);
    const binSize = maxInstall / 10;
    
    filteredData.forEach(install => {
        const binIndex = Math.min(Math.floor(install / binSize), 9);
        bins[binIndex]++;
    });
    
    // Generate KDE-like data
    const kdeData = generateKDEData(filteredData, 0, maxInstall, 50);
    
    charts['univariate-32'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: 10}, (_, i) => Math.round(i * binSize)),
            datasets: [
                {
                    label: 'Installs Histogram',
                    data: bins,
                    backgroundColor: 'rgba(241, 196, 15, 0.6)',
                    borderColor: 'rgba(241, 196, 15, 1)',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Density Curve',
                    data: kdeData,
                    type: 'line',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true },
                x: { title: { display: true, text: 'Installs' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 32: Installs Distribution' }
            }
        }
    });
}

// Graph 33: Rating Boxplot (Univariate version)
function createRatingBoxplotUni() {
    const ctx = document.getElementById('rating-boxplot-uni').getContext('2d');
    const ratingData = playStoreData
        .map(d => parseFloat(d.Rating))
        .filter(rating => !isNaN(rating) && rating >= 1 && rating <= 5)
        .sort((a, b) => a - b);
    
    // Calculate boxplot statistics
    const q1 = percentile(ratingData, 25);
    const median = percentile(ratingData, 50);
    const q3 = percentile(ratingData, 75);
    const min = Math.min(...ratingData);
    const max = Math.max(...ratingData);
    
    // Create bar chart to simulate boxplot
    charts['univariate-33'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: [{
                label: 'Rating Distribution',
                data: [min, q1, median, q3, max],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 }
            },
            plugins: {
                title: { display: true, text: 'Graph 33: Rating Boxplot' }
            }
        }
    });
}
