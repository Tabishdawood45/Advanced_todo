
import { Router } from 'express';

import {getTasks, postTask, deleteTask} from '../controllers/TaskController.js';

const router = Router();


router.get('/', getTasks);


   router.post('/create', postTask);
  
        router.delete('/delete/:id', deleteTask);

        
export default router;