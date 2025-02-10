const mongoose=require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    role: {
      type: String,
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true, 
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
},
{
  timestamps: true,
  versionKey: false,
}
    
)
CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  });
  

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Comments = mongoose.model('Comments',CommentSchema)
  
  module.exports = {
    User,
    Admin,
    Blog,
    Comments,
  }