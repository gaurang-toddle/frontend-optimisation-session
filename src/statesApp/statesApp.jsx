import { initialTravelPlan } from "./Places";
import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import PlaceTree from "./PlaceTree";

const placeTreeContainerStyle = {
  paddingTop: "32px"
};

const StatesApp = () => {
  const [plan, setPlan] = useState(initialTravelPlan);
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [purposeOfVisit, setPurposeOfVisit] = useState();
  const planets = plan.childPlaces;

  const onNumberOfPeopleChange = (e) => {
    const value = e.target.value;
    setNumberOfPeople(value);
  };

  const onPurposeOfVisitChange = (e) => {
    const value = e.target.value;
    setPurposeOfVisit(value);
  };

  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <>
      <div style={styles.header}>
        <h2>Places to visit</h2>
        <input
          type="number"
          style={styles.input}
          max={100}
          placeholder="Number of people to visit"
          value={numberOfPeople}
          onChange={onNumberOfPeopleChange}
        />
        <input
          type="text"
          style={styles.input}
          placeholder="Purpose of visit"
          value={purposeOfVisit}
          onChange={onPurposeOfVisitChange}
        />
      </div>
      <ol>
        {planets.map((place) => (
          <PlaceTree
            key={place.id}
            place={place}
            level={1}
            location={position}
            containerStyle={placeTreeContainerStyle}
          />
        ))}
      </ol>
    </>
  );
};

export default StatesApp;
