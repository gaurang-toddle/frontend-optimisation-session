// StarWarsList.js
import React, { useState } from "react";
import { useStarWars } from "../modules/Module.js";
import "./StarWarsList.css";
import { loremIpsum } from "lorem-ipsum";
import { useEffect } from "react";

const RowCells = ({ post, isRowContentVisible = true }) => {
  return (
    <>
      {" "}
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
    </>
  );
};

const Row = ({ post }) => {
  return (
    <tr>
      <RowCells post={post}></RowCells>
    </tr>
  );
};

const StarWarsList = () => {
  const posts = useStarWars();

  console.log({ posts });

  const [toggleRender, setToggleRender] = useState(false);

  const handleReRender = () => {
    // Logic for triggering a re-render (e.g., changing state)
    // This could be a more complex logic based on your requirements
    console.log("Re-render button clicked!");
    if (page > 1) {
      setVisiblePosts([]);
      setPage(1);
    }
    setToggleRender((prev) => !prev);
  };

  const [page, setPage] = useState(1);
  const [visiblePosts, setVisiblePosts] = useState([]);

  const itemsPerPage = 20;

  useEffect(() => {
    // Calculate the index range for the current page
    const startIndex = 0;
    const endIndex = page + itemsPerPage;

    // Update the visiblePosts array based on the current page
    setVisiblePosts(posts.slice(startIndex, endIndex));
  }, [page, posts]);

  const handleScroll = () => {
    // Load more data when scrolling to the bottom
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
    console.log({ isBottom });
    if (isBottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          {visiblePosts.map((post) => (
            <Row post={post} key={post.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarWarsList;
