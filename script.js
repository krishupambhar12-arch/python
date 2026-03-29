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
            if (currentUnivariateGraph > 1) {
                navigateUnivariateGraph('prev');
            }
            break;
        case 'bivariate':
            if (currentBivariateGraph > 16) {
                navigateBivariateGraph('prev');
            }
            break;
        case 'distribution':
            if (currentDistributionGraph > 30) {
                navigateDistributionGraph('prev');
            }
            break;
        case 'correlation':
            if (currentCorrelationGraph > 34) {
                navigateCorrelationGraph('prev');
            }
            break;
        case 'machine-learning':
            if (currentMLGraph > 37) {
                navigateMLGraph('prev');
            }
            break;
    }
}

function handleNext(tabId) {
    switch(tabId) {
        case 'univariate':
            if (currentUnivariateGraph < totalUnivariateGraphs) {
                navigateUnivariateGraph('next');
            }
            break;
        case 'bivariate':
            if (currentBivariateGraph < totalBivariateGraphs) {
                navigateBivariateGraph('next');
            }
            break;
        case 'distribution':
            if (currentDistributionGraph < totalDistributionGraphs) {
                navigateDistributionGraph('next');
            }
            break;
        case 'correlation':
            if (currentCorrelationGraph < totalCorrelationGraphs) {
                navigateCorrelationGraph('next');
            }
            break;
        case 'machine-learning':
            if (currentMLGraph < totalMLGraphs) {
                navigateMLGraph('next');
            }
            break;
    }
}

// ==================== UNIVARIATE NAVIGATION ====================

// Univariate Analysis Navigation
let currentUnivariateGraph = 1;
const totalUnivariateGraphs = 15;

function navigateUnivariateGraph(direction) {
    // Hide ALL univariate graphs first
    for (let i = 1; i <= totalUnivariateGraphs; i++) {
        const element = document.getElementById(`univariate-graph-${i}`);
        if (element) {
            element.style.display = 'none';
        }
    }
    
    // Update current graph index
    if (direction === 'next' && currentUnivariateGraph < totalUnivariateGraphs) {
        currentUnivariateGraph++;
    } else if (direction === 'prev' && currentUnivariateGraph > 1) {
        currentUnivariateGraph--;
    }
    
    // Show only the current graph
    document.getElementById(`univariate-graph-${currentUnivariateGraph}`).style.display = 'block';
    
    // Update button states
    updateUnivariateButtons();
    
    // Create the chart if it doesn't exist
    createUnivariateChart(currentUnivariateGraph);
}

function updateUnivariateButtons() {
    const prevBtn = document.getElementById('univariate-prev-btn');
    const nextBtn = document.getElementById('univariate-next-btn');
    
    prevBtn.disabled = currentUnivariateGraph === 1;
    nextBtn.disabled = currentUnivariateGraph === totalUnivariateGraphs;
}

function createUnivariateChart(graphNumber) {
    // Check if chart already exists
    const chartId = getChartIdForGraph(graphNumber);
    if (charts[chartId]) {
        return; // Chart already exists
    }
    
    // Create the specific chart based on graph number
    switch(graphNumber) {
        case 1:
            createRatingHistogram();
            break;
        case 2:
            createReviewsHistogram();
            break;
        case 3:
            createInstallsHistogram();
            break;
        case 4:
            createRatingBoxPlot();
            break;
        case 5:
            createReviewsBoxPlot();
            break;
        case 6:
            createInstallsBoxPlot();
            break;
        case 7:
            createCategoryBarChart();
            break;
        case 8:
            createFreePaidPieChart();
            break;
        case 9:
            createContentRatingBarChart();
            break;
        case 10:
            createSortedRatingLine();
            break;
        case 11:
            createRatingKDEPlot();
            break;
        case 12:
            createReviewsKDEPlot();
            break;
        case 13:
            createFirst20Ratings();
            break;
        case 14:
            createFirst20ReviewsBarChart();
            break;
        case 15:
            createFirst20InstallsBarChart();
            break;
    }
}

function getChartIdForGraph(graphNumber) {
    const chartMap = {
        1: 'rating-histogram',
        2: 'reviews-histogram',
        3: 'installs-histogram',
        4: 'rating-boxplot',
        5: 'reviews-boxplot',
        6: 'installs-boxplot',
        7: 'category-bar-chart',
        8: 'free-paid-pie-chart',
        9: 'content-rating-bar-chart',
        10: 'sorted-rating-line',
        11: 'rating-kde-plot',
        12: 'reviews-kde-plot',
        13: 'first-20-ratings',
        14: 'first-20-reviews',
        15: 'first-20-installs'
    };
    return chartMap[graphNumber];
}

// ==================== BIVARIATE NAVIGATION ====================

// Bivariate Analysis Navigation
let currentBivariateGraph = 16;
const totalBivariateGraphs = 29;

