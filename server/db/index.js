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
const CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    text: {
      type:String,
      required:true
    },
    parentComment:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comments",
      default:null
    },
  },{
    timestamps:true
  });
  

  const notificationSchema = new mongoose.Schema(
    {
      recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      },
      message:{
        type: String,
        required:true
      },
      isRead:{
        type:Boolean,
        default:false
      }
    },
  
    {
      timestamps: true,
    }
  );
  

  

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Comments = mongoose.model('Comments',CommentSchema)
const Notifications=mongoose.model("Notifications", notificationSchema);
  
  module.exports = {
    User,
    Admin,
    Blog,
    Comments,
    Notifications
  }