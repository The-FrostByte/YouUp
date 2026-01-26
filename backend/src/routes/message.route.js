import express from 'express';
import { getAllcontacts, getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();


router.use(arcjetProtection, protectedRoute); // req.user will be supplied protectedRoute to the controllers


// order of the routes are important.
router.get('/contacts', getAllcontacts);
router.get('/chats', getChatPartners);
router.get('/:id', getMessagesByUserId); 
router.post('/send/:id',sendMessage)

export default router;