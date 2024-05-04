const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const ISSUE_CONTROLLER = require('../constants/controller');

suite('Functional Tests', function () {
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
			.post('/api/issues/test-project')
			.send()
			.end(function (err, res) {
				assert.equal(res.status, 200);
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
			.post('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
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
			.post('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(JSON.stringify(res.body), JSON.stringify(ISSUE_CONTROLLER.ERROR_MISSING_FIELDS));
				done();
			});
	});
	test('View issues on a project', function (done) {
		chai
			.request(server)
			.keepOpen()
			.get('/api/issues/test-project')
			.end(function (err, res) {
				assert.equal(res.status, 200);
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
				done();
			});
	});
	test('View issues on a project with multiple filters', function (done) {
		chai
			.request(server)
			.keepOpen()
			.put('/api/issues/test-project?open=true&assigned_to=Chai and Mocha')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				done();
			});
	});
	test('Update one field on an issue', function (done) {
		const payload = {
			_id: '663643b0608861d73f63c345',
			issue_title: 'Updated title',
		};

		chai
			.request(server)
			.keepOpen()
			.put('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(JSON.stringify(res.body), JSON.stringify({ ...ISSUE_CONTROLLER.SUCCESS_UPDATE, _id: payload._id }));
				done();
			});
	});
	test('Update multiple fields on an issue', function (done) {
		const payload = {
			_id: '663643b0608861d73f63c345',
			issue_title: 'Updated title',
			issue_text: 'Updated text',
			assigned_to: 'Updated assignee',
		};

		chai
			.request(server)
			.keepOpen()
			.put('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(JSON.stringify(res.body), JSON.stringify({ ...ISSUE_CONTROLLER.SUCCESS_UPDATE, _id: payload._id }));
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
			.put('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(JSON.stringify(res.body), JSON.stringify(ISSUE_CONTROLLER.ERROR_MISSING_ID));
				done();
			});
	});
	test('Update an issue with no fields to update', function (done) {
		const payload = {
			_id: '663643b0608861d73f63c345',
		};

		chai
			.request(server)
			.keepOpen()
			.put('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(JSON.stringify(res.body), JSON.stringify({ ...ISSUE_CONTROLLER.ERROR_NO_FIELDS, _id: payload._id }));
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
			.put('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(JSON.stringify(res.body), JSON.stringify({ ...ISSUE_CONTROLLER.ERROR_UNABLE_UPDATE, _id: payload._id }));
				done();
			});
	});
	test('Delete an issue', function (done) {
		const payload = {
			_id: '663647f7cea69ebe6083ebb8',
		};

		chai
			.request(server)
			.keepOpen()
			.delete('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(res.status, 200);
				done();
			});
	});
	test('Delete an issue with an invalid _id', function (done) {
		const payload = {
			_id: '663647f7cea69ebe6083ebc7',
		};

		chai
			.request(server)
			.keepOpen()
			.delete('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(JSON.stringify(res.body), JSON.stringify({ ...ISSUE_CONTROLLER.ERROR_UNABLE_DELETE, _id: payload._id }));
				done();
			});
	});
	test('Delete an issue with missing _id', function (done) {
		const payload = {};

		chai
			.request(server)
			.keepOpen()
			.delete('/api/issues/test-project')
			.send(payload)
			.end(function (err, res) {
				assert.equal(JSON.stringify(res.body), JSON.stringify(ISSUE_CONTROLLER.ERROR_MISSING_ID));
				done();
			});
	});
});