function navigateBivariateGraph(direction) {
    // Hide ALL bivariate graphs first
    for (let i = 16; i <= totalBivariateGraphs; i++) {
        const element = document.getElementById(`bivariate-graph-${i}`);
        if (element) {
            element.style.display = 'none';
        }
    }
    
    // Update current graph index
    if (direction === 'next' && currentBivariateGraph < totalBivariateGraphs) {
        currentBivariateGraph++;
    } else if (direction === 'prev' && currentBivariateGraph > 16) {
        currentBivariateGraph--;
    }
    
    // Show only the current graph
    document.getElementById(`bivariate-graph-${currentBivariateGraph}`).style.display = 'block';
    
    // Update button states
    updateBivariateButtons();
    
    // Create the chart if it doesn't exist
    createBivariateChart(currentBivariateGraph);
}

function updateBivariateButtons() {
    const prevBtn = document.getElementById('bivariate-prev-btn');
    const nextBtn = document.getElementById('bivariate-next-btn');
    
    prevBtn.disabled = currentBivariateGraph === 16;
    nextBtn.disabled = currentBivariateGraph === totalBivariateGraphs;
}

function createBivariateChart(graphNumber) {
    // Check if chart already exists
    const chartId = getBivariateChartId(graphNumber);
    if (charts[chartId]) {
        return; // Chart already exists
    }
    
    // Create the specific chart based on graph number
    switch(graphNumber) {
        case 16:
            createReviewsRatingScatter();
            break;
        case 17:
            createInstallsRatingScatter();
            break;
        case 18:
            createInstallsReviewsScatter();
            break;
        case 19:
            createAvgRatingCategory();
            break;
        case 20:
            createRatingTypeBoxplot();
            break;
        case 21:
            createReviewsTypeBoxplot();
            break;
        case 22:
            createInstallsTypeBoxplot();
            break;
        case 23:
            createHexbinPlot();
            break;
        case 24:
            create2DHistogram();
            break;
        case 25:
            createSeabornScatter();
            break;
        case 26:
            createInstallsRatingScatter2();
            break;
        case 27:
            createInstallsReviewsScatter2();
            break;
        case 28:
            createRegressionReviewsRating();
            break;
        case 29:
            createRegressionInstallsRating();
            break;
    }
}

function getBivariateChartId(graphNumber) {
    const chartMap = {
        16: 'reviews-rating-scatter',
        17: 'installs-rating-scatter',
        18: 'installs-reviews-scatter',
        19: 'avg-rating-category',
        20: 'rating-type-boxplot',
        21: 'reviews-type-boxplot',
        22: 'installs-type-boxplot',
        23: 'hexbin-plot',
        24: '2d-histogram',
        25: 'seaborn-scatter',
        26: 'installs-rating-scatter-2',
        27: 'installs-reviews-scatter-2',
        28: 'regression-reviews-rating',
        29: 'regression-installs-rating'
    };
    return chartMap[graphNumber];
}

// ==================== DISTRIBUTION NAVIGATION ====================

// Distribution Analysis Navigation
let currentDistributionGraph = 30;
const totalDistributionGraphs = 33;

function navigateDistributionGraph(direction) {
    // Hide ALL distribution graphs first
    for (let i = 30; i <= totalDistributionGraphs; i++) {
        const element = document.getElementById(`distribution-graph-${i}`);
        if (element) {
            element.style.display = 'none';
        }
    }
    
    // Update current graph index
    if (direction === 'next' && currentDistributionGraph < totalDistributionGraphs) {
        currentDistributionGraph++;
    } else if (direction === 'prev' && currentDistributionGraph > 30) {
        currentDistributionGraph--;
    }
    
    // Show only the current graph
    document.getElementById(`distribution-graph-${currentDistributionGraph}`).style.display = 'block';
    
    // Update button states
    updateDistributionButtons();
    
    // Create the chart if it doesn't exist
    createDistributionChart(currentDistributionGraph);
}

function updateDistributionButtons() {
    const prevBtn = document.getElementById('distribution-prev-btn');
    const nextBtn = document.getElementById('distribution-next-btn');
    
    prevBtn.disabled = currentDistributionGraph === 30;
    nextBtn.disabled = currentDistributionGraph === totalDistributionGraphs;
}

function createDistributionChart(graphNumber) {
    // Check if chart already exists
    const chartId = getDistributionChartId(graphNumber);
    if (charts[chartId]) {
        return; // Chart already exists
    }
    
    // Create the specific chart based on graph number
    switch(graphNumber) {
        case 30:
            createRatingDistributionDist();
            break;
        case 31:
            createReviewsDistributionDist();
            break;
        case 32:
            createInstallsDistributionDist();
            break;
        case 33:
            createRatingBoxplotDist();
            break;
    }
}

function getDistributionChartId(graphNumber) {
    const chartMap = {
        30: 'rating-distribution-dist',
        31: 'reviews-distribution-dist',
        32: 'installs-distribution-dist',
        33: 'rating-boxplot-dist'
    };
    return chartMap[graphNumber];
}

// ==================== CORRELATION NAVIGATION ====================

// Correlation Analysis Navigation
let currentCorrelationGraph = 34;
const totalCorrelationGraphs = 36;

function navigateCorrelationGraph(direction) {
    // Hide ALL correlation graphs first
    for (let i = 34; i <= totalCorrelationGraphs; i++) {
        const element = document.getElementById(`correlation-graph-${i}`);
        if (element) {
            element.style.display = 'none';
        }
    }
    
    // Update current graph index
    if (direction === 'next' && currentCorrelationGraph < totalCorrelationGraphs) {
        currentCorrelationGraph++;
    } else if (direction === 'prev' && currentCorrelationGraph > 34) {
        currentCorrelationGraph--;
    }
    
    // Show only the current graph
    document.getElementById(`correlation-graph-${currentCorrelationGraph}`).style.display = 'block';
    
    // Update button states
    updateCorrelationButtons();
    
    // Create the chart if it doesn't exist
    createCorrelationChart(currentCorrelationGraph);
}

