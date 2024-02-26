const Issue = require('../models/issue');

class IssueServices {
	async create(data) {
		const payload = {
			...data,
			created_on: new Date(),
			updated_on: new Date(),
		};
		const issue = new Issue(payload);
		await issue.save();

		return issue;
	}
}

module.exports = IssueServices;
