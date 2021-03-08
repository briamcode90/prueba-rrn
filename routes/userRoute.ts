
import { Router } from 'express';
import { createdUser, deletedUser, getLtUsers, getUser, updatedUser } from '../controller/userController';


const router = Router();

router.get('/', getLtUsers);
router.get('/:id', getUser);
router.put('/', createdUser);
router.post('/:id', updatedUser);
router.delete('/:id', deletedUser);


export default router;