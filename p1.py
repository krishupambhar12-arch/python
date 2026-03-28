import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.cluster import KMeans

# ---------------- LOAD DATA ----------------
df = pd.read_csv("google_play_store.csv")

st.title("Google Play Store Data Analysis Dashboard")

# ---------------- DATA CLEANING ----------------
df["Rating"] = pd.to_numeric(df["Rating"], errors="coerce")
df["Reviews"] = pd.to_numeric(df["Reviews"], errors="coerce")

df["Installs"] = df["Installs"].str.replace("+","",regex=False)
df["Installs"] = df["Installs"].str.replace(",","",regex=False)
df["Installs"] = pd.to_numeric(df["Installs"], errors="coerce")

df["Rating"].fillna(df["Rating"].median(), inplace=True)
df["Reviews"].fillna(df["Reviews"].median(), inplace=True)
df["Installs"].fillna(df["Installs"].median(), inplace=True)

# ---------------- TABS ----------------
tab1, tab2, tab3, tab4, tab5 = st.tabs([

])

# =====================================================
# UNIVARIATE ANALYSIS (1-15)
# =====================================================
with tab1:

    st.header("Univariate Analysis")

    for i,col in enumerate(["Rating","Reviews","Installs"]):
        if i == 0:
            st.write("**Graph 1 Rating Histogram**")
            st.write("This graph shows the distribution of app ratings in the dataset. It helps understand how ratings are spread across applications such as how many apps have ratings near 4 or near 3.")
            st.write("**Function used:** df[col].hist() with outlier removal")
            st.write("**Purpose:** To understand the frequency distribution of ratings.")
            # Remove outliers for Rating (keep only 1-5 range)
            rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
            plt.figure()
            rating_data.hist(bins=20, range=(1, 5))
            plt.title("Graph 1: Rating Histogram")
            plt.xlabel("Rating")
            plt.ylabel("Frequency")
            plt.xlim(1, 5)
        elif i == 1:
            st.write("**Graph 2 Reviews Histogram**")
            st.write("This histogram shows how reviews are distributed among apps. It indicates how many apps have low reviews and how many have high reviews.")
            st.write("**Function used:** df[col].hist() with outlier removal")
            st.write("**Purpose:** To analyze the distribution of user reviews.")
            # Remove outliers for Reviews (keep only up to 95th percentile)
            reviews_threshold = df['Reviews'].quantile(0.95)
            reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
            plt.figure()
            reviews_data.hist(bins=30)
            plt.title("Graph 2: Reviews Histogram")
            plt.xlabel("Reviews")
            plt.ylabel("Frequency")
        elif i == 2:
            st.write("**Graph 3 Installs Histogram**")
            st.write("This graph shows the distribution of the number of installs for apps.")
            st.write("**Function used:** df[col].hist() with outlier removal")
            st.write("**Purpose:** To understand how many apps have low installs and how many are highly installed.")
            # Remove outliers for Installs (keep only up to 95th percentile)
            installs_threshold = df['Installs'].quantile(0.95)
            installs_data = df[df['Installs'] <= installs_threshold]['Installs']
            plt.figure()
            installs_data.hist(bins=30)
            plt.title("Graph 3: Installs Histogram")
            plt.xlabel("Installs")
            plt.ylabel("Frequency")
        st.pyplot(plt)
        plt.close()
        st.write("---")

    st.write("**Graph 4 Rating Boxplot**")
    st.write("This boxplot visualizes the spread of ratings and detects outliers.")
    st.write("**Function used:** df['Rating'].plot.box() with outlier removal")
    st.write("**Purpose:** To analyze rating variability and identify extreme values.")
    plt.figure()
    # Remove outliers for Rating (keep only 1-5 range)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    rating_data.plot.box()
    plt.title("Graph 4: Rating Boxplot")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 5 Reviews Boxplot**")
    st.write("This boxplot shows the distribution and outliers in the number of reviews.")
    st.write("**Function used:** df['Reviews'].plot.box() with outlier removal")
    st.write("**Purpose:** To understand the range and extreme values in review counts.")
    plt.figure()
    # Remove outliers for Reviews (keep only up to 95th percentile)
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
    reviews_data.plot.box()
    plt.title("Graph 5: Reviews Boxplot")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 6 Installs Boxplot**")
    st.write("This graph shows the spread and outliers in installs.")
    st.write("**Function used:** df['Installs'].plot.box() with outlier removal")
    st.write("**Purpose:** To observe variation in install counts.")
    plt.figure()
    # Remove outliers for Installs (keep only up to 95th percentile)
    installs_threshold = df['Installs'].quantile(0.95)
    installs_data = df[df['Installs'] <= installs_threshold]['Installs']
    installs_data.plot.box()
    plt.title("Graph 6: Installs Boxplot")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 7 Category Bar Chart**")
    st.write("This bar chart shows the top 10 most common app categories.")
    st.write("**Function used:** df['Category'].value_counts().plot.bar()")
    st.write("**Purpose:** To identify the most popular app categories.")
    plt.figure()
    df["Category"].value_counts().head(10).plot.bar(color="green")
    plt.title("Graph 7: Category Bar Chart")
    plt.xticks(rotation=45)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 8 Free vs Paid Pie Chart**")
    st.write("This pie chart shows the percentage of free and paid apps.")
    st.write("**Function used:** df['Type'].value_counts().plot.pie()")
    st.write("**Purpose:** To understand the proportion of free versus paid applications.")
    plt.figure()
    df["Type"].value_counts().plot.pie(autopct="%1.1f%%", legend=True)
    plt.title("Graph 8: Free vs Paid")
    plt.ylabel("")  # Remove y-label for better pie chart appearance
    plt.legend(title="App Type", bbox_to_anchor=(1.05, 1), loc='upper left')
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 9 Content Rating Bar Chart**")
    st.write("This graph shows how many apps belong to each content rating category.")
    st.write("**Function used:** df['Content Rating'].value_counts().plot.bar()")
    st.write("**Purpose:** To analyze app distribution based on audience age group.")
    plt.figure()
    df["Content Rating"].value_counts().plot.bar()
    plt.title("Graph 9: Content Rating Count")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 10 Sorted Rating Line Graph**")
    st.write("This line graph shows ratings sorted from lowest to highest.")
    st.write("**Function used:** plt.plot() with outlier removal")
    st.write("**Purpose:** To visualize the overall rating trend.")
    plt.figure()
    # Remove outliers for Rating (keep only 1-5 range)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    plt.plot(rating_data.sort_values())
    plt.title("Graph 10: Sorted Rating")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 11 Rating KDE Plot**")
    st.write("This plot shows the probability density distribution of ratings.")
    st.write("**Function used:** df['Rating'].plot.kde() with outlier removal")
    st.write("**Purpose:** To understand the smooth distribution of ratings.")
    plt.figure()
    # Remove outliers for Rating (keep only 1-5 range)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    rating_data.plot.kde()
    plt.title("Graph 11: Rating KDE")
    plt.xlim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 12 Reviews KDE Plot**")
    st.write("This graph displays the density distribution of reviews.")
    st.write("**Function used:** df['Reviews'].plot.kde() with outlier removal")
    st.write("**Purpose:** To analyze review density patterns.")
    plt.figure()
    # Remove outliers for Reviews (keep only up to 95th percentile)
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
    reviews_data.plot.kde()
    plt.title("Graph 12: Reviews KDE")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 13 First 20 Ratings Bar Chart**")
    st.write("This bar chart shows ratings for the first 20 apps in the dataset.")
    st.write("**Function used:** plt.bar() with outlier removal")
    st.write("**Purpose:** To visualize a small sample of ratings.")
    plt.figure()
    # Remove outliers for Rating (keep only 1-5 range)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating'].head(20)
    plt.bar(range(20), rating_data)
    plt.title("Graph 13: First 20 Ratings")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 14 First 20 Reviews Bar Chart**")
    st.write("This graph displays the review counts of the first 20 apps.")
    st.write("**Function used:** plt.bar() with outlier removal")
    st.write("**Purpose:** To view a small sample of review data.")
    plt.figure()
    # Remove outliers for Reviews (keep only up to 95th percentile)
    reviews_threshold = df['Reviews'].quantile(0.95)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews'].head(20)
    plt.bar(range(20), reviews_data)
    plt.title("Graph 14: First 20 Reviews")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 15 First 20 Installs Bar Chart**")
    st.write("This bar chart shows install numbers for the first 20 apps.")
    st.write("**Function used:** plt.bar() with outlier removal")
    st.write("**Purpose:** To observe install data for a small sample.")
    plt.figure()
    # Remove outliers for Installs (keep only up to 95th percentile)
    installs_threshold = df['Installs'].quantile(0.95)
    installs_data = df[df['Installs'] <= installs_threshold]['Installs'].head(20)
    plt.bar(range(20), installs_data)
    plt.title("Graph 15: First 20 Installs")
    st.pyplot(plt)
    plt.close()
    st.write("---")

