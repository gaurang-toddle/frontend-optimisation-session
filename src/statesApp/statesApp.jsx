import {initialTravelPlan} from "./Places";
import {useState} from "react";

const styles = {
    buttonStyles: {
        padding: "8px 20px",
        backgroundColor: "rgba(70,116,232,0.25)",
        color: "rgb(19,45,112)",
        border: "1px solid",
        borderColor: "rgba(63,84,138,0.60)",
        cursor: "pointer",
        marginRight: "10px",
        marginTop: "8px",
        borderRadius: "8px"
    }
}
function PlaceTree({ place, level = 1 }) {
    const childPlaces = place.childPlaces;
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (e, index) => {
        e?.stopPropagation();
        setActiveIndex(index === activeIndex ? -1 : index);

    };
    return (
        <div style={styles.buttonStyles} onClick={(e) =>handleClick(e,place.id)}>
            {place.title}
            {childPlaces.length > 0 && place.id === activeIndex ? (
                <div style={{ marginLeft: `${level*16}px` }}>
                    {childPlaces.map(place => (
                        <PlaceTree key={place.id} place={place} level={level+1} />
                    ))}
                </div>
            ): null}
        </div>
    );
}
function StatesApp () {
    const [plan, setPlan] = useState(initialTravelPlan);
    const planets = plan.childPlaces;
    return (
        <>
            <h2>Places to visit</h2>
            <ol>
                {planets.map(place => (
                    <PlaceTree key={place.id} place={place} level={1} />
                ))}
            </ol>
        </>
    );
}

export default StatesApp;