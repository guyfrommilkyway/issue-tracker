// services
const IssueServices = require('../services/issue');
const ProjectServices = require('../services/project');

import ERROR_CONTROLLER from '../constants/controller';

const issueServices = new IssueServices();
const projectServices = new ProjectServices();

class IssueController {
	async create(req, res) {
		const { project } = req?.params;

		if (!project) {
			res.status(404).json(ERROR_CONTROLLER.MISSING_ID);
			return;
		}

		const { issue_title, issue_text, created_by, assigned_to, status_text } =
			req.body;

		if (!issue_title || !issue_text || !created_by) {
			res.status(400).json(ERROR_CONTROLLER.MISSING_FIELDS);
			return;
		}

		const payload = {
			issue_title: issue_title?.toString()?.trim(),
			issue_text: issue_text?.toString()?.trim(),
			created_by: created_by?.toString()?.trim(),
			assigned_to: assigned_to?.toString()?.trim(),
			status_text: status_text?.toString()?.trim(),
		};

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
			res.status(404).json(ERROR_CONTROLLER.MISSING_ID);
			return;
		}

		const resProject = await projectServices.read(project);

		if (!resProject) {
			res.status(404).json(ERROR_CONTROLLER.NOT_FOUND);
			return;
		}

		res.status(200).json(resProject.issues);
	}
}

module.exports = IssueController;
