// services
const IssueServices = require('../services/issue');
const ProjectServices = require('../services/project');

const ISSUE_CONTROLLER = require('../constants/controller');
const REQUIRED_FIELDS = require('../constants/requiredFields');
const objectValidator = require('../utils/objectValidator');
const createPayload = require('../utils/createPayload');

const issueServices = new IssueServices();
const projectServices = new ProjectServices();

class IssueController {
	async create(req, res) {
		const { project } = req?.params;
		const fields = req?.body;

		if (!project) {
			res.send(ISSUE_CONTROLLER.ERROR_MISSING_ID);
			return;
		}

		if (!objectValidator(fields, REQUIRED_FIELDS)) {
			res.send(ISSUE_CONTROLLER.ERROR_MISSING_FIELDS);
			return;
		}

		const issuePayload = createPayload(fields);

		(await projectServices.read(project)) ?? (await projectServices.create(project));
		const newIssue = await issueServices.create(issuePayload);
		await projectServices.update(project, newIssue._id);

		res.status(200).json(newIssue);
	}
	async read(req, res) {
		const { project } = req?.params;
		const query = req?.query;

		if (!project) {
			res.send(ISSUE_CONTROLLER.ERROR_MISSING_ID);
			return;
		}

		const resProject = await projectServices.read(project, query);

		if (!resProject) {
			res.send(ISSUE_CONTROLLER.ERROR_NOT_FOUND);
			return;
		}

		res.status(200).json(resProject.issues);
	}
	async update(req, res) {
		const { project } = req?.params;

		if (!project) {
			res.send(ISSUE_CONTROLLER.ERROR_MISSING_ID);
			return;
		}

		if (!objectValidator(req?.body, ['_id'])) {
			res.send(ISSUE_CONTROLLER.ERROR_MISSING_ID);
			return;
		}

		const _id = req?.body?._id;
		const fields = { ...req?.body };
		delete fields._id;

		for (const key in fields) {
			if (fields[key] === '') delete fields[key];
		}

		if (fields.length === 0) {
			res.send({ ...ISSUE_CONTROLLER.ERROR_NO_FIELDS, _id });
			return;
		}

		const updatedIssue = await issueServices.update(_id, fields);

		if (!updatedIssue) {
			res.send({ ...ISSUE_CONTROLLER.ERROR_UNABLE_UPDATE, _id });
			return;
		}

		res.status(200).json({ ...ISSUE_CONTROLLER.SUCCESS_UPDATE, _id });
	}
	async delete(req, res) {
		const { project } = req?.params;

		if (!project) {
			res.send(ISSUE_CONTROLLER.ERROR_MISSING_ID);
			return;
		}

		if (!objectValidator(req?.body, ['_id'])) {
			res.send(ISSUE_CONTROLLER.ERROR_MISSING_ID);
			return;
		}

		const _id = req?.body?._id;

		const deletedIssue = await issueServices.delete(_id);

		if (!deletedIssue) {
			res.send({ ...ISSUE_CONTROLLER.ERROR_UNABLE_DELETE, _id });
			return;
		}

		await projectServices.updateDelete(project, _id);

		res.status(200).json({ ...ISSUE_CONTROLLER.SUCCESS_DELETE, _id });
	}
}

module.exports = IssueController;
