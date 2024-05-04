const ISSUE_CONTROLLER = {
	ERROR_MISSING_ID: { error: 'missing _id' },
	ERROR_MISSING_FIELDS: { error: 'required field(s) missing' },
	ERROR_NO_FIELDS: { error: 'no update field(s) sent' },
	ERROR_NOT_FOUND: { error: 'record not found' },
	ERROR_UNABLE_UPDATE: { error: 'could not update' },
	ERROR_UNABLE_DELETE: { error: 'could not delete' },
	SUCCESS_UPDATE: { result: 'successfully updated' },
	SUCCESS_DELETE: { result: 'successfully deleted' },
};

Object.freeze(ISSUE_CONTROLLER);

module.exports = ISSUE_CONTROLLER;