function updateCorrelationButtons() {
    const prevBtn = document.getElementById('correlation-prev-btn');
    const nextBtn = document.getElementById('correlation-next-btn');
    
    prevBtn.disabled = currentCorrelationGraph === 34;
    nextBtn.disabled = currentCorrelationGraph === totalCorrelationGraphs;
}

function createCorrelationChart(graphNumber) {
    // Check if chart already exists
    const chartId = getCorrelationChartId(graphNumber);
    if (charts[chartId]) {
        return; // Chart already exists
    }
    
    // Create the specific chart based on graph number
    switch(graphNumber) {
        case 34:
            createCorrelationHeatmap();
            break;
        case 35:
            createPairPlot();
            break;
        case 36:
            createCorrelationMatrix();
            break;
    }
}

function getCorrelationChartId(graphNumber) {
    const chartMap = {
        34: 'correlation-0',
        35: 'correlation-1',
        36: 'correlation-2'
    };
    return chartMap[graphNumber];
}

// ==================== MACHINE LEARNING NAVIGATION ====================

// Machine Learning Navigation
let currentMLGraph = 37;
const totalMLGraphs = 42;

function navigateMLGraph(direction) {
    // Hide ALL ML graphs first
    for (let i = 37; i <= totalMLGraphs; i++) {
        const element = document.getElementById(`ml-graph-${i}`);
        if (element) {
            element.style.display = 'none';
        }
    }
    
    // Update current graph index
    if (direction === 'next' && currentMLGraph < totalMLGraphs) {
        currentMLGraph++;
    } else if (direction === 'prev' && currentMLGraph > 37) {
        currentMLGraph--;
    }
    
    // Show only the current graph
    document.getElementById(`ml-graph-${currentMLGraph}`).style.display = 'block';
    
    // Update button states
    updateMLButtons();
    
    // Create the chart if it doesn't exist
    createMLChart(currentMLGraph);
}

function updateMLButtons() {
    const prevBtn = document.getElementById('ml-prev-btn');
    const nextBtn = document.getElementById('ml-next-btn');
    
    prevBtn.disabled = currentMLGraph === 37;
    nextBtn.disabled = currentMLGraph === totalMLGraphs;
}

function createMLChart(graphNumber) {
    // Check if chart already exists
    const chartId = getMLChartId(graphNumber);
    if (charts[chartId]) {
        return; // Chart already exists
    }
    
    // Create the specific chart based on graph number
    switch(graphNumber) {
        case 37:
            createLinearRegressionChart();
            break;
        case 38:
            createPredictionScatterChart();
            break;
        case 39:
            createActualScatterChart();
            break;
        case 40:
            createKMeansClusteringChart();
            break;
        case 41:
            createPredictionDistributionChart();
            break;
        case 42:
            createPredictionTrendChart();
            break;
    }
}

function getMLChartId(graphNumber) {
    const chartMap = {
        37: 'ml-0',
        38: 'ml-1',
        39: 'ml-2',
        40: 'ml-3',
        41: 'ml-4',
        42: 'ml-5'
    };
    return chartMap[graphNumber];
}

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
    } else if (tabName === 'correlation') {
        renderAllCorrelationCharts();
    } else if (tabName === 'machine-learning') {
        renderAllMachineLearningCharts();
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

// ==================== UNIVARIATE DISTRIBUTION CHART CREATION FUNCTIONS ====================

// Graph 30: Rating Distribution (Univariate version)
function createRatingDistributionUni() {
    const ctx = document.getElementById('rating-distribution-uni').getContext('2d');
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
    
    charts['univariate-30'] = new Chart(ctx, {
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
    
    const threshold = percentile(reviewsData, 95);
    const filteredData = reviewsData.filter(r => r <= threshold);
    
    const bins = [0, 0, 0, 0, 0];
    const maxReview = Math.max(...filteredData);
    const binSize = maxReview / 5;
    
    filteredData.forEach(review => {
        const binIndex = Math.min(Math.floor(review / binSize), 4);
        bins[binIndex]++;
    });
    
    charts['univariate-31'] = new Chart(ctx, {
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
    
    const bins = [0, 0, 0, 0, 0];
    const maxInstalls = Math.max(...filteredData);
    const binSize = maxInstalls / 5;
    
    filteredData.forEach(install => {
        const binIndex = Math.min(Math.floor(install / binSize), 4);
        bins[binIndex]++;
    });
    
    charts['univariate-32'] = new Chart(ctx, {
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

// ==================== DISTRIBUTION CHART CREATION FUNCTIONS ====================

// Graph 30: Rating Distribution (Distribution version)
function createRatingDistributionDist() {
    const ctx = document.getElementById('rating-distribution-dist').getContext('2d');
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
    
    charts['distribution-0'] = new Chart(ctx, {
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
                title: { display: true, text: 'Graph 30: Rating Distribution' }
            }
        }
    });
}

// Graph 31: Reviews Distribution (Distribution version)
function createReviewsDistributionDist() {
    const ctx = document.getElementById('reviews-distribution-dist').getContext('2d');
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
    
    charts['distribution-1'] = new Chart(ctx, {
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
                title: { display: true, text: 'Graph 31: Reviews Distribution' }
            }
        }
    });
}

// Graph 32: Installs Distribution (Distribution version)
function createInstallsDistributionDist() {
    const ctx = document.getElementById('installs-distribution-dist').getContext('2d');
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
    
    charts['distribution-2'] = new Chart(ctx, {
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
                title: { display: true, text: 'Graph 32: Installs Distribution' }
            }
        }
    });
}

// Graph 33: Rating Boxplot (Distribution version)
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
        if (!isNaN(app.Rating)) {
            if (!categoryRatings[app.Category]) {
                categoryRatings[app.Category] = { sum: 0, count: 0 };
            }
            categoryRatings[app.Category].sum += app.Rating;
            categoryRatings[app.Category].count++;
        }
    });
    
    const avgRatings = Object.entries(categoryRatings).map(([category, data]) => ({
        category,
        avgRating: data.sum / data.count
    })).sort((a, b) => b.avgRating - a.avgRating);
    
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

