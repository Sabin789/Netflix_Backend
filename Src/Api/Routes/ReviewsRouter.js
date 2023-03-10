import Express from "express"
import uniqId from "uniqid"
import createHttpError from "http-errors"
import { getMovies, getReviews, writeMovie } from "../lib/fs-tools.js"
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

    }
   
})



export default ReviewsRouter