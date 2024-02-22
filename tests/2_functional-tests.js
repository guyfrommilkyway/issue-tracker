const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
	test('Create an issue with every field', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.post('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Create an issue with only required fields', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.post('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Create an issue with missing required fields', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.post('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('View issues on a project', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.get('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('View issues on a project with one filter', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.get('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('View issues on a project with multiple filters', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.put('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Update one field on an issue', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.put('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Update multiple fields on an issue', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.put('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Update an issue with missing _id', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.put('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Update an issue with no fields to update', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.put('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Update an issue with an invalid _id', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.put('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Delete an issue', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.delete('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Delete an issue with an invalid _id', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.delete('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
	test('Delete an issue with missing _id', function (done) {
		assert.fail();

		// chai
		// 	.request(server)
		// 	.keepOpen()
		// 	.delete('/api/issues/:project')
		// 	.end(function (err, res) {
		// 		assert.fail();
		// 		done();
		// 	});
	});
});