// Graph 20: Rating by Type Boxplot
function createRatingTypeBoxplot() {
    const ctx = document.getElementById('rating-type-boxplot').getContext('2d');
    const typeRatings = { Free: [], Paid: [] };
    
    playStoreData.forEach(app => {
        if (!isNaN(app.Rating)) {
            typeRatings[app.Type].push(app.Rating);
        }
    });
    
    const boxplotData = Object.entries(typeRatings).map(([type, ratings]) => {
        const sorted = ratings.sort((a, b) => a - b);
        const q1 = percentile(sorted, 25);
        const median = percentile(sorted, 50);
        const q3 = percentile(sorted, 75);
        const min = Math.min(...sorted);
        const max = Math.max(...sorted);
        
        return { type, min, q1, median, q3, max };
    });
    
    charts['bivariate-4'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: boxplotData.map((data, index) => ({
                label: `${data.type} Apps`,
                data: [data.min, data.q1, data.median, data.q3, data.max],
                backgroundColor: index === 0 ? 'rgba(52, 152, 219, 0.6)' : 'rgba(231, 76, 60, 0.6)',
                borderColor: index === 0 ? 'rgba(52, 152, 219, 1)' : 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 5 }
            },
            plugins: {
                title: { display: true, text: 'Graph 20: Rating by Type Boxplot' }
            }
        }
    });
}

// Graph 21: Reviews by Type Boxplot
function createReviewsTypeBoxplot() {
    const ctx = document.getElementById('reviews-type-boxplot').getContext('2d');
    const typeReviews = { Free: [], Paid: [] };
    
    playStoreData.forEach(app => {
        if (!isNaN(app.Reviews)) {
            typeReviews[app.Type].push(app.Reviews);
        }
    });
    
    const boxplotData = Object.entries(typeReviews).map(([type, reviews]) => {
        const sorted = reviews.sort((a, b) => a - b);
        const q1 = percentile(sorted, 25);
        const median = percentile(sorted, 50);
        const q3 = percentile(sorted, 75);
        const min = Math.min(...sorted);
        const max = Math.max(...sorted);
        
        return { type, min, q1, median, q3, max };
    });
    
    charts['bivariate-5'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: boxplotData.map((data, index) => ({
                label: `${data.type} Apps`,
                data: [data.min, data.q1, data.median, data.q3, data.max],
                backgroundColor: index === 0 ? 'rgba(46, 204, 113, 0.6)' : 'rgba(231, 76, 60, 0.6)',
                borderColor: index === 0 ? 'rgba(46, 204, 113, 1)' : 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                title: { display: true, text: 'Graph 21: Reviews by Type Boxplot' }
            }
        }
    });
}

// Graph 22: Installs by Type Boxplot
function createInstallsTypeBoxplot() {
    const ctx = document.getElementById('installs-type-boxplot').getContext('2d');
    const typeInstalls = { Free: [], Paid: [] };
    
    playStoreData.forEach(app => {
        if (!isNaN(app.Installs)) {
            typeInstalls[app.Type].push(app.Installs);
        }
    });
    
    const boxplotData = Object.entries(typeInstalls).map(([type, installs]) => {
        const sorted = installs.sort((a, b) => a - b);
        const q1 = percentile(sorted, 25);
        const median = percentile(sorted, 50);
        const q3 = percentile(sorted, 75);
        const min = Math.min(...sorted);
        const max = Math.max(...sorted);
        
        return { type, min, q1, median, q3, max };
    });
    
    charts['bivariate-6'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min', 'Q1', 'Median', 'Q3', 'Max'],
            datasets: boxplotData.map((data, index) => ({
                label: `${data.type} Apps`,
                data: [data.min, data.q1, data.median, data.q3, data.max],
                backgroundColor: index === 0 ? 'rgba(241, 196, 15, 0.6)' : 'rgba(231, 76, 60, 0.6)',
                borderColor: index === 0 ? 'rgba(241, 196, 15, 1)' : 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                title: { display: true, text: 'Graph 22: Installs by Type Boxplot' }
            }
        }
    });
}

