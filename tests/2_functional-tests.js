const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const ISSUE_CONTROLLER = require('../constants/controller');

suite('Functional Tests', function () {
	const project = 'test-project';
	let issueId;

	test('Create an issue with every field', function (done) {
		const payload = {
			issue_title: 'Title',
			issue_text: 'text',
			created_by: 'Functional Test - Every field',
			assigned_to: 'Chai and Mocha',
			status_text: 'In QA',
		};

		chai
			.request(server)
			.keepOpen()
			.post(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isTrue(!!res.body._id, true);

				issueId = res.body._id;
				done();
			});
	});
	test('Create an issue with only required fields', function (done) {
		const payload = {
			issue_title: 'Title',
			issue_text: 'text',
			created_by: 'Functional Test - Required fields',
		};

		chai
			.request(server)
			.keepOpen()
			.post(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isTrue(!!res.body._id, true);
				done();
			});
	});
	test('Create an issue with missing required fields', function (done) {
		const payload = {
			issue_title: 'Title',
			created_by: 'Functional Test - Missing required fields',
		};

		chai
			.request(server)
			.keepOpen()
			.post(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.isTrue(!!res.body.error);
				assert.equal(JSON.stringify(res.body.error), JSON.stringify(ISSUE_CONTROLLER.ERROR_MISSING_FIELDS.error));
				done();
			});
	});
	test('View issues on a project', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get(`/api/issues/${project}`)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isArray(res.body);
				done();
			});
	});
	test('View issues on a project with one filter', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/issues/test-project?open=true')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isArray(res.body);
				done();
			});
	});
	test('View issues on a project with multiple filters', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/issues/test-project?open=true&issue_title=Chai and Mocha')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isArray(res.body);
				done();
			});
	});
	test('Update one field on an issue', function (done) {
		const payload = {
			_id: issueId,
			issue_title: 'Updated title',
		};

		chai
			.request(server)
			.keepOpen()
			.put(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isTrue(!!res.body.result);
				assert.equal(JSON.stringify(res.body.result), JSON.stringify(ISSUE_CONTROLLER.SUCCESS_UPDATE.result));
				done();
			});
	});
	test('Update multiple fields on an issue', function (done) {
		const payload = {
			_id: issueId,
			issue_title: 'Updated title',
			issue_text: 'Updated text',
			assigned_to: 'Updated assignee',
		};

		chai
			.request(server)
			.keepOpen()
			.put(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isTrue(!!res.body.result);
				assert.equal(JSON.stringify(res.body.result), JSON.stringify(ISSUE_CONTROLLER.SUCCESS_UPDATE.result));
				done();
			});
	});
	test('Update an issue with missing _id', function (done) {
		const payload = {
			issue_title: 'Updated title',
			issue_text: 'Updated text',
			assigned_to: 'Updated assignee',
		};

		chai
			.request(server)
			.keepOpen()
			.put(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.isTrue(!!res.body.error);
				assert.equal(JSON.stringify(res.body.error), JSON.stringify(ISSUE_CONTROLLER.ERROR_MISSING_ID.error));
				done();
			});
	});
	test('Update an issue with no fields to update', function (done) {
		const payload = {
			_id: issueId,
		};

		chai
			.request(server)
			.keepOpen()
			.put(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.isTrue(!!res.body.error);
				assert.equal(JSON.stringify(res.body.error), JSON.stringify(ISSUE_CONTROLLER.ERROR_NO_FIELDS.error));
				done();
			});
	});
	test('Update an issue with an invalid _id', function (done) {
		const payload = {
			_id: '663643b0608861d73f63c334',
			issue_title: 'Updated title',
			issue_text: 'Updated text',
			assigned_to: 'Updated assignee',
		};

		chai
			.request(server)
			.keepOpen()
			.put(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.isTrue(!!res.body.error);
				assert.equal(JSON.stringify(res.body.error), JSON.stringify(ISSUE_CONTROLLER.ERROR_UNABLE_UPDATE.error));
				done();
			});
	});
	test('Delete an issue', function (done) {
		const payload = {
			_id: issueId,
		};

		chai
			.request(server)
			.keepOpen()
			.delete(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isTrue(!!res.body.result);
				assert.equal(JSON.stringify(res.body.result), JSON.stringify(ISSUE_CONTROLLER.SUCCESS_DELETE.result));
				done();
			});
	});
	test('Delete an issue with an invalid _id', function (done) {
		const payload = {
			_id: '663647f7cea69ebe6083eac7',
		};

		chai
			.request(server)
			.keepOpen()
			.delete(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.isTrue(!!res.body.error);
				assert.equal(JSON.stringify(res.body.error), JSON.stringify(ISSUE_CONTROLLER.ERROR_UNABLE_DELETE.error));
				done();
			});
	});
	test('Delete an issue with missing _id', function (done) {
		const payload = {};

		chai
			.request(server)
			.keepOpen()
			.delete(`/api/issues/${project}`)
			.send(payload)
			.end(function (err, res) {
				assert.isTrue(!!res.body.error);
				assert.equal(JSON.stringify(res.body.error), JSON.stringify(ISSUE_CONTROLLER.ERROR_MISSING_ID.error));
				done();
			});
	});
});
