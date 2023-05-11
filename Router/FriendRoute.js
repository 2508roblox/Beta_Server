import express from 'express';
import { confirmRequest, getAllConfirmedFriends, getAllRequestFriend, requestFriend, removeFriend, getAllUserFriends, getAllRequestFriendByUser, getAllUserNotInFriends } from './../controller/FriendController.js';
const app = express();
const router = express.Router();

router.post('/:id/request', requestFriend)
//by others people
router.get('/:id/allrequestbyotherpeople', getAllRequestFriend)
//by user
router.get('/:id/allrequestbyuser', getAllRequestFriendByUser)
router.post('/:id/confirm', confirmRequest)
router.get('/:id/allconfirm', getAllConfirmedFriends)
// delete by friend id
router.delete('/:id/remove', removeFriend)
// all user not in the list of friends
router.get('/:id/allfriends', getAllUserFriends)
//by user id
router.get('/:id/allnonfriends/:page', getAllUserNotInFriends)
export default router