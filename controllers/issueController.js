// services
const IssueServices = require('../services/issue');
const ProjectServices = require('../services/project');

const issueServices = new IssueServices();
const projectServices = new ProjectServices();

const MISSING_ID = { error: 'missing _id' };
const MISSING_FIELDS = { error: 'require field(s) missing' };
const RECORD_NOT_FOUND = { error: 'record not found' };

class IssueController {
	async create(req, res) {
		const { project } = req?.params;

		if (!project) {
			res.status(404).json(MISSING_ID);
			return;
		}

		const { issue_title, issue_text, created_by, assigned_to, status_text } =
			req.body;

		const payload = {
			issue_title: issue_title?.toString()?.trim(),
			issue_text: issue_text?.toString()?.trim(),
			created_by: created_by?.toString()?.trim(),
			assigned_to: assigned_to?.toString()?.trim(),
			status_text: status_text?.toString()?.trim(),
		};

		if (!payload.issue_title || !payload.issue_text || !payload.created_by) {
			res.status(400).json(MISSING_FIELDS);
			return;
		}

		const { name, issues } =
			(await projectServices.read(project)) ??
			(await projectServices.create(project));
		const issue = await issueServices.create(payload);
		await projectServices.update(name, [...issues, issue._id]);

		res.status(200).json(issue);
	}

	async read(req, res) {
		const { project } = req?.params;

		if (!project) {
			res.status(404).json(MISSING_ID);
			return;
		}

		const resProject = await projectServices.read(project);

		if (!resProject) {
			res.status(404).json(RECORD_NOT_FOUND);
			return;
		}

		res.status(200).json(resProject.issues);
	}
}

module.exports = IssueController;
