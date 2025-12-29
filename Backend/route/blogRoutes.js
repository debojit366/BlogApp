import express from 'express'
import {getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller} from '../controller/blogController.js'

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get("/all-blog", getAllBlogsController); // to get something from server

//POST || create blog
router.post("/create-blog", createBlogController); // to create something on server

//PUT || update blog
router.put("/update-blog/:id", updateBlogController); //to update on server

//GET || SIngle Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", userBlogControlller);

export default router;