# =====================================================
# BIVARIATE ANALYSIS (16-29)
# =====================================================
with tab2:

    st.header("Bivariate Analysis")

    st.write("**Graph 16 Reviews vs Rating Scatter Plot**")
    st.write("This graph shows the relationship between reviews and ratings.")
    st.write("**Function used:** plt.scatter() with outlier removal")
    st.write("**Purpose:** To see whether apps with more reviews tend to have higher ratings.")
    plt.figure()
    # Remove outliers for both Reviews and Rating
    reviews_threshold = df['Reviews'].quantile(0.95)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    plt.scatter(rating_data["Reviews"], rating_data["Rating"])
    plt.title("Graph 16: Reviews vs Rating")
    plt.xlabel("Reviews")
    plt.ylabel("Rating")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 17 Installs vs Rating Scatter Plot**")
    st.write("This graph shows the relationship between installs and ratings.")
    st.write("**Function used:** plt.scatter() with outlier removal")
    st.write("**Purpose:** To analyze whether highly installed apps have better ratings.")
    plt.figure()
    # Remove outliers for both Installs and Rating
    installs_threshold = df['Installs'].quantile(0.95)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Installs'] <= installs_threshold)]
    plt.scatter(rating_data["Installs"], rating_data["Rating"])
    plt.title("Graph 17: Installs vs Rating")
    plt.xlabel("Installs")
    plt.ylabel("Rating")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 18 Installs vs Reviews Scatter Plot**")
    st.write("This plot shows the relationship between installs and reviews.")
    st.write("**Function used:** plt.scatter() with outlier removal")
    st.write("**Purpose:** To check whether apps with more installs receive more reviews.")
    plt.figure()
    # Remove outliers for both Installs and Reviews
    installs_threshold = df['Installs'].quantile(0.95)
    reviews_threshold = df['Reviews'].quantile(0.95)
    scatter_data = df[(df['Installs'] <= installs_threshold) & (df['Reviews'] <= reviews_threshold)]
    plt.scatter(scatter_data["Installs"], scatter_data["Reviews"])
    plt.title("Graph 18: Installs vs Reviews")
    plt.xlabel("Installs")
    plt.ylabel("Reviews")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 19 Average Rating by Category**")
    st.write("This bar chart displays the average rating for each app category.")
    st.write("**Function used:** groupby().plot.bar()")
    st.write("**Purpose:** To identify categories with higher average ratings.")
    plt.figure()
    df.groupby("Category")["Rating"].mean().head(10).plot.bar()
    plt.title("Graph 19: Avg Rating by Category")
    plt.xticks(rotation=45)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 20 Rating by Type Boxplot**")
    st.write("This compares ratings between free and paid apps.")
    st.write("**Function used:** df.boxplot()")
    st.write("**Purpose:** To analyze rating differences between free and paid applications.")
    plt.figure()
    df.boxplot(column="Rating",by="Type")
    plt.title("Graph 20: Rating by Type")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 21 Reviews by Type Boxplot**")
    st.write("This graph compares review counts between free and paid apps.")
    st.write("**Function used:** df.boxplot()")
    st.write("**Purpose:** To study user engagement differences.")
    plt.figure()
    df.boxplot(column="Reviews",by="Type")
    plt.title("Graph 21: Reviews by Type")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 22 Installs by Type Boxplot**")
    st.write("This graph compares install numbers between free and paid apps.")
    st.write("**Function used:** df.boxplot()")
    st.write("**Purpose:** To analyze download patterns.")
    plt.figure()
    df.boxplot(column="Installs",by="Type")
    plt.title("Graph 22: Installs by Type")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 23 Hexbin Plot**")
    st.write("This plot shows density between installs and reviews.")
    st.write("**Function used:** plt.hexbin() with outlier removal")
    st.write("**Purpose:** To visualize data concentration in large datasets.")
    plt.figure()
    # Remove outliers for both Installs and Reviews
    installs_threshold = df['Installs'].quantile(0.95)
    reviews_threshold = df['Reviews'].quantile(0.95)
    hexbin_data = df[(df['Installs'] <= installs_threshold) & (df['Reviews'] <= reviews_threshold)]
    plt.hexbin(hexbin_data["Reviews"], hexbin_data["Installs"], gridsize=30)
    plt.title("Graph 23: Hexbin")
    plt.xlabel("Reviews")
    plt.ylabel("Installs")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 24 2D Histogram**")
    st.write("This shows the combined distribution of reviews and ratings.")
    st.write("**Function used:** plt.hist2d() with outlier removal")
    st.write("**Purpose:** To observe density patterns between two variables.")
    plt.figure()
    # Remove outliers for both Reviews and Rating
    reviews_threshold = df['Reviews'].quantile(0.95)
    hist_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    plt.hist2d(hist_data["Reviews"], hist_data["Rating"], bins=30)
    plt.title("Graph 24: 2D Histogram")
    plt.xlabel("Reviews")
    plt.ylabel("Rating")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 25 Seaborn Scatter Plot**")
    st.write("Advanced scatter visualization for reviews vs rating.")
    st.write("**Function used:** sns.scatterplot() with outlier removal")
    st.write("**Purpose:** To visualize relationships with better aesthetics.")
    plt.figure()
    # Remove outliers for both Reviews and Rating
    reviews_threshold = df['Reviews'].quantile(0.95)
    scatter_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    sns.scatterplot(x="Reviews",y="Rating",data=scatter_data)
    plt.title("Graph 25")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 26 Installs vs Rating Scatter**")
    st.write("Shows the relationship between installs and ratings.")
    st.write("**Function used:** sns.scatterplot() with outlier removal")
    plt.figure()
    # Remove outliers for both Installs and Rating
    installs_threshold = df['Installs'].quantile(0.95)
    scatter_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Installs'] <= installs_threshold)]
    sns.scatterplot(x="Installs",y="Rating",data=scatter_data)
    plt.title("Graph 26")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 27 Installs vs Reviews Scatter**")
    st.write("Shows the relationship between installs and reviews.")
    st.write("**Function used:** sns.scatterplot() with outlier removal")
    plt.figure()
    # Remove outliers for both Installs and Reviews
    installs_threshold = df['Installs'].quantile(0.95)
    reviews_threshold = df['Reviews'].quantile(0.95)
    scatter_data = df[(df['Installs'] <= installs_threshold) & (df['Reviews'] <= reviews_threshold)]
    sns.scatterplot(x="Installs",y="Reviews",data=scatter_data)
    plt.title("Graph 27")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 28 Regression Plot Reviews vs Rating**")
    st.write("This plot shows the trend line between reviews and ratings.")
    st.write("**Function used:** sns.regplot() with outlier removal")
    st.write("**Purpose:** To identify linear relationships.")
    plt.figure()
    # Remove outliers for both Reviews and Rating
    reviews_threshold = df['Reviews'].quantile(0.95)
    reg_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    sns.regplot(x="Reviews",y="Rating",data=reg_data)
    plt.title("Graph 28")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 29 Regression Plot Installs vs Rating**")
    st.write("Shows the trend between installs and ratings.")
    st.write("**Function used:** sns.regplot() with outlier removal")
    plt.figure()
    # Remove outliers for both Installs and Rating
    installs_threshold = df['Installs'].quantile(0.95)
    reg_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Installs'] <= installs_threshold)]
    sns.regplot(x="Installs",y="Rating",data=reg_data)
    plt.title("Graph 29")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

