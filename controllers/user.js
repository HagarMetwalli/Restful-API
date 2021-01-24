const jwt = require('jsonwebtoken');

const { promisify } = require('util');

//convert token to promise "performance"
const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const {getAuthor} = require('../controllers/blog');

const create = (user) => User.create(user);

const getAll = () => User.find({}).exec();

const getUser =(id) => User.findById(id).exec();

const editUser = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();

const deleteone=(id) => User.remove({_id:id}).exec();

const pushfollowID = (id,fid)=> User.update(

  { "_id": id },
  {
      $push: {
        following: fid,
        followers:fid
      }
  }
);
const userUnfollowID=(id,fid)=> User.update(
  { "_id": id },
  {
      $pull: {
        following: fid,
        followers:fid
      }
  }
);
//get followers
const getFollowers = async (id) => {
  //debugger
  const _followers= await User.findById(id).populate("auther","auther")
  .select ('followers')
  .exec();

return _followers._doc.followers ;
  //debugger
};

//get following
const getFollowing = async (id) => {
  //debugger
  const _following= await User.findById(id).populate("auther","auther")
  .select ('following')
  .exec();

return _following._doc.following;
  //debugger
};

const getFollowingBlogs = async (id) => {
  //debugger
  const getFollowingArr= await User.findById(id)
  .populate("auther","auther")
  .select ('following')
  .exec();
  var followingBlogs =[]
  for ( let i = 0; i < getFollowingArr._doc.following.length; i++) {
    followingBlogs.push(await getAuthor(getFollowingArr._doc.following[i])) ;
  }
return followingBlogs;
  //debugger
};
   
const login = async ({ username, password }) => {
  // get user from DB
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }
  //match input password with user data using bcrypt
  const isVaildPass = user.validatePassword(password);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }
  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
};


module.exports = {
  create,
  login,
  getAll,
  getUser,
  editUser,
  deleteone,
  pushfollowID,
  userUnfollowID,
  getFollowers,
  getFollowing,
  getFollowingBlogs
};
