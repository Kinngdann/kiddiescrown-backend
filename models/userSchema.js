const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	gender: String,
	age: Number,
	description: String,
	pictures: String,
	phone: {
		phone1: String,
		phone2: String
	},
	parentName: String,
	relationship: String,
	votes: {
		stage1: { 
			type: Number,
			default: 0
		},
		stage2: { 
			type: Number,
			default: 0
		},
		stage3: { 
			type: Number,
			default: 0
		},
	},
	log: [{ 
		voteCount: Number,
		time: Date,
		voter: String,
		method: String
	}],
	poster: String,
});

module.exports = mongoose.model('contestants', userSchema);
