import express from 'express';
import { CreateMessage, GetAllMessagesByConversationnId } from '../controller/MessageController.js';


const router = express.Router();

router.post('/create', CreateMessage)
// all messages in conversation
router.get('/:id/allMessages', GetAllMessagesByConversationnId)

export default router