# =====================================================
# DISTRIBUTION (30-33)
# =====================================================
with tab3:

    st.header("Distribution Analysis")

    st.write("**Graph 30 Rating Distribution**")
    st.write("Histogram with density curve showing rating distribution.")
    st.write("**Function used:** sns.histplot() with outlier removal")
    st.write("**Purpose:** To analyze rating distribution.")
    plt.figure()
    # Remove outliers for Rating (keep only 1-5 range)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    sns.histplot(rating_data, kde=True)
    plt.title("Graph 30")
    plt.xlim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 31 Reviews Distribution**")
    st.write("Shows how reviews are distributed.")
    st.write("**Function used:** sns.histplot() with outlier removal")
    plt.figure()
    # Remove outliers for Reviews (keep only up to 90th percentile for better visualization)
    reviews_threshold = df['Reviews'].quantile(0.90)
    reviews_data = df[df['Reviews'] <= reviews_threshold]['Reviews']
    sns.histplot(reviews_data, kde=True, bins=30)
    plt.title("Graph 31")
    plt.xlabel("Reviews")
    plt.ylabel("Frequency")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 32 Installs Distribution**")
    st.write("Shows install count distribution.")
    st.write("**Function used:** sns.histplot() with outlier removal")
    plt.figure()
    # Remove outliers for Installs (keep only up to 95th percentile)
    installs_threshold = df['Installs'].quantile(0.95)
    installs_data = df[df['Installs'] <= installs_threshold]['Installs']
    sns.histplot(installs_data, kde=True)
    plt.title("Graph 32")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 33 Rating Boxplot**")
    st.write("Displays rating spread and outliers.")
    st.write("**Function used:** sns.boxplot() with outlier removal")
    plt.figure()
    # Remove outliers for Rating (keep only 1-5 range)
    rating_data = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]['Rating']
    sns.boxplot(x=rating_data)
    plt.title("Graph 33")
    plt.xlim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

