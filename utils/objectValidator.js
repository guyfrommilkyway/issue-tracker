const objectValidator = (object, requiredFields) => {
	for (const field of requiredFields) {
		if (!object[field]) return false;
	}

	return true;
};

module.exports = objectValidator;
