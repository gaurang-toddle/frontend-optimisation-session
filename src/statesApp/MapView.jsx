import { useMemo } from "react";
import { getDistanceInKm } from "./utils";

const MapView = ({ place, location }) => {
  const distanceCurrentLocation = getDistanceInKm({
    lat1: place.latitude,
    lon1: place.longitude,
    lat2: location.latitude,
    lon2: location.longitude,
  });
  return (
    <div>
      {distanceCurrentLocation > 0 ? (
        <h4>Distance: {distanceCurrentLocation} Km</h4>
      ) : null}
      <iframe
        width="250"
        height="250"
        id={`gmap_canvas_${place.id}`}
        src={`https://maps.google.com/maps?q=${place.title}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        title={place.title}
        style={{ border: "0", width: "100%", height: "100%" }}
      ></iframe>
    </div>
  );
};

export default MapView;
