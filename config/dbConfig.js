// mongoose to connect to our databse and perform operations on it
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const DBconnection = 'mongodb+srv://dann:dann123@cluster0.4o78m.mongodb.net/kiddiescrown?retryWrites=true&w=majority';

// db connection function
const dbConn = () => {
	mongoose
		.connect(
			DBconnection,

			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then(() => console.log('Database is connected successfully'))
		.catch(err => console.log(err));
};

module.exports = dbConn;
