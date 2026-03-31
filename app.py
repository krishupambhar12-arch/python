from flask import Flask, render_template, jsonify, send_file
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
import os
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans

app = Flask(__name__)

# Load and process data
def load_and_process_data():
    df = pd.read_csv("google_play_store.csv")
    
    # Data cleaning (same as p1.py)
    df["Rating"] = pd.to_numeric(df["Rating"], errors="coerce")
    df["Reviews"] = pd.to_numeric(df["Reviews"], errors="coerce")
    
    df["Installs"] = df["Installs"].str.replace("+","",regex=False)
    df["Installs"] = df["Installs"].str.replace(",","",regex=False)
    df["Installs"] = pd.to_numeric(df["Installs"], errors="coerce")
    
    # Clean Price column - remove $ and convert to numeric
    df["Price"] = df["Price"].str.replace("$","",regex=False)
    df["Price"] = pd.to_numeric(df["Price"], errors="coerce")
    
    df["Rating"].fillna(df["Rating"].median(), inplace=True)
    df["Reviews"].fillna(df["Reviews"].median(), inplace=True)
    df["Installs"].fillna(df["Installs"].median(), inplace=True)
    df["Price"].fillna(0, inplace=True)  # Fill missing prices with 0
    
    return df

# Create graphs directory if not exists
if not os.path.exists('graphs'):
    os.makedirs('graphs')

