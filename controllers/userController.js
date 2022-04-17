const Contestant = require('../models/userSchema');
const PreContestant = require('../models/preUserSchema');

exports.newUser = async (req, res) => {
	// console.log(req.files)
	try {
		// const parsed = JSON.parse(req.body.user);
		const parsed = req.body;
		const user = await Contestant.create({
			id: '001',
			name: parsed.name,
			gender: parsed.gender,
			age: parsed.age,
			description: parsed.description,
			pictures: req.files[0].path,
			phone: {
				phone1: parsed.phone1,
				phone2: parsed.phone2
			},
			parentName: parsed.parentName,
			relationship: parsed.relationship,
		});

		res.send(user);
	} catch (error) {
		console.log('error', error);
		console.log('error message', error.message);
		res.status(500).json({
			success: false,
			reason: error.message,
		});
	}
};

exports.preNew = async (req, res) => {
	try {
		const user = await PreContestant.create({
			name: req.body.name,
			phone: {
				phone1: req.body.phone1,
				phone2: req.body.phone2
			}
		})

		res.send(user);
		
	} catch (error) {
		res.json({
			success: false,
			reason: error.message,
		});
	}
}


exports.getusers = async (req, res) => {
	const getUsers = await Contestant.find();
	res.status(200).json({
		success: true,
		data: getUsers,
	});
};

exports.getuser = async (req, res) => {
	try {
		const userData = await Contestant.findOne({ id: req.params.id });
		res.status(200).json({
			success: true,
			data: userData,
		});
	} catch (error) {
		console.log('error', error);
		console.log('error message', error.message);
		res.status(500).json({
			success: false,
			data: error.message,
			msg: 'some thing went wrong',
		});
	}
};

exports.updateUser = async (req, res) => {
	try {
		const updatedUser = await Contestant.findOneAndUpdate(
			{ id: req.params.id },
			req.body,
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: updatedUser,
		});
	} catch (error) {
		console.log('error', error);
		console.log('error message', error.message);
		res.status(500).json({
			success: false,
			data: error.message,
			msg: 'some thing went wrong',
		});
	}
};


exports.deleteUser = async (req, res) => {
	try {
		await Contestant.findOneAndRemove({ id: req.params.id });
		res.status(200).json({
			success: true,
			data: null,
		});
	} catch (error) {
		console.log('error', error);
		console.log('error message', error.message);
		res.status(500).json({
			success: false,
			data: error.message,
			msg: 'some thing went wrong',
		});
	}
};

exports.updateLog = async (req, res) => {
	try {
		const logObject = {
			time: Date.now(),
			voteCount: req.body.log,
		};

		const logData = await Contestant.findOneAndUpdate(
			{ id: req.params.id },
			{ $push: { log: logObject } },
			{ new: true }
		);

		res.status(200).json({
			success: true,
			data: logData,
		});
	} catch (error) {
		console.log('error', error);
		console.log('error message', error.message);
		res.status(500).json({
			success: false,
			data: error.message,
			msg: 'some thing went wrong',
		});
	}
};

/*
exports.uploadCampaignPic = async (req, res) => {


};
*/

exports.updatePicture = async (req, res) => {
	try {
		const user = await Contestant.findOneAndUpdate(
			{ id: req.params.id },
			{
				$set: { pictures: req.files.length > 0 ? req.files[0].path : null },
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			data: user,
		});
	} catch (error) {
		console.log('error', error);
		console.log('error message', error.message);
		res.status(500).json({
			success: false,
			data: error.message,
			msg: 'some thing went wrong',
		});
	}
};
