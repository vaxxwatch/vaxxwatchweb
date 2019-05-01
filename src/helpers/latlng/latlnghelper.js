export const getLatLngListInRange = (originLatLng, latLngList, distanceCalculatorFunction, rangeInMeters) => {
  if (!originLatLng || !latLngList || !rangeInMeters) {
    return [];
  }

  return latLngList.reduce((latLngsInRange, latLng) => {
    const distance = distanceCalculatorFunction(latLng, originLatLng);

    return distance < rangeInMeters
      ? [...latLngsInRange, latLng]
      : latLngsInRange;
  }, []);
};