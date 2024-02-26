// services
const IssueServices = require('../services/issue');
const ProjectServices = require('../services/project');

// utils
const response = require('../utils/response');

const issueServices = new IssueServices();
const projectServices = new ProjectServices();

class IssueController {
	async create(req, res) {
		const { project } = req?.params;

		if (!project) response(res, 404, { error: 'missing _id' });

		const { issue_title, issue_text, created_by, assigned_to, status_text } =
			req.body;

		const payload = {
			issue_title: issue_title?.toString()?.trim(),
			issue_text: issue_text?.toString()?.trim(),
			created_by: created_by?.toString()?.trim(),
			assigned_to: assigned_to?.toString()?.trim(),
			status_text: status_text?.toString()?.trim(),
		};

		if (!payload.title || !payload.text || !payload.by)
			response(res, 400, { error: 'require field(s) missing' });

		const { name, issues } =
			(await projectServices.read(project)) ??
			(await projectServices.create(project));
		const issue = await issueServices.create(payload);
		await projectServices.update(name, [...issues, issue._id]);

		res.status(200).json(issue);
	}

	async read(req, res) {
		const { project } = req?.params;

		if (!project) response(res, 400, { error: 'missing _id' });

		const resProject = await projectServices.read(project);

		if (!resProject) response(res, 400, { error: 'record not found' });

		const { issues } = resProject;

		res.status(200).json(issues);
	}
}

module.exports = IssueController;
