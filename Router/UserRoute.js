import express from 'express';
import { GetAllUser, GetUser, UpdateUser } from './../controller/UserController.js';
const app = express();
const router = express.Router();

router.get('/:id', GetUser)
router.put('/:id', UpdateUser)
router.get('/', GetAllUser)
export default router