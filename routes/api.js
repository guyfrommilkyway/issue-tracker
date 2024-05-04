'use strict';

// controllers
const IssueController = require('../controllers/issueController');
const issueController = new IssueController();

module.exports = function (app) {
	app
		.route('/api/issues/:project')
		.get(issueController.read)
		.post(issueController.create)
		.put(issueController.update)
		.delete(issueController.delete);
};
