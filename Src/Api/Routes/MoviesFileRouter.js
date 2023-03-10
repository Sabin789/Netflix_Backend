import Express from "express";
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { pipeline } from "stream";
import {createGzip} from "zlib"

import { promisify } from "util";
import { writeMovie } from "../lib/fs-tools.js";


const movieFilesRouter=Express.Router()

const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
      cloudinary, 
      params: {
        folder: "fs0522/movies",
      },
    }),
  }).single("poster")


movieFilesRouter.post("/:movieId/poster",cloudinaryUploader ,async(req,res,next)=>{
    try{
        const movies=await getMovies()
        const singleMovie=movies.find(m=>m._id===req.params.movieId)
      res.send("hi")
        if(singleMovie){
       
            singleMovie.poster=req.file.path
            await writeMovie(movies)
         res.send({message:"file Uploaded"})

      }else{

        res.status(400)
      }

        
    }catch(err){
        next(err)
    }
})



export default movieFilesRouter