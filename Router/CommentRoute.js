import express from 'express';
import { delComment, getComment, likeCmt, newComment, unlikeCmt } from './../controller/CommentController.js';
const router = express.Router();

router.get('/:postid/:page', getComment)
router.post('/', newComment)
router.delete('/:cmtid', delComment)
// like
router.put('/like/:cmtid', likeCmt)
router.put('/unlike/:cmtid', unlikeCmt)


export default router