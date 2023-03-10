import Express from "express";
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { pipeline } from "stream";
import {createGzip} from "zlib"

import { promisify } from "util";
import { getMovies, writeMovie } from "../lib/fs-tools.js";
import { getPDFReadableStream } from "../lib/pdf-tools.js";


const movieFilesRouter=Express.Router()

const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
      cloudinary, 
      params: {
        folder: "fs0522/movies",
      },
    }),
  }).single("poster")


  movieFilesRouter.post("/:moviedId/poster", cloudinaryUploader,async(req,res,next)=>{

    try{
      const movies= await getMovies()
      const singleMovie= movies.find(p=>p._id===req.params.moviedId)


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

movieFilesRouter.get("/:movieId/pdf",async(req,res,next)=>{
    try{
        const movies= await getMovies()
        const singleMovie= movies.find(p=>p._id===req.params.movieId)

        if(singleMovie){
            res.setHeader("Content-Disposition",`attachment; filename=${singleMovie}.pdf`)
      const  source=getPDFReadableStream(singleMovie)
       const destination=res
       pipeline(source,destination,err =>{
        if(err){console.log(err)}else{
            console.log("PDF")
        }
    })
        }
    }catch(err){

    }
})

export default movieFilesRouter