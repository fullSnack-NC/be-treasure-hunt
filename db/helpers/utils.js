exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatParks = (parks, idLookup) => {
  return parks.map(({ city, ...restOfPark }) => {
    const town_id = idLookup[city];
    return {
      town_id,
      ...restOfPark,
    };
  });
};

exports.formatMaps = (maps, idLookup) => {
  return maps.map(({ park, ...restOfMap }) => {
    const park_id = idLookup[park];
    return {
      park_id,
      ...restOfMap,
    };
  });
};

exports.formatWaypoints = (waypoints, idLookup) => {
  return waypoints.map(({ map, ...restOfWaypoint }) => {
    const map_id = idLookup[map];
    return {
      map_id,
      ...restOfWaypoint,
    };
  });
};
