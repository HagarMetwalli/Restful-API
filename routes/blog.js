const express = require('express');
const router = express.Router();
const multer = require("multer");
const path =require("path");
const authMiddleware = require('../middlewares/auth');
const {
  create, 
  getAll, 
  getById,
  editOne,
  deleteone,
  getuserBlogs,
  getblog,
  getAuthor,
  getTitle
} = require('../controllers/blog');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

//get All Blogs
router.get('/', async (req, res, next) => {
  try {
    //debugger;
    const blog = await getAll();
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//Use Middeleware
router.use(authMiddleware);

//create Blog
router.post('/add',upload.single("photo"), async (req, res, next) => {
  const { body, user: { id } } = req;
  const _file =req.file.filename;
  try {
    const blog = await create({ ...body,photo:_file, auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

//get All User Blogs
router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
  try {
    const blog = await getuserBlogs({ auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

//Search By Tag
router.get('/tags/:tag', async (req, res, next) => {
  const { params: {tag} } = req;
  try {
   // debugger
    console.log(tag);
    const blogs = await getblog(tag);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

//Search Blog By ID
router.get('/:id', async (req, res, next) => {
  //debugger;
  const { params: { id } } = req;
  try {
    const blog = await getById(id);
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

//Search Blog By auther
router.get('/author/:_author', async (req, res, next) => {
  const { params: {_author} } = req;
  try {
    const blogs = await getAuthor(_author);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

//Search Blog By title
router.get('/title/:_title', async (req, res, next) => {
  const { params: {_title} } = req;
  try {
    const blogs = await getTitle(_title);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});


//Update Blog
router.patch('/edit/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  //debugger;
  try {
    const blogs = await editOne(id, body);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//Delete Blog By ID
router.delete('/:id',async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const blogs = await deleteone(id);
      //res.send("The User is deleted");
      res.json(blogs);
    } catch (e) {
      next(e);
    }
});

module.exports = router;
