import express from 'express'
import { getPartners, addPartner, deletePartner,getFeedbacks,addFeedbacks,deleteFeedbacks } from '../controllers/dynamicUiController.js';
import upload from '../middleware/multer.js';

const dynamicUiRouter = express.Router();

dynamicUiRouter.get('/', getPartners);
dynamicUiRouter.post('/', addPartner);
dynamicUiRouter.delete('/:id', deletePartner);

dynamicUiRouter.get('/feedback', getFeedbacks);
dynamicUiRouter.post('/feedback',upload.single("image"), addFeedbacks);
dynamicUiRouter.delete('/feedback/:id', deleteFeedbacks);

export default dynamicUiRouter
