const express = require("express");
const { getBlogs, getBlog, addBlog, editBlog, deleteBlog, } = require("../controllers/blog");
const router = express.Router();

router.get("/", getBlogs)
router.get("/:id", getBlog);
router.post("/", addBlog);
router.put("/:_id", editBlog);
router.delete("/:blogId", deleteBlog);


module.exports = router;