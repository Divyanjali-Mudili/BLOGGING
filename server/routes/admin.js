const express = require('express');
const { User, Blog, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.post('/signup', async (req, res) => {
   const { username, password,email } = req.body;
   const admin = await Admin.findOne({ username: username });
   if (admin) 
    {
      return res.status(403).json({ message: 'Admin already exists' });
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const obj = { username: username, password: hashedPassword ,email};
   const newAdmin = new Admin(obj);
   await newAdmin.save();
   const token = jwt.sign({ username}, SECRET, { expiresIn: '1h' });
   res.json({ message: 'Admin created successfully', token });
});

router.post('/login', async (req, res) => {
   const { username, password,email } = req.body;
   const admin = await Admin.findOne({ username: username });
   if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
   }
   const isMatch = await bcrypt.compare(password, admin.password);
   if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
   }
   const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
   return res.json({ message: 'Login successful', token });
});
router.delete('/delete/:blogId',authenticateJwt,async(res,req)=>{
   const blog = await Blog.findByIdAndDelete(req.params.blogId);
    return res.json({blog:'Blog deleted successfully'});
});
router.get('/show',authenticateJwt,async(res,req)=>{
    const blog= await Blog.find({});
    return res.json({ blog })
});
module.exports = router;
