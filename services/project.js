const Project = require('../models/project');

class ProjectServices {
	async read(name) {
		const filter = { name };
		const project = await Project.findOne(filter).populate('issues');

		return project;
	}
	async create(name) {
		const filter = { name };
		const project = new Project(filter);
		await project.save();

		return project;
	}
	async update(name, issues) {
		const filter = { name };
		const payload = { issues };

		await Project.findOneAndUpdate(filter, payload);
	}
}

module.exports = ProjectServices;
