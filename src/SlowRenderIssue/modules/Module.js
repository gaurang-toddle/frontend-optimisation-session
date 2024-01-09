import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const StarWarsContext = createContext();

export const StarWarsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <StarWarsContext.Provider value={posts}>
      {children}
    </StarWarsContext.Provider>
  );
};

export const useStarWars = () => {
  const context = useContext(StarWarsContext);
  if (!context) {
    throw new Error("useStarWars must be used within a StarWarsProvider");
  }
  return context;
};
