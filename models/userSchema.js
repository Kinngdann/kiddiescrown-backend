const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	gender: String,
	age: Number,
	description: String,
	picture: String,
	location: String,
	disabled: {
		type: Boolean,
		default: false
	},
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
		time: String,
		method: String
	}],
	poster: String,
});

module.exports = mongoose.model('contestants', userSchema);