# =====================================================
# CORRELATION (34-36)
# =====================================================
with tab4:

    st.header("Correlation Analysis")

    corr=df[["Rating","Reviews","Installs"]].corr()

    st.write("**Graph 34 Correlation Heatmap**")
    st.write("Shows correlation between rating reviews and installs.")
    st.write("**Function used:** sns.heatmap()")
    st.write("**Purpose:** To measure strength of relationships.")
    plt.figure()
    sns.heatmap(corr,annot=True,cmap="coolwarm")
    plt.title("Graph 34")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 35 Pairplot**")
    st.write("Shows pairwise relationships among variables.")
    st.write("**Function used:** sns.pairplot()")
    st.write("**Purpose:** To visualize multiple relationships at once.")
    plt.figure()
    sns.pairplot(df[["Rating","Reviews","Installs"]])
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 36 Correlation Matrix Image**")
    st.write("Another visual representation of correlation values.")
    st.write("**Function used:** plt.imshow() with value annotations")
    st.write("**Purpose:** To display correlation matrix visually.")
    plt.figure()
    plt.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
    plt.colorbar()
    
    # Add correlation values as text annotations
    for i in range(len(corr)):
        for j in range(len(corr.columns)):
            plt.text(j, i, f'{corr.iloc[i, j]:.2f}', 
                    ha="center", va="center", color="black", fontweight="bold")
    
    # Set ticks and labels
    plt.xticks(range(len(corr.columns)), corr.columns, rotation=45)
    plt.yticks(range(len(corr.columns)), corr.columns)
    plt.title("Graph 36")
    st.pyplot(plt)
    plt.close()
    st.write("---")

