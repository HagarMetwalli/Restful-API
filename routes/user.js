const authMiddleware = require('../middlewares/auth');
const express = require('express');

const {
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
} = require('../controllers/user');
const router = express.Router();


//create new user
router.post('/register', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    //debugger
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//get user
router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//delete User
router.delete('/delete/:id',async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const users = await deleteone(id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
  

router.post('/login', async (req, res, next) => {

  const { body } = req;
  try {
    
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//Use Middeleware
router.use(authMiddleware);

//get User By ID
router.get('/profile/:id', async (req, res, next) => {
  //debugger;
  const { params: { id } } = req;
  try {
    const user = await getUser(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//Update User
router.patch('/edit/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  //debugger;
  try {
    const user = await editUser(id, body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//Follow User
router.post('/follow/:fid',async(req,res,next)=>{
  const { params: { fid },user: { id } } = req;
 // debugger
  try {
    const userfollowID = await pushfollowID(id,fid);
    res.json(userfollowID);
  } catch (e) {
    next(e);
  }
})

//UnFollow User
router.post('/unfollow/:fid',async(req,res,next)=>{
  const { params: { fid },user: { id } } = req;
 // debugger
  try {
    const UnfollowID = await userUnfollowID(id,fid);
    res.json(UnfollowID);
  } catch (e) {
    next(e);
  }
})

//get Followers
router.get('/followers',async(req,res,next)=>{
  const { user: { id } } = req;
 // debugger
  try {
    const _followers= await getFollowers(id);
    res.json(_followers);
  } catch (e) {
    next(e);
  }
})

//get Following
router.get('/following',async(req,res,next)=>{
  const { user: { id } } = req;
 // debugger
  try {
    const _following= await getFollowing(id);
    res.json(_following);
  } catch (e) {
    next(e);
  }
})

//get All Followers
router.post('/Homepage',async (req, res, next)=>{
  const { user: { id } } = req;
  try {
    const blogs = await getFollowingBlogs(id);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
})


module.exports = router;
