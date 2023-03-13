import Express from "express"
import uniqId from "uniqid"
import createHttpError from "http-errors"
import { getMovies, getReviews, writeMovie,writeReview } from "../lib/fs-tools.js"
import { triggerBadRequest } from "../Validation/movieValidation.js"
import { checkReviewSchema } from "../Validation/reviewValidation.js"

const ReviewsRouter=Express.Router()


ReviewsRouter.post("/:movieId/reviews",checkReviewSchema,triggerBadRequest,async(req,res,next)=>{
    try{
        const reviews=await getReviews()
        const newReview={...req.body,movieId:req.params.movieId,_id:uniqId(),createdAt:new Date(),updatedAt:new Date()}
        if(newReview){
         reviews.push(newReview)

         await writeReview(reviews)

         res.status(201).send({_id:newReview._id})
  
        }
    }catch(err){
        next(err)
    }
})


ReviewsRouter.get("/:movieId/reviews",async (req,res,next)=>{
    try{
        const movies=await getMovies()
        const reviews= await getReviews()
        const singleMovie=movies.find(m=>m._id===req.params.movieId)
        const reviewsById=reviews.filter(r=>r.movieId===singleMovie._id)
  res.send(reviewsById)


    }catch(err){
    next(err)
    }
   
})


ReviewsRouter.get("/reviews/:reviewId",async (req,res,next)=>{
    try{
        const reviews= await getReviews()
        const sinlgeReview=reviews.find(r=>r._id===req.params.reviewId)

        if(sinlgeReview){
        res.send(sinlgeReview)
        }else{
            res.send((createHttpError(404, `Review with id ${req.params.productId} not found!`))) 
        }  

    }catch(err){
        next(err)
    }
})


ReviewsRouter.put("/reviews/:reviewId",async (req,res,next)=>{
    try{
        const reviews= await getReviews()
        // const sinlgeReview=reviews.find(r=>r._id===req.params.reviewId)
        const index=reviews.findIndex(i=>i._id===req.params.reviewId)
        const currentReview=reviews[index]
        const updated={...currentReview,...req.body,updatedAt:new Date()}
        if(updated){
        reviews[index]=updated
     
        await writeReview(reviews)
        res.send(updated)
        }
    }catch(err){
        next(err)
    }
})


ReviewsRouter.delete("/reviews/:reviewId",async (req,res,next)=>{
    try{
        const reviews=await getReviews()
        const remaining=reviews.filter(r=>r._id!==req.params.reviewId)
        if(remaining){
        await writeReview(remaining)
        res.status(204).send()
        }
    }catch(err){
        next(err)
    }
})



export default ReviewsRouter