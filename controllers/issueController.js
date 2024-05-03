// services
const IssueServices = require('../services/issue');
const ProjectServices = require('../services/project');

const ERROR_CONTROLLER = require('../constants/controller');
const REQUIRED_FIELDS = require('../constants/requiredFields');
const objectValidator = require('../utils/objectValidator');
const createPayload = require('../utils/createPayload');

const issueServices = new IssueServices();
const projectServices = new ProjectServices();

class IssueController {
	async create(req, res) {
		const { project } = req?.params;

		if (!project) {
			res.send(ERROR_CONTROLLER.MISSING_ID);
			return;
		}

		if (!objectValidator(req?.body, REQUIRED_FIELDS)) {
			res.send(ERROR_CONTROLLER.MISSING_FIELDS);
			return;
		}

		const payload = createPayload(req?.body);

		const { name, issues } = (await projectServices.read(project)) ?? (await projectServices.create(project));
		const issue = await issueServices.create(payload);
		await projectServices.update(name, [...issues, issue._id]);

		res.status(200).json(issue);
	}

	async read(req, res) {
		const { project } = req?.params;
		const query = req?.query;

		if (!project) {
			res.send(ERROR_CONTROLLER.MISSING_ID);
			return;
		}

		const resProject = await projectServices.read(project, query);

		if (!resProject) {
			res.send(ERROR_CONTROLLER.NOT_FOUND);
			return;
		}

		res.status(200).json(resProject.issues);
	}
}

module.exports = IssueController;
