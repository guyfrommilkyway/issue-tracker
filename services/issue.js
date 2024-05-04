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
	async update(_id, data) {
		const updatedIssue = await Issue.findByIdAndUpdate(_id, data, { new: true });

		return updatedIssue;
	}
	async delete(_id) {
		const deletedIssue = await Issue.findByIdAndDelete(_id);

		return deletedIssue;
	}
}

module.exports = IssueServices;
