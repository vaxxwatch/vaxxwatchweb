export const getLatLngListInRange = (originLatLng, latLngList, distanceCalculatorFunction, rangeInMeters) => {
  if (!originLatLng || !latLngList || !rangeInMeters) {
    return [];
  }

  const distanceFilter = (latLng) => distanceCalculatorFunction(latLng, originLatLng) < rangeInMeters;

  return latLngList.filter(distanceFilter);
};

export const isValidLatLng = (latLng) => {
  return latLng && latLng.length === 2 && !isNaN(latLng[0]) && !isNaN(latLng[1]);
};