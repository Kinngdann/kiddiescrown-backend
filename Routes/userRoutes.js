const express = require('express');
const multer = require('multer');
const router = express.Router();
const PATH = './uploads';

const {
	newUser,
	preNew,
	getusers,
	getuser,
	updateUser,
	deleteUser,
	updateLog,
	updatePicture
} = require('../controllers/userController');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, PATH);
	},
	filename: (req, file, cb) => {
		cb(
			null,
			new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
		);
	},
});

const upload = multer({ storage: storage });

router.post('/new', upload.single('picture'), newUser);
router.post('/pre-register', preNew);
router.get('/getUsers', getusers);
router.get('/getUser/:id', getuser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.put('/updateLog/:id', updateLog);
router.put('/updatePicture/:id', upload.any(), updatePicture);
module.exports = router;