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
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Correlation',
                data: heatmapData,
                backgroundColor: function(context) {
                    const value = context.raw.v;
                    const alpha = Math.abs(value);
                    if (value > 0) {
                        return `rgba(46, 204, 113, ${alpha})`; // Green for positive
                    } else {
                        return `rgba(231, 76, 60, ${alpha})`; // Red for negative
                    }
                },
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 1,
                pointRadius: 30,
                pointHoverRadius: 35
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -0.5,
                    max: 2.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return labels[value] || '';
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    min: -0.5,
                    max: 2.5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return labels[value] || '';
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Graph 34: Correlation Heatmap'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const i = context.raw.y;
                            const j = context.raw.x;
                            const value = context.raw.v;
                            return `${labels[i]} vs ${labels[j]}: ${value.toFixed(3)}`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

// Graph 35: Pair Plot (simplified version)
function createPairPlot() {
    const ctx = document.getElementById('pair-plot').getContext('2d');
    
    // Get numeric data
    const ratingData = playStoreData.map(d => parseFloat(d.Rating)).filter(r => !isNaN(r) && r >= 1 && r <= 5);
    const reviewsData = playStoreData.map(d => parseFloat(d.Reviews)).filter(r => !isNaN(r));
    const installsData = playStoreData.map(d => parseFloat(d.Installs)).filter(r => !isNaN(r));
    
    // Take sample for better performance
    const sampleSize = Math.min(100, ratingData.length);
    const sampledData = [];
    for (let i = 0; i < sampleSize; i++) {
        const index = Math.floor(Math.random() * ratingData.length);
        sampledData.push({
            rating: ratingData[index],
            reviews: reviewsData[index],
            installs: installsData[index]
        });
    }
    
    charts['correlation-1'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Rating vs Reviews',
                    data: sampledData.map(d => ({x: d.rating, y: d.reviews})),
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Rating vs Installs',
                    data: sampledData.map(d => ({x: d.rating, y: d.installs})),
                    backgroundColor: 'rgba(46, 204, 113, 0.6)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Reviews vs Installs',
                    data: sampledData.map(d => ({x: d.reviews, y: d.installs})),
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

// Graph 36: Correlation Matrix Image
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
    
    // Create matrix visualization with bar chart
    const matrixData = [];
    const matrixLabels = [];
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrixData.push(correlationMatrix[i][j]);
            matrixLabels.push(`${labels[i]}-${labels[j]}`);
        }
    }
    
    charts['correlation-2'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: matrixLabels,
            datasets: [{
                label: 'Correlation Value',
                data: matrixData,
                backgroundColor: function(context) {
                    const value = context.raw;
                    if (value > 0) {
                        return `rgba(46, 204, 113, ${Math.abs(value)})`; // Green for positive
                    } else {
                        return `rgba(231, 76, 60, ${Math.abs(value)})`; // Red for negative
                    }
                },
                borderColor: 'rgba(0, 0, 0, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    min: -1,
                    max: 1,
                    title: {
                        display: true,
                        text: 'Correlation Coefficient'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Graph 36: Correlation Matrix'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Correlation: ${context.raw.toFixed(3)}`;
                        }
                    }
                }
            }
        }
    });
}
