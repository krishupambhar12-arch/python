# Google Play Store Analysis Dashboard

## 🚀 How to Run the Dashboard

### Step 1: Open the Dashboard
Simply open the `index.html` file in your web browser:

**Method 1: Double-click the file**
- Navigate to `c:\krishu\python\` folder
- Double-click on `index.html`

**Method 2: Using browser**
- Open any web browser (Chrome, Firefox, Edge, etc.)
- Press `Ctrl + O` (or `Cmd + O` on Mac)
- Select and open `index.html` from your folder

### Step 2: Alternative - Using Live Server (Recommended for Development)

If you have VS Code installed:
1. Open the `c:\krishu\python\` folder in VS Code
2. Install the "Live Server" extension from the marketplace
3. Right-click on `index.html` and select "Open with Live Server"
4. The dashboard will open at `http://localhost:5500`

### Step 3: Using Python's Built-in Server

Open Command Prompt or PowerShell and run:
```bash
cd c:\krishu\python
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser

## 📁 Files Structure
```
c:\krishu\python\
├── index.html          # Main dashboard HTML file
├── style.css           # Styling and layout
├── script.js           # JavaScript functionality and charts
├── p1.py              # Original Streamlit code (for reference)
└── README.md          # This file
```

## 🎯 Dashboard Features

### Navigation
- **Left Sidebar**: Navigate between different analysis sections
- **Dashboard**: Overview with key statistics
- **Task 1**: Univariate Analysis
- **Task 2**: Bivariate Analysis  
- **Task 3**: Distribution Analysis
- **Task 4**: Correlation Analysis
- **Task 5**: Machine Learning

### Interactive Elements
- Click on sidebar items to switch between sections
- All charts are interactive (hover for details)
- Responsive design works on mobile and desktop
- Smooth animations and transitions

## 🔧 Technical Details

### Dependencies
- **Chart.js**: For creating interactive charts (loaded from CDN)
- **Papa Parse**: For CSV parsing (loaded from CDN)
- **Modern CSS**: Flexbox and Grid layouts
- **Vanilla JavaScript**: No framework dependencies

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📊 Data
The dashboard currently uses sample data that mimics Google Play Store applications. To use your actual CSV data:

1. Place your `google_play_store.csv` file in the same folder
2. Update the data loading section in `script.js` to use Papa Parse
3. Refresh the browser

## 🎨 Customization
- Modify colors in `style.css` (search for color codes)
- Add new charts in `script.js`
- Update navigation items in `index.html`

## 🐛 Troubleshooting

### Charts not loading?
- Check browser console for errors (F12 → Console)
- Ensure internet connection for CDN libraries
- Try refreshing the page

### Layout issues?
- Clear browser cache
- Try a different browser
- Check if all files are in the same folder

### Performance issues?
- The dashboard uses sample data for performance
- Real CSV data may take longer to load
- Consider data sampling for large datasets

## 📞 Support
If you encounter any issues:
1. Check browser console for error messages
2. Ensure all files are in the correct location
3. Try opening in a different browser
