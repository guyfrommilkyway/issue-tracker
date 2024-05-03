const ERROR_CONTROLLER = {
	MISSING_ID: { error: 'missing _id' },
	MISSING_FIELDS: { error: 'required field(s) missing' },
	NO_FIELDS: { error: 'no update field(s) sent' },
	NOT_FOUND: { error: 'record not found' },
	UNABLE_UPDATE: { error: 'could not update' },
	UNABLE_DELETE: { error: 'could not delete' },
};

Object.freeze(ERROR_CONTROLLER);

module.exports = ERROR_CONTROLLER;