// Graph 23: Hexbin Plot (simplified as scatter)
function createHexbinPlot() {
    const ctx = document.getElementById('hexbin-plot').getContext('2d');
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const installs_threshold = percentile(playStoreData.map(d => d.Installs).filter(i => !isNaN(i)), 95);
    const data = playStoreData.filter(d => 
        d.Reviews <= reviews_threshold && d.Installs <= installs_threshold
    );
    
    charts['bivariate-7'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Reviews vs Installs Density',
                data: data.map(d => ({x: d.Reviews, y: d.Installs})),
                backgroundColor: 'rgba(52, 152, 219, 0.3)',
                borderColor: 'rgba(52, 152, 219, 0.8)',
                borderWidth: 1,
                pointRadius: 3
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

// Graph 24: 2D Histogram (simplified as scatter with opacity)
function create2DHistogram() {
    const ctx = document.getElementById('2d-histogram').getContext('2d');
    const reviews_threshold = percentile(playStoreData.map(d => d.Reviews).filter(r => !isNaN(r)), 95);
    const rating_threshold = 5;
    const data = playStoreData.filter(d => 
        d.Reviews <= reviews_threshold && d.Rating <= rating_threshold
    );
    
    charts['bivariate-8'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Reviews vs Rating Density',
                data: data.map(d => ({x: d.Reviews, y: d.Rating})),
                backgroundColor: 'rgba(46, 204, 113, 0.3)',
                borderColor: 'rgba(46, 204, 113, 0.8)',
                borderWidth: 1,
                pointRadius: 3
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

// Graph 26: Installs vs Rating Scatter (second version)
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
                label: 'Installs vs Rating',
                data: data.map(d => ({x: d.Installs, y: d.Rating})),
                backgroundColor: 'rgba(155, 89, 182, 0.6)',
                borderColor: 'rgba(155, 89, 182, 1)',
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
                title: { display: true, text: 'Graph 26: Installs vs Rating Scatter' }
            }
        }
    });
}

// Graph 27: Installs vs Reviews Scatter (second version)
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
                label: 'Installs vs Reviews',
                data: data.map(d => ({x: d.Installs, y: d.Reviews})),
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
                y: { title: { display: true, text: 'Reviews' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 27: Installs vs Reviews Scatter' }
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
    
    // Simple linear regression
    const reviewsData = data.map(d => d.Reviews);
    const ratingData = data.map(d => d.Rating);
    const n = data.length;
    
    const sumX = reviewsData.reduce((a, b) => a + b, 0);
    const sumY = ratingData.reduce((a, b) => a + b, 0);
    const sumXY = reviewsData.reduce((total, xi, i) => total + xi * ratingData[i], 0);
    const sumX2 = reviewsData.reduce((total, xi) => total + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const maxX = Math.max(...reviewsData);
    const regressionLine = [
        {x: 0, y: intercept},
        {x: maxX, y: slope * maxX + intercept}
    ];
    
    charts['bivariate-12'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data Points',
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
    
    // Simple linear regression
    const installsData = data.map(d => d.Installs);
    const ratingData = data.map(d => d.Rating);
    const n = data.length;
    
    const sumX = installsData.reduce((a, b) => a + b, 0);
    const sumY = ratingData.reduce((a, b) => a + b, 0);
    const sumXY = installsData.reduce((total, xi, i) => total + xi * ratingData[i], 0);
    const sumX2 = installsData.reduce((total, xi) => total + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const maxX = Math.max(...installsData);
    const regressionLine = [
        {x: 0, y: intercept},
        {x: maxX, y: slope * maxX + intercept}
    ];
    
    charts['bivariate-13'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data Points',
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

// ==================== CORRELATION ANALYSIS CHARTS ====================

// Render all correlation charts at once
function renderAllCorrelationCharts() {
    console.log('Rendering all correlation charts...');
    
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    
    // Create all correlation charts
    try {
        createCorrelationHeatmap();
        console.log('Graph 34 created');
    } catch (error) {
        console.error('Error creating Graph 34:', error);
    }
    
    try {
        createPairPlot();
        console.log('Graph 35 created');
    } catch (error) {
        console.error('Error creating Graph 35:', error);
    }
    
    try {
        createCorrelationMatrix();
        console.log('Graph 36 created');
    } catch (error) {
        console.error('Error creating Graph 36:', error);
    }
}

// Graph 34: Correlation Heatmap
function createCorrelationHeatmap() {
    const ctx = document.getElementById('correlation-heatmap').getContext('2d');
    
    // Calculate correlation matrix
    const ratingData = playStoreData.map(d => parseFloat(d.Rating)).filter(r => !isNaN(r));
    const reviewsData = playStoreData.map(d => parseFloat(d.Reviews)).filter(r => !isNaN(r));
    const installsData = playStoreData.map(d => parseFloat(d.Installs)).filter(r => !isNaN(r));
    
    // Simple correlation calculation
    function calculateCorrelation(x, y) {
        const n = Math.min(x.length, y.length);
        const sumX = x.slice(0, n).reduce((a, b) => a + b, 0);
        const sumY = y.slice(0, n).reduce((a, b) => a + b, 0);
        const sumXY = x.slice(0, n).reduce((total, xi, i) => total + xi * y[i], 0);
        const sumX2 = x.slice(0, n).reduce((total, xi) => total + xi * xi, 0);
        const sumY2 = y.slice(0, n).reduce((total, yi) => total + yi * yi, 0);
        
        const correlation = (n * sumXY - sumX * sumY) / 
            Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
        
        return isNaN(correlation) ? 0 : correlation;
    }
    
    const correlationMatrix = [
        [1, calculateCorrelation(ratingData, reviewsData), calculateCorrelation(ratingData, installsData)],
        [calculateCorrelation(reviewsData, ratingData), 1, calculateCorrelation(reviewsData, installsData)],
        [calculateCorrelation(installsData, ratingData), calculateCorrelation(installsData, reviewsData), 1]
    ];
    
    const labels = ['Rating', 'Reviews', 'Installs'];
    
    // Create heatmap data
    const heatmapData = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const value = correlationMatrix[i][j];
            heatmapData.push({
                x: j,
                y: i,
                v: value
            });
        }
    }
    
    charts['correlation-0'] = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Correlation Matrix',
                data: heatmapData.map(d => ({
                    x: d.x,
                    y: d.y,
                    r: Math.abs(d.v) * 20 + 10, // Size based on correlation value
                    v: d.v
                })),
                backgroundColor: function(context) {
                    const value = context.raw.v;
                    const alpha = Math.abs(value);
                    if (value > 0) {
                        return `rgba(46, 204, 113, ${alpha})`; // Green for positive
                    } else if (value < 0) {
                        return `rgba(231, 76, 60, ${alpha})`; // Red for negative
                    } else {
                        return `rgba(149, 165, 166, 0.5)`; // Gray for zero
                    }
                },
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    min: -0.5,
                    max: 2.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return labels[value] || '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Variables'
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.5,
                    max: 2.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return labels[value] || '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Variables'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Graph 34: Correlation Heatmap'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw.v;
                            const xLabel = labels[context.raw.x];
                            const yLabel = labels[context.raw.y];
                            return `${xLabel} vs ${yLabel}: ${value.toFixed(3)}`;
                        }
                    }
                }
            }
        }
    });
}

