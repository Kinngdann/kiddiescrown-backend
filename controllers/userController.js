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
};

exports.getusers = async (req, res) => {
	try {
		const users = await Contestant.find(
			{disabled: false}
		);
		res.send(users)
	} catch (error) {
		console.log(error)
	}
};

exports.getuser = async (req, res) => {
	try {
        const user = await Contestant.findOne({
            id: req.params.id,
            disabled: false
        });

        const votes = await Contestant.find({disabled: false}).select('votes.stage3');
        const scores = votes.map(
            vote => vote.votes.stage3
        ).sort((a, b) => b-a);

        let position = {};

		scores.forEach((score, index) => {
			if (score === user.votes.stage3){
				position.index = index+1;
                position.nextScore = (scores[index-1] - user.votes.stage3) + 20;
			}
		});

		res.json({
			user,
			position
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

exports.updateVote = async (req, res) => {
    const {voteCount, method } = req.body;
    const log = {
		time: new Date()+'',
        voteCount,
        method,
    }

    try {
        const user = await Contestant.findOneAndUpdate(
			{
				id: req.params.id,
				disabled: false
			},
            {
                $inc: {'votes.stage3': voteCount},
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
	// console.log(req.file);
    try {
		if (req.file){
			// const picture = req.file.path;
			// const parsed = req.body;
			const parsed = JSON.parse(req.body.user);
			const user = await Contestant.findOneAndUpdate(
				{id: parsed.id},
				{'picture': req.file.path},
				{new: true}
			);
			res.send(user);
		}
        
    } catch (error) {
        console.log(error);
    }
};

exports.getTop5 = async (req, res) => {
	try {
		const users = await Contestant.find(
			{disabled: false}
		);
		
		users.sort((a, b) => {
			return a.votes.stage3 > b.votes.stage3 ? -1 : 1;
		});
		res.send(users.slice(0, 5));
	} catch (error) {
		console.log(error)
	}
}

/*
exports.disableUsers = async (req, res) => {
	try {
		const users = await Contestant.find({disabled: false});
		let count = 0
		for(let i = 0; i < users.length; i++){
			if (users[i].votes.stage2 < 300 ){
				const user = await Contestant.findOneAndUpdate(
					{id: users[i].id},
					{disabled: true}
				);
				count++;
				console.log(count);
			}
		}
		res.json({
			success: true,
			disabledAccounts: count
		});

	} catch (error) {
		console.log(error)
	}
};

exports.transferVotes = async (req, res) => {
	try {
		const users = await Contestant.find({disabled: false});
		let count = 0
		for (let i = 0; i < users.length; i++){
			if(users[i].votes.stage2 > 300){
				const remainder = users[i].votes.stage2 - 300;
				const votes = {
					stage1: 200,
					stage2: 300,
					stage3: remainder
				}
				const user = await Contestant.findOneAndUpdate(
					{id: users[i].id},
					{votes}
				)
				count++
				console.log(count);
			}
		}
		res.json({
			success: true,
			body: count
		})
	} catch (error) {
		console.log(error);
	}
};


/*
exports.addDisabledProps = async (req, res) => {
	try {
		let count = 0;
		const users = await Contestant.find();
		for(let i = 0; i < users.length; i++){
			const user = await Contestant.findOneAndUpdate(
				{id: users[i].id},
				{
					disabled: false
				}
			)
			if (user) count++;
			console.log(count)
		}
		res.send(count);
	} catch (error) {
		console.log(error)
	}
}
*/