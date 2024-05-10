import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import 'dotenv/config';
import { handleError } from './middleware/error.js';
import { connectDB } from './config/db.js';
import taskRouter from './routes/task-route.js';
import ApiResponse from './response/response.js';

const app = express();
const PORT = process.env.PORT || 4000;
if(process.env.NODE_ENV==='development'){
    app.use(morgan("dev"));
}
connectDB();
app.use(bodyParser.json());

app.use('/tasks', taskRouter);

app.use(handleError);

app.use((req, res, next) => {
    res.status(404).json(ApiResponse.error('Not Found',null,404));
});
const server = app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT} `))

// Global uncaught exception handler
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1); 
});

// handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
   console.log(`Error: ${err.message}`);
   server.close(()=>process.exit(1));
});