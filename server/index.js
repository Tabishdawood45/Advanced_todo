import express from 'express';
import cors from 'cors'
import todoRouter from './routers/todoRouter.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv';

dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', todoRouter)
app.use('/user', userRouter)


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

// app.get('/',(req,res) => {
//     pool.query('select * from task', (error, result) => {
//         if  (error) {
//             return res.status(500).json({error: error.message})
//         }
//         return res.status(200).json(result.rows)
//     })
// })

// app.post('/create', (req, res) => {
//         pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *',
//             [req.body.description],
//             (error, result) => {
//                 if (error) {
//                     return res.status(500).json({ error: error.message });
//                 }
//                 return res.status(200).json({ id: result.rows[0]});
//     });
// });

// app.delete('/delete/:id', (req, res) => {
//         const id = parseInt(req.params.id);
//         pool.query('DELETE FROM task WHERE id = $1', 
//             [id], 
//             (error, result) => {
//             if (error) {
//                 return res.status(500).json({ error: error.message });
//             }
//             return res.status(200).json({ id: id });
//         });
//     });



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;