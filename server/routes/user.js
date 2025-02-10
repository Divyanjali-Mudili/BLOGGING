const express = require('express');
const { User, Blog,Comments} = require("../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router=express.Router();
router.post('/signup', async(req,res)=>{
   const {username,password,email} = req.body;
   const user=await User.findOne({username:username});
   if(user)
   {
      return res.status(403).json({message:'User already exist'});
   }
   const hashedPassword= await bcrypt.hash(password,10);
   const obj ={ username: username, password: hashedPassword,email};
   const newUser=new User(obj);
   await newUser.save();
   const token=jwt.sign({username,role:'user'},SECRET,{expiresIn:'1h'});
   return res.json({message:'User created successfully',token});
});
router.post('/login',async (req,res)=>{
 const {username,password,email}=req.body;
 const user=await User.findOne({username:username});
 if(user)
 {
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.status(404).json({message: 'Invalid password'});
    }
    const token = jwt.sign({username,role:'user'},SECRET,{ expiresIn: '1h'});
    return res.json({message:'Login successful',token});
 }
 return res.status(403).json({message: 'User not Found'});
});
router.post('/write',authenticateJwt,async (req,res)=>{
   const blog = new Blog(req.body);
   await blog.save();
   return res.json({message:'Blog added successfully', blogId: blog._id.toString()});
});
router.put('/edit/:blogId',authenticateJwt,async (req,res)=>{
   const blog= await Blog.findByIdAndUpdate(req.params.blogId,req.body,{new: true});
   if(blog) {
      return res.json({blog:'Blog updated successfully'});
   }
   else {
       return res.status(404).json({message:'Blog not found'});
   }

});
router.get('/view',authenticateJwt,async (req,res)=>{
   const blog = await Blog.find({});
    return res.json({ blog });
});

router.delete('/delete/:blogId',authenticateJwt,async(req,res)=>{
   const blog = await Blog.findByIdAndDelete(req.params.blogId);
   return res.json({blog:'Blog deleted successfully'});
})

router.post('/comment/:postId', authenticateJwt, async (req, res) => {
    try {
        const { text, user } = req.body;
        if (!text || !user) {
            return res.status(400).json({ error: "Text and user are required" });
        }
        const newComment = new Comments({
            postId: req.params.postId,//i have made a manual class because i need to store the postID ,which is sended
            //not by the client ,but in params ,so i need to retrive it from it ,than store it 
            user,
            text,
            createdAt: new Date(),
        });
        await newComment.save(); 
        return res.json({ message: "Comment added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});




module.exports=router;
