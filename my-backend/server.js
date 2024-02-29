const express = require('express');
const cookieparser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userroutes.js')
const adminRoutes = require('./routes/adminroutes.js')
const tutorRoutes = require('./routes/Tutorroutes.js')
const app = express();
const port = 7000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods:'GET',
  optionsSuccessStatus: 200,
  credentials: true 
};
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(cookieparser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/admin',adminRoutes)
app.use('/user',userRoutes)
app.use('/tutor',tutorRoutes)


mongoose.connect('mongodb+srv://vishnub4231:Vishnu1234@cluster3.7kv5aim.mongodb.net/EdTech').then(()=>{console.log('mongodb connected successfully')})

app.get('/api',(req,res)=>{res.json({name:"vishnu"})})
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
