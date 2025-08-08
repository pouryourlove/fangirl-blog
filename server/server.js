import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB()

// Middlewares

// Enable Cross-Origin requests 
// (required when frontend & backend are on different domains)
app.use(cors())
// Parse incoming JSON requests and make the data available in req.body
app.use(express.json())

//Routes
app.get('/', (req, res)=> res.send("API is working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('server is running on port' + PORT)
})

export default app;
