const ERROR_CONTROLLER = {
	MISSING_ID: { error: 'missing _id' },
	MISSING_FIELDS: { error: 'required field(s) missing' },
	NOT_FOUND: { error: 'record not found' },
};

Object.freeze(ERROR_CONTROLLER);

module.exports = ERROR_CONTROLLER;
