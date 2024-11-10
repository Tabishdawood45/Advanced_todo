import { pool } from '../helper/db.js';
import { Router } from  "express";
import { emptyOrRows } from "../helper/utils.js";
import { compare } from 'bcrypt';
import { auth } from '../helper/auth.js'
// import { sign } from 'jsonwebtoken';

const router = Router();

router.get('/',(req,res,next) => {
    pool.query('select * from task', (error, result) => {
        if  (error) {
            // return res.status(500).json({error: error.message})
            return next (error)
        }
        return res.status(200).json(emptyOrRows(result))
    })
})

router.post('/create',auth, (req, res, next) => {
    pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *',
        [req.body.description],
        (error, result) => {
            if (error) {
                // return res.status(500).json({ error: error.message });
                return next (error)
            }
            return res.status(200).json({ id: result.rows[0].id});
});
});

router.delete('/delete/:id',auth, (req, res,next) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM task WHERE id = $1', 
        [id], 
        (error, result) => {
        if (error) {
            // return res.status(500).json({ error: error.message });
            return next (error)
        }

    
            return res.status(200).json({ id: id });
        });
    });


export default router;











// router.delete('/delete/:id', (req, res, next) => {
//     const id = req.params.id;
    
//     // Validate that 'id' is numeric to avoid SQL injection
//     if (isNaN(id)) {
//         return res.status(400).json({ error: 'Invalid ID format' });
//     }

//     const parsedId = parseInt(id);

//     // First, check if the task exists before attempting to delete it
//     pool.query('SELECT * FROM task WHERE id = $1', [parsedId], (error, result) => {
//         if (error) {
//             return next(error);  // Pass the error to the error handler
//         }

//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: 'Task not found' });
//         }

//         // If the task exists, proceed with deletion
//         pool.query('DELETE FROM task WHERE id = $1', [parsedId], (error, result) => {
//             if (error) {
//                 return next(error);
//             }
//             return res.status(200).json({ id: parsedId });
//         });
//     });