# =====================================================
# MACHINE LEARNING (37-42)
# =====================================================
with tab5:

    st.header("Machine Learning")

    X=df[["Reviews"]]
    y=df["Rating"]

    X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2)

    model=LinearRegression()
    model.fit(X_train,y_train)

    pred=model.predict(X_test)

    st.write("**Graph 37 Linear Regression**")
    st.write("Shows predicted regression line between reviews and rating.")
    st.write("**Function used:** LinearRegression, plt.scatter, plt.plot with outlier removal")
    st.write("**Purpose:** To predict ratings using reviews.")
    # Remove outliers for training data
    reviews_threshold = df['Reviews'].quantile(0.95)
    clean_df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    
    X = clean_df[["Reviews"]]
    y = clean_df["Rating"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    
    plt.figure()
    plt.scatter(X_test, y_test, color='blue', alpha=0.6, label='Actual Data')
    plt.plot(X_test, pred, color='red', linewidth=2, label='Regression Line')
    plt.title("Graph 37 Regression")
    plt.xlabel("Reviews")
    plt.ylabel("Rating")
    plt.ylim(1, 5)
    plt.legend()
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 38 Prediction Scatter Plot**")
    st.write("Shows predicted ratings as points.")
    st.write("**Function used:** plt.scatter() with outlier removal")
    st.write("**Purpose:** To visualize prediction results.")
    # Remove outliers for training data
    reviews_threshold = df['Reviews'].quantile(0.95)
    clean_df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    
    X = clean_df[["Reviews"]]
    y = clean_df["Rating"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    
    plt.figure()
    plt.scatter(range(len(pred)), pred)
    plt.title("Graph 38 Prediction Scatter")
    plt.xlabel("Sample Index")
    plt.ylabel("Predicted Rating")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 39 Actual Values Scatter Plot**")
    st.write("Displays actual rating values.")
    st.write("**Function used:** plt.scatter() with outlier removal")
    st.write("**Purpose:** To compare actual and predicted results.")
    # Remove outliers for training data
    reviews_threshold = df['Reviews'].quantile(0.95)
    clean_df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    
    X = clean_df[["Reviews"]]
    y = clean_df["Rating"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    plt.figure()
    plt.scatter(range(len(y_test)), y_test)
    plt.title("Graph 39 Actual Scatter")
    plt.xlabel("Sample Index")
    plt.ylabel("Actual Rating")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 40 KMeans Clustering**")
    st.write("Groups apps into clusters based on installs and reviews.")
    st.write("**Function used:** KMeans() with outlier removal")
    st.write("**Purpose:** To identify similar groups of apps.")
    # Remove outliers for clustering
    installs_threshold = df['Installs'].quantile(0.95)
    reviews_threshold = df['Reviews'].quantile(0.95)
    cluster_df = df[(df['Installs'] <= installs_threshold) & (df['Reviews'] <= reviews_threshold)].copy()
    
    kmeans = KMeans(n_clusters=3)
    cluster_df["Cluster"] = kmeans.fit_predict(cluster_df[["Reviews", "Installs"]])
    
    plt.figure()
    plt.scatter(cluster_df["Reviews"], cluster_df["Installs"], c=cluster_df["Cluster"])
    plt.title("Graph 40 KMeans")
    plt.xlabel("Reviews")
    plt.ylabel("Installs")
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 41 Prediction Distribution**")
    st.write("Shows distribution of predicted ratings.")
    st.write("**Function used:** plt.hist() with outlier removal")
    st.write("**Purpose:** To understand prediction spread.")
    # Remove outliers for training data
    reviews_threshold = df['Reviews'].quantile(0.95)
    clean_df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    
    X = clean_df[["Reviews"]]
    y = clean_df["Rating"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    
    plt.figure()
    plt.hist(pred, bins=20, range=(1, 5))
    plt.title("Graph 41 Prediction Distribution")
    plt.xlabel("Predicted Rating")
    plt.ylabel("Frequency")
    plt.xlim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")

    st.write("**Graph 42 Prediction Trend**")
    st.write("Line graph showing prediction pattern for first 50 values.")
    st.write("**Function used:** plt.plot() with outlier removal")
    st.write("**Purpose:** To visualize prediction trend.")
    # Remove outliers for training data
    reviews_threshold = df['Reviews'].quantile(0.95)
    clean_df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5) & (df['Reviews'] <= reviews_threshold)]
    
    X = clean_df[["Reviews"]]
    y = clean_df["Rating"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    
    plt.figure()
    plt.plot(pred[:50])
    plt.title("Graph 42 Prediction Trend")
    plt.xlabel("Sample Index")
    plt.ylabel("Predicted Rating")
    plt.ylim(1, 5)
    st.pyplot(plt)
    plt.close()
    st.write("---")


