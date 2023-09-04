import express from 'express'
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from 'cookie-parser'
import cors from 'cors';
import multer from 'multer'
const app=express()

// ifwe dont use below code, we wont be able to send data to db
app.use(express.json())
app.use(cors()) 

app.use(cookieParser())
// app.get("/",(req,res)=>{
//     console.log("baclend /")
//     res.json("msg from backend ")
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        // to give uploaded file a unique name thats why date is added to filename
      cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({storage})

app.post('/api/upload',upload.single('file'), function( req, res){
    const file=req.file
    console.log("not here",file)
    return res.status(200).json(file.filename)
})
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)


app.listen(8800, ()=>{
    console.log("Connectedbnv")
})