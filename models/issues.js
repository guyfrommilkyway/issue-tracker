const { Schema, model } = require('mongoose');

const IssueSchema = new Schema({
	issue_title: {
		type: String,
		required: true,
	},
	issue_text: {
		type: String,
		required: true,
	},
	created_by: {
		type: String,
		required: true,
	},
	assigned_to: String,
	status_text: String,
	created_on: {
		type: Date,
		required: true,
	},
	updated_on: {
		type: Date,
		required: true,
	},
	open: {
		type: Boolean,
		required: true,
	},
});

const Issue = model('Issue', IssueSchema);

module.exports = Issue;
