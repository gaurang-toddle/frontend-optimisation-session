// StarWarsList.js
import React, { useState } from "react";
import { useStarWars } from "../modules/Module.js";
import "./StarWarsList.css";
import { loremIpsum } from "lorem-ipsum";

const StarWarsList = () => {
  const posts = useStarWars();
  console.log({ posts });

  const [toggleRender, setToggleRender] = useState(false);

  const handleReRender = () => {
    // Logic for triggering a re-render (e.g., changing state)
    // This could be a more complex logic based on your requirements
    console.log("Re-render button clicked!");
    setToggleRender((prev) => !prev);
  };
  return (
    <div className="container">
      <h1>Posts</h1>
      <button onClick={handleReRender}>Re-Render List</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>title</th>
            <th>Comment</th>
            <th>Image</th>
            <th>thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                {loremIpsum({
                  count: 1,
                  units: "sentences",
                  sentenceLowerBound: 4,
                  sentenceUpperBound: 8,
                })}
              </td>
              <td>
                {loremIpsum({
                  count: 1,
                  units: "sentences",
                  sentenceLowerBound: 4,
                  sentenceUpperBound: 8,
                })}
              </td>
              <td>
                <img src={post.thumbnailUrl}></img>
              </td>
              <td>
                <img src={post.thumbnailUrl}></img>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarWarsList;
