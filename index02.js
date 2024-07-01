let fs = require('fs')
let pdf = require('pdf-parse')
// let pdfRead = require('pdf-read')

async function extractTextFromPDF(pdfpath){
    try {
        
        // Read the pdf file 
        const databuffer = fs.readFileSync(pdfpath)

        // console.log(databuffer)

        const data = await pdf(databuffer)

        // Data in form of objects 
        console.log(data)

        const text = data.text ;

        // Data in form of text
        console.log(text)

        fs.writeFileSync("file.txt",text,'utf-8')

    } catch (error) {
        console.log("Error fetching PDF---------> ",error)
    }
}

extractTextFromPDF("book.pdf")