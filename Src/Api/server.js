import  Express from "express";
import listEndpoints from "express-list-endpoints";
import MoviesRouter from "./Routes/MoviesRouter.js";
import cors from 'cors';
import { badRequestHandler, genericHandler, notFoundHandler } from "./errorHandlers.js";
import movieFilesRouter from "./Routes/MoviesFileRouter.js";
import { apiPath, PublicFolderPath } from "./lib/fs-tools.js";
import ReviewsRouter from "./Routes/ReviewsRouter.js";


const port=process.env.PORT

const server=Express()
server.use(Express.json())
server.use(Express.static(PublicFolderPath))
const whiteList=[process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const corsOpt={
    origin:(currentOrigin,corsNext)=>{
        if(!currentOrigin|| whiteList.indexOf(currentOrigin)!==-1){
            corsNext(null,true)
        }else {
            corsNext(createHttpError(400, `Origin ${currentOrigin} is not in the whitelist!`))
          }
    }
}
server.use(cors(corsOpt))

server.use(Express.static(apiPath))
server.use("/medias",MoviesRouter)
server.use("/medias", movieFilesRouter)
server.use("/medias",ReviewsRouter)
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericHandler)


server.listen(port,()=>{

    console.table(listEndpoints(server))
    console.log(`Server is listening on port ${port}`)
})