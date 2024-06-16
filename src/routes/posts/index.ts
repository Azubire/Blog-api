import router from "restify-router";
import { authenticate } from "../../middleware/authenticate";
import {
  commentPost,
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  postComments,
  sharePost,
  updatePost,
} from "../../controllers/postController";

const posts = new router.Router();

posts.get("/", getPosts);
posts.get("/:id", getPost);
posts.get("/:id/comments", postComments);
posts.post("/", authenticate, createPost);
posts.post("/:id/like", authenticate, likePost);
posts.post("/:id/share", authenticate, sharePost);
posts.post("/:id/comment", authenticate, commentPost);
posts.patch("/:id", authenticate, updatePost);
posts.del("/:id", authenticate, deletePost);

export default posts;
