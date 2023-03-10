import Express from "express"
import uniqId from "uniqid"
import createHttpError from "http-errors"
import { getMovies, writeMovie } from "../lib/fs-tools.js"
import { checkMovieSchema, triggerBadRequest } from "../Validation/movieValidation.js"


const MoviesRouter=Express.Router()


MoviesRouter.post("/",checkMovieSchema,triggerBadRequest,async(req,res,next)=>{
    try{
        const movies= await getMovies()
     const newMovie={...req.body,createdAt:new Date(),updatedAt:new Date(),_id:uniqId(),poster:""}
     if(newMovie){
        movies.push(newMovie)
        await writeMovie(movies)
        res.send({id:newMovie._id})
       
     }
    }catch(err){
        next(err)
    }
})

MoviesRouter.get("/",async(req,res,next)=>{
    try{
        const movies= await getMovies()
        if(req.query && req.query.title){
            const filteredMovies=movies.filter(p=>p.title===req.query.title)
            res.send(filteredMovies)
        }else{res.send(movies)}
    }catch(err){
       next(err)
    }
})


MoviesRouter.get("/:movieId",async(req,res,next)=>{
    try{
        const movies= await getMovies()
        const singleMovie=movies.find(m=>m._id===req.params.movieId)
        if(singleMovie){
        res.send(singleMovie)
        }else{
            res.send((createHttpError(404, `Movie with id ${req.params.movieId} not found!`))) 

        }
   
    }catch(err){
        next(err)
    }
})


MoviesRouter.put("/:movieId",async(req,res,next)=>{
    try{
       const movies= await getMovies()
       const index=movies.findIndex(m=>m._id===req.params.movieId)
       const currentMovie=movies[index]
       const updated={...currentMovie,...req.body,createdAt:new Date()}
       movies[index]=updated
       await writeMovie(movies)
       res.send(updated)
    }catch(err){
        next(err)
    }
})


MoviesRouter.delete("/:movieId",async(req,res,next)=>{
    try{
      const movies=await getMovies()
      const remaining=movies.filter(m=>m._id!==req.params.movieId)
      writeMovie(remaining)
      res.send()
    }catch(err){
        next(err)
    }
})


export default MoviesRouter