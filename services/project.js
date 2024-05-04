const Project = require('../models/project');

class ProjectServices {
	async read(name, query) {
		const project = await Project.findOne({ name }).populate({
			path: 'issues',
			match: query,
		});

		return project;
	}
	async create(name) {
		const project = new Project({ name });
		await project.save();

		return project;
	}
	async update(name, issue) {
		await Project.findOneAndUpdate(
			{ name },
			{
				$push: { issues: issue },
			}
		);
	}
	async updateDelete(name, issue) {
		await Project.findOneAndUpdate(
			{ name },
			{
				$pull: { issues: issue },
			}
		);
	}
}

module.exports = ProjectServices;
