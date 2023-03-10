import fs from "fs-extra"
import { fileURLToPath } from "url"; 
import { dirname,join } from "path";
import { createReadStream, writeFileSync } from "fs";
import { cwd } from "process";

const {readJSON,writeJSON}=fs

 const dataFolderPath=join(dirname(fileURLToPath(import.meta.url)),"../data")
 const moviesToJson=join(dataFolderPath,"movies.json")
 const reviewsToJson=join(dataFolderPath,"reviews.json")

export const apiPath=(process.cwd())

 export const getMovies=()=>readJSON(moviesToJson)
export const writeMovie=arrayOfMovies=>writeJSON(moviesToJson,arrayOfMovies)