# Graph 1: Rating Histogram
def create_graph_1(df):
    plt.figure(figsize=(8, 6))
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    rating_data.hist(bins=20, range=(1, 5), color='skyblue', edgecolor='black')
    plt.title("Graph 1: Rating Histogram")
    plt.xlabel("Rating")
    plt.ylabel("Frequency")
    plt.xlim(1, 5)
    plt.grid(True, alpha=0.3)
    
    # Save to graphs folder
    plt.savefig('graphs/graph_1_rating_histogram.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 2: Reviews Histogram
def create_graph_2(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
    reviews_data.hist(bins=30, color='lightgreen', edgecolor='black')
    plt.title("Graph 2: Reviews Histogram")
    plt.xlabel("Reviews")
    plt.ylabel("Frequency")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_2_reviews_histogram.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 3: Installs Histogram
def create_graph_3(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    installs_data = df[df['Installs'] <= installs_threshold]['Installs']
    installs_data.hist(bins=30, color='orange', edgecolor='black')
    plt.title("Graph 3: Installs Histogram")
    plt.xlabel("Installs")
    plt.ylabel("Frequency")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_3_installs_histogram.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 4: Rating Boxplot
def create_graph_4(df):
    plt.figure(figsize=(8, 6))
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    rating_data.plot.box()
    plt.title("Graph 4: Rating Boxplot")
    plt.ylim(1, 5)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_4_rating_boxplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 5: Reviews Boxplot
def create_graph_5(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
    reviews_data.plot.box()
    plt.title("Graph 5: Reviews Boxplot")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_5_reviews_boxplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 6: Installs Boxplot
def create_graph_6(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    installs_data = df[df['Installs'] <= installs_threshold]['Installs']
    installs_data.plot.box()
    plt.title("Graph 6: Installs Boxplot")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_6_installs_boxplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 7: Category Bar Chart
def create_graph_7(df):
    plt.figure(figsize=(10, 6))
    df["Category"].value_counts().head(10).plot.bar(color="green")
    plt.title("Graph 7: Category Bar Chart")
    plt.xlabel("Category")
    plt.ylabel("Count")
    plt.xticks(rotation=45)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_7_category_bar_chart.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 8: Free vs Paid Pie Chart
def create_graph_8(df):
    plt.figure(figsize=(8, 8))
    df["Type"].value_counts().plot.pie(autopct="%1.1f%%", legend=True)
    plt.title("Graph 8: Free vs Paid")
    plt.ylabel("")
    
    plt.savefig('graphs/graph_8_free_paid_pie_chart.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 9: Content Rating Bar Chart
def create_graph_9(df):
    plt.figure(figsize=(10, 6))
    df["Content Rating"].value_counts().plot.bar(color='purple')
    plt.title("Graph 9: Content Rating Count")
    plt.xlabel("Content Rating")
    plt.ylabel("Count")
    plt.xticks(rotation=45)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_9_content_rating_bar_chart.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 10: Sorted Rating Line Graph
def create_graph_10(df):
    plt.figure(figsize=(10, 6))
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    plt.plot(rating_data.sort_values().values, color='red')
    plt.title("Graph 10: Sorted Rating")
    plt.xlabel("Index")
    plt.ylabel("Rating")
    plt.ylim(1, 5)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_10_sorted_rating_line.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 11: Rating KDE Plot
def create_graph_11(df):
    plt.figure(figsize=(8, 6))
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    rating_data.plot.kde()
    plt.title("Graph 11: Rating KDE")
    plt.xlabel("Rating")
    plt.xlim(1, 5)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_11_rating_kde.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 12: Reviews KDE Plot
def create_graph_12(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
    reviews_data.plot.kde()
    plt.title("Graph 12: Reviews KDE")
    plt.xlabel("Reviews")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_12_reviews_kde.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 13: First 20 Ratings Bar Chart
def create_graph_13(df):
    plt.figure(figsize=(10, 6))
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating'].head(20)
    plt.bar(range(20), rating_data, color='brown')
    plt.title("Graph 13: First 20 Ratings")
    plt.xlabel("App Index")
    plt.ylabel("Rating")
    plt.ylim(1, 5)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_13_first_20_ratings.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 14: First 20 Reviews Bar Chart
def create_graph_14(df):
    plt.figure(figsize=(10, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews'].head(20)
    plt.bar(range(20), reviews_data, color='navy')
    plt.title("Graph 14: First 20 Reviews")
    plt.xlabel("App Index")
    plt.ylabel("Reviews")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_14_first_20_reviews.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 15: First 20 Installs Bar Chart
def create_graph_15(df):
    plt.figure(figsize=(10, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    installs_data = df[df['Installs'] <= installs_threshold]['Installs'].head(20)
    plt.bar(range(20), installs_data, color='darkgreen')
    plt.title("Graph 15: First 20 Installs")
    plt.xlabel("App Index")
    plt.ylabel("Installs")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_15_first_20_installs.png', dpi=100, bbox_inches='tight')
    plt.close()

# BIVARIATE ANALYSIS GRAPHS (16-29)

# Graph 16: Reviews vs Rating Scatter Plot
def create_graph_16(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    plt.scatter(df_filtered['Reviews'], df_filtered['Rating'], alpha=0.6, color='blue')
    plt.title("Graph 16: Reviews vs Rating Scatter Plot")
    plt.xlabel("Reviews")
    plt.ylabel("Rating")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_16_reviews_rating_scatter.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 17: Installs vs Rating Scatter Plot
def create_graph_17(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    df_filtered = df[(df['Installs'] <= installs_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    plt.scatter(df_filtered['Installs'], df_filtered['Rating'], alpha=0.6, color='green')
    plt.title("Graph 17: Installs vs Rating Scatter Plot")
    plt.xlabel("Installs")
    plt.ylabel("Rating")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_17_installs_rating_scatter.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 18: Installs vs Reviews Scatter Plot
def create_graph_18(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Installs'] <= installs_threshold) & (df['Reviews'] <= reviews_threshold)]
    plt.scatter(df_filtered['Installs'], df_filtered['Reviews'], alpha=0.6, color='purple')
    plt.title("Graph 18: Installs vs Reviews Scatter Plot")
    plt.xlabel("Installs")
    plt.ylabel("Reviews")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_18_installs_reviews_scatter.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 19: Average Rating by Category
def create_graph_19(df):
    plt.figure(figsize=(12, 6))
    avg_rating_by_category = df.groupby('Category')['Rating'].mean().sort_values(ascending=False).head(10)
    avg_rating_by_category.plot.bar(color='teal')
    plt.title("Graph 19: Average Rating by Category")
    plt.xlabel("Category")
    plt.ylabel("Average Rating")
    plt.xticks(rotation=45)
    plt.ylim(1, 5)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_19_avg_rating_category.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 20: Rating by Type Boxplot
def create_graph_20(df):
    plt.figure(figsize=(8, 6))
    df.boxplot(column='Rating', by='Type', grid=False)
    plt.title("Graph 20: Rating by Type Boxplot")
    plt.suptitle("")
    plt.xlabel("Type")
    plt.ylabel("Rating")
    plt.ylim(1, 5)
    
    plt.savefig('graphs/graph_20_rating_type_boxplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 21: Reviews by Type Boxplot
def create_graph_21(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[df['Reviews'] <= reviews_threshold]
    df_filtered.boxplot(column='Reviews', by='Type', grid=False)
    plt.title("Graph 21: Reviews by Type Boxplot")
    plt.suptitle("")
    plt.xlabel("Type")
    plt.ylabel("Reviews")
    
    plt.savefig('graphs/graph_21_reviews_type_boxplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 22: Installs by Type Boxplot
def create_graph_22(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    df_filtered = df[df['Installs'] <= installs_threshold]
    df_filtered.boxplot(column='Installs', by='Type', grid=False)
    plt.title("Graph 22: Installs by Type Boxplot")
    plt.suptitle("")
    plt.xlabel("Type")
    plt.ylabel("Installs")
    
    plt.savefig('graphs/graph_22_installs_type_boxplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 23: Hexbin Plot
def create_graph_23(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    installs_threshold = df['Installs'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Installs'] <= installs_threshold)]
    plt.hexbin(df_filtered['Reviews'], df_filtered['Installs'], gridsize=20, cmap='Blues')
    plt.title("Graph 23: Hexbin Plot")
    plt.xlabel("Reviews")
    plt.ylabel("Installs")
    plt.colorbar()
    
    plt.savefig('graphs/graph_23_hexbin.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 24: 2D Histogram
def create_graph_24(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    installs_threshold = df['Installs'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Installs'] <= installs_threshold)]
    plt.hist2d(df_filtered['Reviews'], df_filtered['Installs'], bins=20, cmap='viridis')
    plt.title("Graph 24: 2D Histogram")
    plt.xlabel("Reviews")
    plt.ylabel("Installs")
    plt.colorbar()
    
    plt.savefig('graphs/graph_24_2d_histogram.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 25: Seaborn Scatter Plot
def create_graph_25(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    sns.scatterplot(data=df_filtered, x='Reviews', y='Rating', alpha=0.6)
    plt.title("Graph 25: Seaborn Scatter Plot")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_25_seaborn_scatter.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 26: Installs vs Rating Scatter (Seaborn)
def create_graph_26(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    df_filtered = df[(df['Installs'] <= installs_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    sns.scatterplot(data=df_filtered, x='Installs', y='Rating', alpha=0.6, color='orange')
    plt.title("Graph 26: Installs vs Rating Scatter")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_26_installs_rating_scatter_2.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 27: Installs vs Reviews Scatter (Seaborn)
def create_graph_27(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Installs'] <= installs_threshold) & (df['Reviews'] <= reviews_threshold)]
    sns.scatterplot(data=df_filtered, x='Installs', y='Reviews', alpha=0.6, color='red')
    plt.title("Graph 27: Installs vs Reviews Scatter")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_27_installs_reviews_scatter_2.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 28: Regression Reviews vs Rating
def create_graph_28(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    sns.regplot(data=df_filtered, x='Reviews', y='Rating', scatter_kws={'alpha':0.6})
    plt.title("Graph 28: Regression Reviews vs Rating")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_28_regression_reviews_rating.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 29: Regression Installs vs Rating
def create_graph_29(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    df_filtered = df[(df['Installs'] <= installs_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    sns.regplot(data=df_filtered, x='Installs', y='Rating', scatter_kws={'alpha':0.6}, color='green')
    plt.title("Graph 29: Regression Installs vs Rating")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_29_regression_installs_rating.png', dpi=100, bbox_inches='tight')
    plt.close()

# DISTRIBUTION ANALYSIS GRAPHS (30-33)

# Graph 30: Rating Distribution (Seaborn)
def create_graph_30(df):
    plt.figure(figsize=(8, 6))
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    sns.histplot(data=rating_data, kde=True, bins=20, color='skyblue')
    plt.title("Graph 30: Rating Distribution")
    plt.xlabel("Rating")
    plt.ylabel("Frequency")
    plt.xlim(1, 5)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_30_rating_distribution.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 31: Reviews Distribution (Seaborn)
def create_graph_31(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
    sns.histplot(data=reviews_data, kde=True, bins=30, color='lightgreen')
    plt.title("Graph 31: Reviews Distribution")
    plt.xlabel("Reviews")
    plt.ylabel("Frequency")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_31_reviews_distribution.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 32: Installs Distribution (Seaborn)
def create_graph_32(df):
    plt.figure(figsize=(8, 6))
    installs_threshold = df['Installs'].quantile(0.95)
    installs_data = df[df['Installs'] <= installs_threshold]['Installs']
    sns.histplot(data=installs_data, kde=True, bins=30, color='orange')
    plt.title("Graph 32: Installs Distribution")
    plt.xlabel("Installs")
    plt.ylabel("Frequency")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_32_installs_distribution.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 33: Rating Boxplot (Seaborn)
def create_graph_33(df):
    plt.figure(figsize=(8, 6))
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    sns.boxplot(data=rating_data, color='purple')
    plt.title("Graph 33: Rating Boxplot")
    plt.ylabel("Rating")
    plt.ylim(1, 5)
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_33_rating_boxplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# CORRELATION ANALYSIS GRAPHS (34-36)

# Graph 34: Correlation Heatmap
def create_graph_34(df):
    plt.figure(figsize=(8, 6))
    correlation_data = df[['Rating', 'Reviews', 'Installs']].corr()
    sns.heatmap(correlation_data, annot=True, cmap='coolwarm', center=0)
    plt.title("Graph 34: Correlation Heatmap")
    
    plt.savefig('graphs/graph_34_correlation_heatmap.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 35: Pairplot
def create_graph_35(df):
    plt.figure(figsize=(10, 10))
    df_filtered = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]
    df_sample = df_filtered[['Rating', 'Reviews', 'Installs']].sample(min(500, len(df_filtered)))
    sns.pairplot(df_sample)
    plt.suptitle("Graph 35: Pairplot", y=1.02)
    
    plt.savefig('graphs/graph_35_pairplot.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 36: Correlation Matrix
def create_graph_36(df):
    plt.figure(figsize=(8, 6))
    correlation_data = df[['Rating', 'Reviews', 'Installs']].corr()
    plt.imshow(correlation_data, cmap='coolwarm', aspect='auto', vmin=-1, vmax=1)
    plt.colorbar()
    plt.xticks(range(len(correlation_data.columns)), correlation_data.columns, rotation=45)
    plt.yticks(range(len(correlation_data.columns)), correlation_data.columns)
    
    # Add correlation values as text
    for i in range(len(correlation_data.columns)):
        for j in range(len(correlation_data.columns)):
            plt.text(j, i, f'{correlation_data.iloc[i, j]:.2f}', 
                    ha='center', va='center', color='black')
    
    plt.title("Graph 36: Correlation Matrix")
    
    plt.savefig('graphs/graph_36_correlation_matrix.png', dpi=100, bbox_inches='tight')
    plt.close()

# MACHINE LEARNING GRAPHS (37-42)

# Graph 37: Linear Regression
def create_graph_37(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    
    X = df_filtered[['Reviews']].values
    y = df_filtered['Rating'].values
    
    model = LinearRegression()
    model.fit(X, y)
    
    plt.scatter(X, y, alpha=0.6, color='blue', label='Data points')
    plt.plot(X, model.predict(X), color='red', linewidth=2, label='Regression line')
    plt.title("Graph 37: Linear Regression")
    plt.xlabel("Reviews")
    plt.ylabel("Rating")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_37_linear_regression.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 38: Prediction Scatter Plot
def create_graph_38(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    
    X = df_filtered[['Reviews']].values
    y = df_filtered['Rating'].values
    
    model = LinearRegression()
    model.fit(X, y)
    y_pred = model.predict(X)
    
    plt.scatter(X, y_pred, alpha=0.6, color='green', label='Predicted')
    plt.title("Graph 38: Prediction Scatter Plot")
    plt.xlabel("Reviews")
    plt.ylabel("Predicted Rating")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_38_prediction_scatter.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 39: Actual Values Scatter Plot
def create_graph_39(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    
    X = df_filtered[['Reviews']].values
    y = df_filtered['Rating'].values
    
    model = LinearRegression()
    model.fit(X, y)
    y_pred = model.predict(X)
    
    plt.scatter(X, y, alpha=0.6, color='blue', label='Actual')
    plt.scatter(X, y_pred, alpha=0.6, color='red', label='Predicted')
    plt.title("Graph 39: Actual Values Scatter Plot")
    plt.xlabel("Reviews")
    plt.ylabel("Rating")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_39_actual_scatter.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 40: KMeans Clustering
def create_graph_40(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    installs_threshold = df['Installs'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Installs'] <= installs_threshold)]
    
    X = df_filtered[['Reviews', 'Installs']].values
    kmeans = KMeans(n_clusters=3, random_state=42)
    clusters = kmeans.fit_predict(X)
    
    plt.scatter(X[:, 0], X[:, 1], c=clusters, cmap='viridis', alpha=0.6)
    plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], 
               c='red', marker='x', s=200, linewidths=3, label='Centroids')
    plt.title("Graph 40: KMeans Clustering")
    plt.xlabel("Reviews")
    plt.ylabel("Installs")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_40_kmeans_clustering.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 41: Prediction Distribution
def create_graph_41(df):
    plt.figure(figsize=(8, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    
    X = df_filtered[['Reviews']].values
    y = df_filtered['Rating'].values
    
    model = LinearRegression()
    model.fit(X, y)
    y_pred = model.predict(X)
    
    plt.hist(y_pred, bins=20, alpha=0.7, color='orange', edgecolor='black')
    plt.title("Graph 41: Prediction Distribution")
    plt.xlabel("Predicted Rating")
    plt.ylabel("Frequency")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_41_prediction_distribution.png', dpi=100, bbox_inches='tight')
    plt.close()

# Graph 42: Prediction Trend
def create_graph_42(df):
    plt.figure(figsize=(10, 6))
    reviews_threshold = df['Reviews'].quantile(0.95)
    df_filtered = df[(df['Reviews'] <= reviews_threshold) & (df['Rating'] >= 1) & (df['Rating'] <= 5)]
    
    X = df_filtered[['Reviews']].values
    y = df_filtered['Rating'].values
    
    model = LinearRegression()
    model.fit(X, y)
    y_pred = model.predict(X)
    
    plt.plot(y_pred[:50], color='blue', linewidth=2, marker='o')
    plt.title("Graph 42: Prediction Trend")
    plt.xlabel("Index")
    plt.ylabel("Predicted Rating")
    plt.grid(True, alpha=0.3)
    
    plt.savefig('graphs/graph_42_prediction_trend.png', dpi=100, bbox_inches='tight')
    plt.close()

# Generate all graphs
def generate_all_graphs():
    df = load_and_process_data()
    
    graph_functions = [
        # Univariate Analysis (1-15)
        create_graph_1, create_graph_2, create_graph_3, create_graph_4,
        create_graph_5, create_graph_6, create_graph_7, create_graph_8,
        create_graph_9, create_graph_10, create_graph_11, create_graph_12,
        create_graph_13, create_graph_14, create_graph_15,
        
        # Bivariate Analysis (16-29)
        create_graph_16, create_graph_17, create_graph_18, create_graph_19,
        create_graph_20, create_graph_21, create_graph_22, create_graph_23,
        create_graph_24, create_graph_25, create_graph_26, create_graph_27,
        create_graph_28, create_graph_29,
        
        # Distribution Analysis (30-33)
        create_graph_30, create_graph_31, create_graph_32, create_graph_33,
        
        # Correlation Analysis (34-36)
        create_graph_34, create_graph_35, create_graph_36,
        
        # Machine Learning (37-42)
        create_graph_37, create_graph_38, create_graph_39, create_graph_40,
        create_graph_41, create_graph_42
    ]
    
    for func in graph_functions:
        func(df)
    
    print("All 42 graphs generated successfully!")

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/graphs/<filename>')
def serve_graph(filename):
    return send_file(f'graphs/{filename}')

@app.route('/api/generate-graphs')
def generate_graphs():
    try:
        generate_all_graphs()
        return jsonify({"status": "success", "message": "All graphs generated successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/api/dashboard-stats')
def dashboard_stats():
    try:
        df = load_and_process_data()
        
        # Calculate comprehensive statistics for all columns
        stats = {
            'totalApps': int(len(df)),
            'averageRating': float(df['Rating'].mean()),
            'missingValues': int(df.isnull().sum().sum()),
            'categories': int(df['Category'].nunique()),
            'ratingDistribution': {
                '1': int(len(df[df['Rating'] == 1.0])),
                '2': int(len(df[df['Rating'] == 2.0])),
                '3': int(len(df[df['Rating'] == 3.0])),
                '4': int(len(df[df['Rating'] == 4.0])),
                '5': int(len(df[df['Rating'] == 5.0]))
            },
            'categoryDistribution': df['Category'].value_counts().head(5).to_dict(),
            'contentRatingDistribution': df['Content Rating'].value_counts().to_dict(),
            'typeDistribution': df['Type'].value_counts().to_dict(),
            'totalReviews': int(df['Reviews'].sum()),
            'averageReviews': float(df['Reviews'].mean()),
            'totalInstalls': int(df['Installs'].sum()),
            'averageInstalls': float(df['Installs'].mean()),
            'paidApps': int(len(df[df['Type'] == 'Paid'])),
            'freeApps': int(len(df[df['Type'] == 'Free'])),
            'averagePrice': float(df[df['Type'] == 'Paid']['Price'].mean()) if len(df[df['Type'] == 'Paid']) > 0 else 0,
            'totalGenres': int(df['Genres'].nunique()),
            'topCategories': df['Category'].value_counts().head(10).to_dict(),
            'topGenres': df['Genres'].value_counts().head(5).to_dict(),
            'ratingStats': {
                'min': float(df['Rating'].min()),
                'max': float(df['Rating'].max()),
                'median': float(df['Rating'].median()),
                'std': float(df['Rating'].std())
            },
            'reviewsStats': {
                'min': int(df['Reviews'].min()),
                'max': int(df['Reviews'].max()),
                'median': float(df['Reviews'].median()),
                'std': float(df['Reviews'].std())
            },
            'installsStats': {
                'min': int(df['Installs'].min()),
                'max': int(df['Installs'].max()),
                'median': float(df['Installs'].median()),
                'std': float(df['Installs'].std())
            }
        }
        
        return jsonify(stats)
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"})

@app.route('/api/graph-info')
def graph_info():
    graphs = [
        # Univariate Analysis (1-15)
        {"id": 1, "name": "Rating Histogram", "filename": "graph_1_rating_histogram.png"},
        {"id": 2, "name": "Reviews Histogram", "filename": "graph_2_reviews_histogram.png"},
        {"id": 3, "name": "Installs Histogram", "filename": "graph_3_installs_histogram.png"},
        {"id": 4, "name": "Rating Boxplot", "filename": "graph_4_rating_boxplot.png"},
        {"id": 5, "name": "Reviews Boxplot", "filename": "graph_5_reviews_boxplot.png"},
        {"id": 6, "name": "Installs Boxplot", "filename": "graph_6_installs_boxplot.png"},
        {"id": 7, "name": "Category Bar Chart", "filename": "graph_7_category_bar_chart.png"},
        {"id": 8, "name": "Free vs Paid Pie Chart", "filename": "graph_8_free_paid_pie_chart.png"},
        {"id": 9, "name": "Content Rating Bar Chart", "filename": "graph_9_content_rating_bar_chart.png"},
        {"id": 10, "name": "Sorted Rating Line Graph", "filename": "graph_10_sorted_rating_line.png"},
        {"id": 11, "name": "Rating KDE Plot", "filename": "graph_11_rating_kde.png"},
        {"id": 12, "name": "Reviews KDE Plot", "filename": "graph_12_reviews_kde.png"},
        {"id": 13, "name": "First 20 Ratings Bar Chart", "filename": "graph_13_first_20_ratings.png"},
        {"id": 14, "name": "First 20 Reviews Bar Chart", "filename": "graph_14_first_20_reviews.png"},
        {"id": 15, "name": "First 20 Installs Bar Chart", "filename": "graph_15_first_20_installs.png"},
        
        # Bivariate Analysis (16-29)
        {"id": 16, "name": "Reviews vs Rating Scatter Plot", "filename": "graph_16_reviews_rating_scatter.png"},
        {"id": 17, "name": "Installs vs Rating Scatter Plot", "filename": "graph_17_installs_rating_scatter.png"},
        {"id": 18, "name": "Installs vs Reviews Scatter Plot", "filename": "graph_18_installs_reviews_scatter.png"},
        {"id": 19, "name": "Average Rating by Category", "filename": "graph_19_avg_rating_category.png"},
        {"id": 20, "name": "Rating by Type Boxplot", "filename": "graph_20_rating_type_boxplot.png"},
        {"id": 21, "name": "Reviews by Type Boxplot", "filename": "graph_21_reviews_type_boxplot.png"},
        {"id": 22, "name": "Installs by Type Boxplot", "filename": "graph_22_installs_type_boxplot.png"},
        {"id": 23, "name": "Hexbin Plot", "filename": "graph_23_hexbin.png"},
        {"id": 24, "name": "2D Histogram", "filename": "graph_24_2d_histogram.png"},
        {"id": 25, "name": "Seaborn Scatter Plot", "filename": "graph_25_seaborn_scatter.png"},
        {"id": 26, "name": "Installs vs Rating Scatter", "filename": "graph_26_installs_rating_scatter_2.png"},
        {"id": 27, "name": "Installs vs Reviews Scatter", "filename": "graph_27_installs_reviews_scatter_2.png"},
        {"id": 28, "name": "Regression Reviews vs Rating", "filename": "graph_28_regression_reviews_rating.png"},
        {"id": 29, "name": "Regression Installs vs Rating", "filename": "graph_29_regression_installs_rating.png"},
        
        # Distribution Analysis (30-33)
        {"id": 30, "name": "Rating Distribution", "filename": "graph_30_rating_distribution.png"},
        {"id": 31, "name": "Reviews Distribution", "filename": "graph_31_reviews_distribution.png"},
        {"id": 32, "name": "Installs Distribution", "filename": "graph_32_installs_distribution.png"},
        {"id": 33, "name": "Rating Boxplot", "filename": "graph_33_rating_boxplot.png"},
        
        # Correlation Analysis (34-36)
        {"id": 34, "name": "Correlation Heatmap", "filename": "graph_34_correlation_heatmap.png"},
        {"id": 35, "name": "Pairplot", "filename": "graph_35_pairplot.png"},
        {"id": 36, "name": "Correlation Matrix", "filename": "graph_36_correlation_matrix.png"},
        
        # Machine Learning (37-42)
        {"id": 37, "name": "Linear Regression", "filename": "graph_37_linear_regression.png"},
        {"id": 38, "name": "Prediction Scatter Plot", "filename": "graph_38_prediction_scatter.png"},
        {"id": 39, "name": "Actual Values Scatter Plot", "filename": "graph_39_actual_scatter.png"},
        {"id": 40, "name": "KMeans Clustering", "filename": "graph_40_kmeans_clustering.png"},
        {"id": 41, "name": "Prediction Distribution", "filename": "graph_41_prediction_distribution.png"},
        {"id": 42, "name": "Prediction Trend", "filename": "graph_42_prediction_trend.png"}
    ]
    return jsonify(graphs)

if __name__ == '__main__':
    import webbrowser
    import threading
    import time
    
    # Generate graphs on startup
    print("Generating graphs...")
    generate_all_graphs()
    print("All graphs generated successfully!")
    
    # Start Flask in a separate thread
    def start_flask():
        app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)
    
    flask_thread = threading.Thread(target=start_flask)
    flask_thread.daemon = True
    flask_thread.start()
    
    # Wait a moment for server to start
    time.sleep(2)
    
    # Open browser automatically
    try:
        webbrowser.open('http://localhost:5000')
        print("🌐 Browser opened automatically at http://localhost:5000")
    except:
        print("⚠️  Could not open browser automatically. Please open http://localhost:5000 manually")
    
    # Keep the main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
        pass
