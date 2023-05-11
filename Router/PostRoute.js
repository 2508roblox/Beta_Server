import express from 'express';
import { CreatePost, GetAllUserPost, LikePost, Unlike, GetTimeline } from './../controller/PostController.js';
const app = express();
const router = express.Router();

router.post('/', CreatePost)
router.get('/:id/:page', GetAllUserPost)
// router.get('/:id/timeline/', GetTimeline)
router.get('/:id/timeline/:page', GetTimeline)
//like
router.put('/:id/like', LikePost)
router.put('/:id/unlike', Unlike)
export default router