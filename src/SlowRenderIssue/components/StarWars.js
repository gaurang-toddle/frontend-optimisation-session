import React from "react";
import { StarWarsProvider } from "../modules/Module.js";
import StarWarsList from "./StarWarsList.js";

const StarWars = (props) => {
  return (
    <StarWarsProvider>
      <StarWarsList />
    </StarWarsProvider>
  );
};

export default StarWars;
