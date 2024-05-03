const createPayload = (obj) => {
	const payload = {};

	for (const key of Object.keys(obj)) {
		payload[key] = obj[key]?.toString()?.trim();
	}

	return payload;
};

module.exports = createPayload;
