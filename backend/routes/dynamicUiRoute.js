import express from 'express'
import { getPartners, addPartner, deletePartner } from '../controllers/dynamicUiController.js';

const dynamicUiRouter = express.Router();

dynamicUiRouter.get('/', getPartners);
dynamicUiRouter.post('/', addPartner);
dynamicUiRouter.delete('/:id', deletePartner);

export default dynamicUiRouter
