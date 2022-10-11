const db = require('../models/index');
const Post = db.post;
const User = db.user 
const { Op } = require('sequelize');
const { cloudinary } = require('../utils/multer');





// To create a post
exports.createPost = async(req,res)=>{
    try {
        const {title,body, attachment} = req.body;
        if(!title || !body){
            res.status(400).send({message:"Content can not be empty"});
            return;
        };
        // const user = await User.findOne({ where: { id: req.user.id } });
        // // if (!user) {
        // //   return res.status(404).json({ message: 'User not found' });
        // }

         // upload array of images to cloudinary and get the urls

    // const images = [];
    // for (let i = 0; i < req.files.length; i++) {
    //   const result = await cloudinary.uploader.upload(req.files[i].path);
    //   images.push(result.secure_url);
    //   console.log('=============== uploading image ========================');
    // }
    const createPosts = await Post.create({
        title,
        body,
        attachment,
     //  user_id: req.user.id,
      });
      return res.status(201).json({ message:'Post successfully created', createPosts });
    } catch (error) {
      return res.status(500).send({ message: error.message});
    }
  };