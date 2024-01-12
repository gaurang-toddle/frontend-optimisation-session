import React, { useMemo, useState } from "react";
import MapView from "./MapView";
import { styles } from "./styles";
import { getAverageDistanceBetweenCities } from "./utils";

const PlaceTree = ({
  place,
  level = 1,
  location = {},
  containerStyle = {},
  changeTotalDistance = () => {},
}) => {
  const childPlaces = place.childPlaces;
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (e, index) => {
    e?.stopPropagation();
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  // average distance between cities in the same country
  const averageDistance =
    level === 3 ? getAverageDistanceBetweenCities(childPlaces) : 0;

  return (
    <div style={containerStyle}>
      <div
        style={styles.buttonStyles}
        onClick={(e) => handleClick(e, place.id)}
      >
        <div style={styles.placeTitle}>{place.title}</div>
        {averageDistance > 0 && place.id === activeIndex ? (
          <div>Average distance between cities: {averageDistance}</div>
        ) : null}
        <div>
          <div>
            {level === 4 || childPlaces.length === 0 ? (
              <MapView place={place} location={location} />
            ) : null}
          </div>
        </div>
        {childPlaces.length > 0 && place.id === activeIndex ? (
          <div style={{ marginLeft: `${level * 16}px` }}>
            {childPlaces.map((place) => (
              <PlaceTree
                key={place.id}
                place={place}
                level={level + 1}
                location={location}
                containerStyle={containerStyle}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
PlaceTree.displayName = "PlaceTree";

export default PlaceTree;
// export default React.memo(PlaceTree);
