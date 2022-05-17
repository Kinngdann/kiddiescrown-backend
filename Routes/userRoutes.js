const express = require('express');
const multer = require('multer');
const router = express.Router();
const PATH = './uploads';

const {
	newUser,
	preNew,
	getusers,
	getuser,
	updateVote,
	imageupdate,
	getTop5
	// transferVotes
	// disableUsers
	// addDisabledProps
} = require('../controllers/userController');

const fileType = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, PATH);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.split(' ').join('-');
		const fileExt = fileType[file.mimetype];
		cb(null, `${fileName}-${Date.now()}.${fileExt}`);
	},
});

const upload = multer({ storage: storage });

router.post('/new', upload.single('picture'), newUser);
router.post('/pre-register', preNew);
router.get('/getUsers', getusers);
router.get('/getUser/:id', getuser);
router.post('/updateVote/:id', updateVote);
router.post('/image-upload', upload.single('picture'), imageupdate);
router.get('/getTop5', getTop5);
// router.post('/transferVotes', transferVotes);
// router.post('/disableUsers', disableUsers);
// router.post('/addDisabledProps', addDisabledProps);

module.exports = router;
