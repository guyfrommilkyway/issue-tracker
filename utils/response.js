const response = (res, code, json) => {
	res.status(code).json(json);

	return;
};

module.exports = response;
