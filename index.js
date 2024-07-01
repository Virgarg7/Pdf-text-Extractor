const express = require('express');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const app = express();
const port = 5000;

async function extractTextFromPDF(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        console.log("***************",data)
        const text = data.text;
        console.log("**************************",text);

        fs.writeFileSync(path.join(__dirname, 'file.txt'), text, 'utf-8');
        return text;
    } catch (error) {
        console.log("Error fetching PDF: ", error);
        throw error;
    }
}

// extractTextFromPDF("book.pdf")

app.get('/api/extract', async (req, res) => {
    try {
        // const pdfPath = path.join(__dirname, 'book.pdf');
        const text = await extractTextFromPDF('book.pdf');
        res.json({ text });
    } catch (error) {
        res.status(500).send("Error extracting text from PDF");
    }
});

// app.get('/api/text', (req, res) => {
//     try {
//         const text = fs.readFileSync(path.join(__dirname, 'file.txt'), 'utf-8');
//         res.json({ text });
//     } catch (error) {
//         res.status(500).send("Error reading text file");
//     }
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
