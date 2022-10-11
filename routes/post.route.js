const express = require('express');
const  upload  = require('../utils/multer');
const router = express.Router();


const {
    createPost
} = require('../controllers/post.controller');


router.post('/post', upload.array ('attachment', 12), createPost);

module.exports = router;