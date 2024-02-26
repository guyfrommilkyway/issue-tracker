'use strict';

// controllers
const IssueController = require('../controllers/issueController');
const issueController = new IssueController();

module.exports = function (app) {
	app
		.route('/api/issues/:project')
		.get(issueController.read)
		.post(issueController.create)
		.put(async function (req, res) {
			const { project } = req?.params;

			res.status(200).json({ message: 'Good job' });
		})

		.delete(async function (req, res) {
			const { project } = req?.params;

			res.status(200).json({ message: 'Good job' });
		});
};
