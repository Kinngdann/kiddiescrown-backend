const Contestant = require('../models/userSchema');
const PreContestant = require('../models/preUserSchema');

function stringify(n){
	n = '00' + n.toString();
	return `${n.slice(-3)}`;
};

exports.newUser = async (req, res) => {
	try {
		// const parsed = req.body;
		const parsed = JSON.parse(req.body.user);
		const user = await Contestant.create({
			id: stringify(await Contestant.countDocuments()+1),
			name: parsed.name,
			gender: parsed.gender,
			age: parsed.age,
			description: parsed.description,
			picture: req.file.path,
			location: parsed.location,
			phone: {
				phone1: parsed.phone1,
				phone2: parsed.phone2
			},
			parentName: parsed.parentName,
			relationship: parsed.relationship,
		})
		res.json({id: user.id, name: user.name});
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
		const parsed = req.body;
		const user = await PreContestant.create({
			name: parsed.name,
			phone: {
				phone1: parsed.phone1,
				phone2: parsed.phone2
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
        const user = await Contestant.findOne({
            id: req.params.id,
            // disabled: false
        });

        const votes = await Contestant.find({}).select('votes.stage1');
        const scores = votes.map(
            vote => vote.votes.stage1
        ).sort((a, b) => b-a);

        let position = {};
        for (let i = 0; i < scores.length; i++){
            if (user.votes.stage1 === scores[i]){
                position.index = i + 1;
                position.nextScore = scores[i-1];
            }
        };
		// res.send({...user, ...position});
		res.json({
			user,
			position
		})

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

exports.updateVote = async (req, res) => {
    const {voteCount, method } = req.body;
    const log = {
		// time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
		time: new Date()+'',
        voteCount,
        method,
    }

    try {
        const user = await Contestant.findOneAndUpdate(
            {id: req.params.id},
            {
                $inc: {'votes.stage1': voteCount},
                $push: {log}
            },
            {new: true}
        ).select('votes log');
    
        res.send(user);
    } catch (error) {
        console.log(error);
    }
}

exports.imageupdate = async (req, res) => {
	// console.log(req);

    try {
		if (req.file){
			const picture = req.file.path;
			const parsed = req.body;
			// const parsed = JSON.parse(req.body.user);
			const user = await Contestant.findOneAndUpdate(
				{id: parsed.id},
				{'picture': picture},
				{new: true}
			);
			res.send(user);
		}
        
    } catch (error) {
        console.log(error);
    }
};
