const Blog = require('../models/Blog');

const create = (blog) => Blog.create(blog);

const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();

const getAll = () => Blog.find({}).exec();

const getuserBlogs = (query) => Blog.find(query).exec();

const getById = (id) => Blog.findById(id).exec();

const getblog=(_tag) =>Blog.find({tags:{$elemMatch:{tag:_tag}}}).exec();

const getAuthor=(_auther)=>Blog.find({auther:_auther}).exec();

const getTitle=(_title)=>Blog.find({title:_title}).exec();

const deleteone=(id) => Blog.User.remove({_id:id}).exec();

module.exports = {
  create,
  editOne,
   getAll,
   getById,
   getuserBlogs,
  deleteone,
  getblog,
  getAuthor,
  getTitle,
};
