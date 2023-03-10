export const badRequestHandler=(err,req,res,next)=>{
    if(err.status==400){
    res.status(400).send({succes:false,message:err.message,errorsList: err.errorsList? err.errorsList.map(e => e.msg):"" })
    }
}


export const notFoundHandler=(err,req,res,next)=>{
    if(err.status==404){
     res.status(404).send({succes:false,message:err.message})
    }
}


export const genericHandler=(err,req,res,next)=>{
 console.log("Error:",err)
 res.status(500).send({succes:false,message:"There was an issue on our side",})

}