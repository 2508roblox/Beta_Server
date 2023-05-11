import express from 'express';
import { Register, Login } from './../controller/AuthController.js';
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.json('hello')
})
router.post('/register', Register)
router.post('/login', Login)
export default router