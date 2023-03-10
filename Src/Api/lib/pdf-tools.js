
import PdfPrinter from "pdfmake"


export const  getPDFReadableStream=(movie)=>{
    const fonts={
     Helvetica:{
        normal:"Helvetica",
        bold:"Helvetica-Bold",
        italics:"Helvetica-Oblique",
        bolditalics:"Helvetica BoldOblique"

     }
    }
    const printer=new PdfPrinter(fonts)

    const dd = {
        content: [
            movie.title,movie.type,movie.year
        ],
        defaultStyle:{
            font:"Helvetica"
        }
        
    }
    const pdfReadableStream=printer.createPdfKitDocument(dd,{})
    pdfReadableStream.end()

    return pdfReadableStream
}