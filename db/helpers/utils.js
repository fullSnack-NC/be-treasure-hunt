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
