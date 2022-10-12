const db = require('../models/index');
const Post = db.post;
const User = db.user 
const { Op } = require('sequelize');
const  cloudinary  = require('../utils/cloudinary');





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
        //  const id = req.params.id;
        //  const user = await User.findOne({ where: { id: id } });
        //  if (!user) {
        //    return res.status(404).json({ message: 'User not found' });
        //  }
 const images = [];
    for (let i = 0; i < req.files?.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path);
      images.push(result.secure_url);
      console.log('=============== uploading image ========================');
    }
    const createPosts = await Post.create({
        title,
        body,
        attachment: images,
      });
      res.send({message: "Post Created Successfully", createPosts })
    } catch (error) {
      return res.status(500).send({ message: error.message});
    }
  };

// To get all pOSTS
exports.findAllPosts = (req, res) => {
    const post = Post.findAll({ limit: 10 })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };
  
  // To get a post
  exports.getPost = async (req, res) => {
    try {
      const id = req.params.id;
      const checkStatus = await Post.findOne({
        where: {
          id: id,
        },
      });
      if (checkStatus) {
        return res.send({message:"Post Availabe" ,checkStatus});
      } else {
        res.send("Post Not Available");
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

  // switch user to admin
exports.switchToAdmin = async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({ where: { username} });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'User is already an admin' });
      }
      user.role = 'admin';
      await user.save();
      res.status(200).json({ message: 'User role changed to admin' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  // Delete a post with the specified id in the request by admin
exports.deletePost = async (req, res) => {
    try {
      
    const id = req.params.id;
      const user = await User.findOne({ where: {  id:id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.role !== 'admin') {
        return res
          .status(403)
          .json({ message: 'Not authorized to perform this role' });
      }
      const posts = await Post.findOne({
        where: { id: req.params.id },
      });
      if (!posts) {
        return res.status(404).json({ message: 'Post not found' });
      }
      await posts.destroy();
      return res.status(200).json({ message: 'Post Successfully deleted' });
    } catch (error) {
      return res.status(500).send({ message: error.message});
    }
  };