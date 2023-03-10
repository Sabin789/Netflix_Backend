import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"


const movieSchema={
    title:{
        in:["body"],
        isString:{
            errorMessage: "Title is a mandatory field and needs to be a string!",

        }
    },

    year:{
        in:["body"],
        isString:{
            errorMessage: "Year is a mandatory field and needs to be a string!",

        }
    },

    type:{
        in:["body"],
        isString:{
            errorMessage: "type is a mandatory field and needs to be a string!",

        }
    }
}


export const checkMovieSchema=checkSchema(movieSchema)

export const triggerBadRequest=(req,res,next)=>{
    const errors=validationResult(req)
    console.log(errors.array())
    if (errors.isEmpty()) {
        
        next()
      } else {
   
        next(createHttpError(400, "Errors during product validation", { errorsList: errors.array() }))
      }
}