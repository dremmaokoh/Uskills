const express = require('express');
const  upload  = require('../utils/multer');
const router = express.Router();


const {
    createPost, findAllPosts , getPost, switchToAdmin, deletePost
} = require('../controllers/post.controller');


router.post('/post', upload.array ('attachment', 12), createPost);
router.get('/find',findAllPosts);
router.get('/:id', getPost);
router.post('/switch-to-admin', switchToAdmin);
router.delete('/delete/:id', deletePost);




module.exports = router;