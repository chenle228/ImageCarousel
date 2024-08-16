import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import "./styles.css";

const App = () => {
  // State to store image URLs fetched from the endpoint
  const [imageUrls, setImageUrls] = useState([]);
  // State to store the selected subreddit
  const [subreddit, setSubreddit] = useState("aww");
  // State to store the selected time period for fetching images
  const [timePeriod, setTimePeriod] = useState("all");
  // State to store the selected animation type
  const [animation, setAnimation] = useState("fade"); // Default animation

  // List of available subreddits
  const subreddits = ["aww", "pics", "funny", "gaming"];
  // List of available time periods
  const timePeriods = ["day", "week", "month", "year", "all"];

  useEffect(() => {
    // Fetch image URLs from the Reddit API endpoint based on subreddit and time period
    fetch(`https://www.reddit.com/r/${subreddit}/top/.json?t=${timePeriod}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract image URLs from the nested structure of the response data
        const urls = data.data.children.map(
          (child) => child.data.url_overridden_by_dest
        );
        // Update state with the fetched image URLs
        setImageUrls(urls);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [subreddit, timePeriod]); // Re-run effect when subreddit or timePeriod changes

  return (
    <div className="App">
      <h1>Image Carousel</h1>
      <div className="controls">
        {/* Dropdown to select subreddit */}
        <label>
          Subreddit:
          <select
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
          >
            {subreddits.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </label>
        {/* Dropdown to select time period */}
        <label>
          Time Period:
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {timePeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </label>
        {/* Dropdown to select animation type */}
        <label>
          Animation:
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
          >
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
          </select>
        </label>
      </div>
      {/* Render Carousel component if images are loaded, otherwise show loading message */}
      {imageUrls.length > 0 ? (
        <Carousel imageUrls={imageUrls} animation={animation} />
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default App;
