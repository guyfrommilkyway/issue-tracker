const mongoose = require('mongoose');

const connectDatabase = () => {
	try {
		mongoose.connect(process.env.DB_URL);

		mongoose.connection.once('open', () => {
			console.log('Connected to MongoDB database');
		});
	} catch (error) {
		console.log('Unable to connect to database');
	}
};

module.exports = connectDatabase;
