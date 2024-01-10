export const getDistanceInKm = ({ lat1, lon1, lat2, lon2 }) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return isNaN(d) ? 0 : Math.round(d);
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const getAverageDistanceBetweenCities = (places) => {
  let totalDistance = 0;
  let numberOfDistances = 0;

  // Assume places is an array of objects with latitude and longitude properties
  for (let i = 0; i < places.length; i++) {
    for (let j = 0; j < places.length; j++) {
      const distance = getDistanceInKm({
        lat1: places[i].latitude,
        lon1: places[i].longitude,
        lat2: places[j].latitude,
        lon2: places[j].longitude,
      });

      totalDistance += distance;
      numberOfDistances++;
    }
  }

  return numberOfDistances > 0
    ? Math.round(totalDistance / numberOfDistances)
    : 0;
};
