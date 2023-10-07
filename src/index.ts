import express from 'express';
import http from 'http';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
import cors from 'cors';
import { connectDB } from './utils/connectDB';
import * as env from "dotenv"
env.config();
const PORT = 8080;


const app = express();
app.use(express.json());
app.use(cors());
// app.use(compression());
// app.use(cookieParser());
// app.use(bodyParser.json());


const server = http.createServer(app);                  

app.use('/',(req,res)=>{
    res.send("elo")
})





server.listen(PORT,()=>{
    connectDB()
    console.log("Server is listning on PORT "+ PORT)
});