// Graph 35: Pair Plot
function createPairPlot() {
    const ctx = document.getElementById('pair-plot').getContext('2d');
    
    // Sample data for pair plot
    const sampledData = playStoreData.slice(0, 50);
    
    charts['correlation-1'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Rating vs Reviews',
                    data: sampledData.map(d => ({x: d.Rating, y: d.Reviews})),
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Rating vs Installs',
                    data: sampledData.map(d => ({x: d.Rating, y: d.Installs})),
                    backgroundColor: 'rgba(46, 204, 113, 0.6)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Reviews vs Installs',
                    data: sampledData.map(d => ({x: d.Reviews, y: d.Installs})),
                    backgroundColor: 'rgba(241, 196, 15, 0.6)',
                    borderColor: 'rgba(241, 196, 15, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Variable 1'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Variable 2'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Graph 35: Pair Plot'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: (${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(2)})`;
                        }
                    }
                }
            }
        }
    });
}

// Graph 36: Correlation Matrix
function createCorrelationMatrix() {
    const ctx = document.getElementById('correlation-matrix').getContext('2d');
    
    // Calculate correlation matrix (same as Graph 34)
    const ratingData = playStoreData.map(d => parseFloat(d.Rating)).filter(r => !isNaN(r));
    const reviewsData = playStoreData.map(d => parseFloat(d.Reviews)).filter(r => !isNaN(r));
    const installsData = playStoreData.map(d => parseFloat(d.Installs)).filter(r => !isNaN(r));
    
    function calculateCorrelation(x, y) {
        const n = Math.min(x.length, y.length);
        const sumX = x.slice(0, n).reduce((a, b) => a + b, 0);
        const sumY = y.slice(0, n).reduce((a, b) => a + b, 0);
        const sumXY = x.slice(0, n).reduce((total, xi, i) => total + xi * y[i], 0);
        const sumX2 = x.slice(0, n).reduce((total, xi) => total + xi * xi, 0);
        const sumY2 = y.slice(0, n).reduce((total, yi) => total + yi * yi, 0);
        
        const correlation = (n * sumXY - sumX * sumY) / 
            Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
        
        return isNaN(correlation) ? 0 : correlation;
    }
    
    const correlationMatrix = [
        [1, calculateCorrelation(ratingData, reviewsData), calculateCorrelation(ratingData, installsData)],
        [calculateCorrelation(reviewsData, ratingData), 1, calculateCorrelation(reviewsData, installsData)],
        [calculateCorrelation(installsData, ratingData), calculateCorrelation(installsData, reviewsData), 1]
    ];
    
    const labels = ['Rating', 'Reviews', 'Installs'];
    
    // Create matrix visualization similar to plt.imshow
    const matrixData = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrixData.push({
                x: j,
                y: 2 - i, // Flip y-axis to match matrix orientation
                v: correlationMatrix[i][j]
            });
        }
    }
    
    charts['correlation-2'] = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Correlation Matrix',
                data: matrixData.map(d => ({
                    x: d.x,
                    y: d.y,
                    r: Math.abs(d.v) * 20 + 10, // Size based on correlation value
                    v: d.v
                })),
                backgroundColor: function(context) {
                    const value = context.raw.v;
                    const alpha = Math.abs(value);
                    if (value > 0) {
                        return `rgba(46, 204, 113, ${alpha})`; // Green for positive
                    } else if (value < 0) {
                        return `rgba(231, 76, 60, ${alpha})`; // Red for negative
                    } else {
                        return `rgba(149, 165, 166, 0.5)`; // Gray for zero
                    }
                },
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    min: -0.5,
                    max: 2.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return labels[value] || '';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Variables'
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.5,
                    max: 2.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return labels[2 - value] || ''; // Flip y-axis
                        }
                    },
                    title: {
                        display: true,
                        text: 'Variables'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Graph 36: Correlation Matrix Image'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw.v;
                            const xLabel = labels[context.raw.x];
                            const yLabel = labels[2 - context.raw.y]; // Flip y-axis
                            return `${xLabel} vs ${yLabel}: ${value.toFixed(3)}`;
                        }
                    }
                }
            }
        }
    });
}

// ==================== MACHINE LEARNING CHARTS ====================

// Render all machine learning charts at once
function renderAllMachineLearningCharts() {
    console.log('Rendering all machine learning charts...');
    
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    
    // Create machine learning charts
    try {
        createLinearRegressionChart();
        console.log('Graph 37 created');
    } catch (error) {
        console.error('Error creating Graph 37:', error);
    }
    
    try {
        createPredictionScatterChart();
        console.log('Graph 38 created');
    } catch (error) {
        console.error('Error creating Graph 38:', error);
    }
    
    try {
        createActualScatterChart();
        console.log('Graph 39 created');
    } catch (error) {
        console.error('Error creating Graph 39:', error);
    }
    
    try {
        createKMeansClusteringChart();
        console.log('Graph 40 created');
    } catch (error) {
        console.error('Error creating Graph 40:', error);
    }
    
    try {
        createPredictionDistributionChart();
        console.log('Graph 41 created');
    } catch (error) {
        console.error('Error creating Graph 41:', error);
    }
    
    try {
        createPredictionTrendChart();
        console.log('Graph 42 created');
    } catch (error) {
        console.error('Error creating Graph 42:', error);
    }
}

// ML Chart 1: Linear Regression
function createLinearRegressionChart() {
    const ctx = document.getElementById('linear-regression').getContext('2d');
    
    // Simple linear regression simulation
    const data = playStoreData.slice(0, 100);
    const reviewsData = data.map(d => parseFloat(d.Reviews)).filter(r => !isNaN(r));
    const ratingData = data.map(d => parseFloat(d.Rating)).filter(r => !isNaN(r));
    
    // Calculate simple regression
    const n = Math.min(reviewsData.length, ratingData.length);
    const sumX = reviewsData.slice(0, n).reduce((a, b) => a + b, 0);
    const sumY = ratingData.slice(0, n).reduce((a, b) => a + b, 0);
    const sumXY = reviewsData.slice(0, n).reduce((total, xi, i) => total + xi * ratingData[i], 0);
    const sumX2 = reviewsData.slice(0, n).reduce((total, xi) => total + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Create regression line data
    const maxX = Math.max(...reviewsData.slice(0, n));
    const lineData = [
        {x: 0, y: intercept},
        {x: maxX, y: slope * maxX + intercept}
    ];
    
    charts['ml-0'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data Points',
                    data: data.slice(0, n).map((d, i) => ({x: reviewsData[i], y: ratingData[i]})),
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Regression Line',
                    data: lineData,
                    type: 'line',
                    backgroundColor: 'rgba(231, 76, 60, 0.6)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Reviews' }
                },
                y: {
                    title: { display: true, text: 'Rating' },
                    min: 1,
                    max: 5
                }
            },
            plugins: {
                title: { display: true, text: 'Linear Regression: Reviews vs Rating' }
            }
        }
    });
    
    // Update R² score
    const r2Score = Math.pow(slope * Math.sqrt(sumX2 - sumX * sumX / n) / Math.sqrt(sumY2 - sumY * sumY / n), 2);
    document.getElementById('r2-score').textContent = r2Score.toFixed(3);
}

// ML Chart 2: K-Means Clustering
function createKMeansClusteringChart() {
    const ctx = document.getElementById('kmeans-clustering').getContext('2d');
    
    // Simple k-means clustering simulation
    const data = playStoreData.slice(0, 100);
    const clusterData = data.map(d => ({
        x: parseFloat(d.Reviews) || 0,
        y: parseFloat(d.Rating) || 0
    }));
    
    // Assign random clusters for demonstration
    const clusteredData = clusterData.map((point, i) => ({
        ...point,
        cluster: Math.floor(Math.random() * 3)
    }));
    
    const colors = [
        'rgba(52, 152, 219, 0.6)',
        'rgba(46, 204, 113, 0.6)',
        'rgba(241, 196, 15, 0.6)'
    ];
    
    const datasets = [0, 1, 2].map(clusterId => ({
        label: `Cluster ${clusterId + 1}`,
        data: clusteredData.filter(point => point.cluster === clusterId),
        backgroundColor: colors[clusterId],
        borderColor: colors[clusterId].replace('0.6', '1'),
        borderWidth: 1
    }));
    
    charts['ml-1'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Reviews' }
                },
                y: {
                    title: { display: true, text: 'Rating' },
                    min: 1,
                    max: 5
                }
            },
            plugins: {
                title: { display: true, text: 'K-Means Clustering' }
            }
        }
    });
    
    // Update accuracy (simulated)
    document.getElementById('accuracy').textContent = (0.75 + Math.random() * 0.2).toFixed(3);
}

// ML Chart 3: Prediction Distribution
function createPredictionDistribution() {
    const ctx = document.getElementById('prediction-dist').getContext('2d');
    
    // Simulate prediction distribution
    const predictions = [];
    for (let i = 0; i < 100; i++) {
        predictions.push(2.5 + Math.random() * 2);
    }
    
    const bins = [0, 0, 0, 0, 0];
    predictions.forEach(pred => {
        const binIndex = Math.min(Math.floor((pred - 2.5) / 0.4), 4);
        bins[Math.max(0, binIndex)]++;
    });
    
    charts['ml-2'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2.5-2.9', '2.9-3.3', '3.3-3.7', '3.7-4.1', '4.1-4.5'],
            datasets: [{
                label: 'Prediction Distribution',
                data: bins,
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
                x: { title: { display: true, text: 'Predicted Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Prediction Distribution' }
            }
        }
    });
}

// ML Chart 4: Prediction Trend
function createPredictionTrend() {
    const ctx = document.getElementById('prediction-trend').getContext('2d');
    
    // Simulate prediction trend
    const actualData = [];
    const predictedData = [];
    for (let i = 0; i < 50; i++) {
        actualData.push(2.5 + Math.random() * 2);
        predictedData.push(2.7 + Math.random() * 1.8);
    }
    
    charts['ml-3'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 50}, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Actual',
                    data: actualData,
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Predicted',
                    data: predictedData,
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    min: 1, 
                    max: 5,
                    title: { display: true, text: 'Rating' }
                },
                x: { title: { display: true, text: 'Sample Index' } }
            },
            plugins: {
                title: { display: true, text: 'Prediction Trend' }
            }
        }
    });
}

// Graph 38: Prediction Scatter Plot
function createPredictionScatterChart() {
    const ctx = document.getElementById('prediction-scatter').getContext('2d');
    
    // Simulate prediction data
    const predictions = [];
    for (let i = 0; i < 50; i++) {
        predictions.push(2.5 + Math.random() * 2);
    }
    
    charts['ml-1'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Predicted Ratings',
                data: predictions.map((pred, i) => ({x: i, y: pred})),
                backgroundColor: 'rgba(231, 76, 60, 0.6)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Sample Index' }
                },
                y: {
                    min: 1,
                    max: 5,
                    title: { display: true, text: 'Predicted Rating' }
                }
            },
            plugins: {
                title: { display: true, text: 'Graph 38: Prediction Scatter Plot' }
            }
        }
    });
}

// Graph 39: Actual Values Scatter Plot
function createActualScatterChart() {
    const ctx = document.getElementById('actual-scatter').getContext('2d');
    
    // Sample actual data
    const actualData = playStoreData.slice(0, 50).map(d => parseFloat(d.Rating)).filter(r => !isNaN(r));
    
    charts['ml-2'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Actual Ratings',
                data: actualData.map((rating, i) => ({x: i, y: rating})),
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Sample Index' }
                },
                y: {
                    min: 1,
                    max: 5,
                    title: { display: true, text: 'Actual Rating' }
                }
            },
            plugins: {
                title: { display: true, text: 'Graph 39: Actual Values Scatter Plot' }
            }
        }
    });
}

// Graph 41: Prediction Distribution
function createPredictionDistributionChart() {
    const ctx = document.getElementById('prediction-distribution').getContext('2d');
    
    // Simulate prediction distribution
    const predictions = [];
    for (let i = 0; i < 100; i++) {
        predictions.push(2.5 + Math.random() * 2);
    }

    const bins = [0, 0, 0, 0, 0];
    predictions.forEach(pred => {
        const binIndex = Math.min(Math.floor((pred - 2.5) / 0.4), 4);
        bins[Math.max(0, binIndex)]++;
    });

    charts['ml-4'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2.5-2.9', '2.9-3.3', '3.3-3.7', '3.7-4.1', '4.1-4.5'],
            datasets: [{
                label: 'Prediction Distribution',
                data: bins,
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
                x: { title: { display: true, text: 'Predicted Rating' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 41: Prediction Distribution' }
            }
        }
    });
}

// Graph 42: Prediction Trend
function createPredictionTrendChart() {
    const ctx = document.getElementById('prediction-trend').getContext('2d');
    
    // Simulate prediction trend
    const predictions = [];
    for (let i = 0; i < 50; i++) {
        predictions.push(2.5 + Math.random() * 2);
    }

    charts['ml-5'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 50}, (_, i) => i + 1),
            datasets: [{
                label: 'Predicted',
                data: predictions,
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 1,
                    max: 5,
                    title: { display: true, text: 'Predicted Rating' }
                },
                x: { title: { display: true, text: 'Sample Index' } }
            },
            plugins: {
                title: { display: true, text: 'Graph 42: Prediction Trend' }
            }
        }
    });
}
