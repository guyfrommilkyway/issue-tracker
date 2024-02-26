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
	assigned_to: { type: String, default: '' },
	status_text: { type: String, default: '' },
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
		default: true,
	},
});

const Issue = model('Issue', IssueSchema);

module.exports = Issue;
