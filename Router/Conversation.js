import express from 'express';
import { CreateConversation, CreateGroupConversation, GetConversations, GetGroupsConversations } from '../controller/ConversationController.js';


const router = express.Router();

router.post('/create', CreateConversation)
router.post('/create/group', CreateGroupConversation)
router.get('/:id', GetConversations)
//id bỊ trùng với route dưới vd group sẽ vào route :id
router.get('/', GetGroupsConversations)

export default router