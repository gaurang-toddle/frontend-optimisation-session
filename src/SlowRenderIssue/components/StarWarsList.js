// StarWarsList.js
import React, { useState, useRef, useEffect } from "react";
import { useStarWars } from "../modules/Module.js";
import "./StarWarsList.css";
import { useCallbackRef } from "../modules/useCallbackRef.js";
import { loremIpsum } from "lorem-ipsum";
import { observeElementInViewport } from "observe-element-in-viewport";

const RowCells = ({ post, isRowContentVisible }) => {
  return (
    <>
      {" "}
      <td>{isRowContentVisible ? post.title : "-"}</td>
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
  const [rowNodeRef, setRowNodeRef] = useCallbackRef();
  const [isRowContentVisible, setIsRowContentVisible] = useState(false);

  // useEffect(() => {
  //   const target = rowNodeRef.current;
  //   console.log({ target });
  //   console.log({ target });

  //   if (!target) return;

  //   // handler for when target is in viewport
  //   const inHandler = (entry, unobserve, targetEl) => {
  //     if (!isRowContentVisible) {
  //       setIsRowContentVisible(true);
  //     } else {
  //       // stop observing this row element.
  //       // because now it's already visible to user
  //       // comment out this if outHandler is used to hide the element's cell contents
  //       unobserve();
  //     }
  //   };

  //   // handler for when target is NOT in viewport
  //   const outHandler = () => {
  //     // Default - don't use setting element visiblility to false
  //     // CPU expensive operation if enabled.
  //     setIsRowContentVisible(false);
  //   };

  //   // the returned function, when called, stops tracking the target element in the given viewport
  //   const unobserveFn = observeElementInViewport(
  //     target,
  //     inHandler,
  //     outHandler,
  //     {
  //       // set viewport, if null then it's set to window
  //       viewport: null,
  //     }
  //   );

  //   return () => {
  //     // remove intersection observer from DOM node
  //     unobserveFn();
  //     rowNodeRef.current = null;
  //   };
  // }, []);

  return (
    <tr key={post.id}>
      <RowCells
        post={post}
        // isRowContentVisible={isRowContentVisible}
      ></RowCells>
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
            <Row post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarWarsList;
