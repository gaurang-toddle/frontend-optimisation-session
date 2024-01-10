// StarWarsList.js
import React, { useState, useRef, useEffect } from "react";
import { useStarWars } from "../modules/Module.js";
import "./StarWarsList.css";
import { useCallbackRef } from "../modules/useCallbackRef.js";
import { loremIpsum } from "lorem-ipsum";
import { observeElementInViewport } from "observe-element-in-viewport";

const DUMMY_TEXT = loremIpsum({
  count: 1,
  units: "sentences",
  sentenceLowerBound: 4,
  sentenceUpperBound: 8,
});

const RowCells = ({ post, isRowContentVisible }) => {
  return (
    <>
      {" "}
      <td>{isRowContentVisible ? post.title : "-"}</td>
      <td>{isRowContentVisible ? DUMMY_TEXT : "-"}</td>
      <td>{isRowContentVisible ? DUMMY_TEXT : "-"}</td>
      <td>{isRowContentVisible ? <img src={post.thumbnailUrl}></img> : "-"}</td>
      <td>
        {isRowContentVisible ? <img src={post.thumbnailUrl}></img> : null}
      </td>
    </>
  );
};

const Row = ({ post }) => {
  const [rowNodeRef, setRowNodeRef] = useCallbackRef();
  const [isRowContentVisible, setIsRowContentVisible] = useState(false);

  useEffect(() => {
    const target = rowNodeRef.current;

    if (!target) return;

    // handler for when target is in viewport
    const inHandler = (entry, unobserve, targetEl) => {
      if (!isRowContentVisible) {
        setIsRowContentVisible(true);
      } else {
        unobserve();
      }
    };
    const outHandler = () => {
      setIsRowContentVisible(false);
    };

    const unobserveFn = observeElementInViewport(
      target,
      inHandler,
      outHandler,
      {
        viewport: null,
      }
    );

    return () => {
      // remove intersection observer from DOM node
      unobserveFn();
      rowNodeRef.current = null;
    };
  }, [post, rowNodeRef]);

  return (
    <tr key={post.id} ref={(node) => setRowNodeRef(node)}>
      {isRowContentVisible ? (
        <RowCells
          post={post}
          isRowContentVisible={isRowContentVisible}
        ></RowCells>
      ) : (
        <td></td>
      )}
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
            <Row post={post} key={post.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarWarsList;
