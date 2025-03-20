const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pdfFilePath = path.join(__dirname, "generated_bill.pdf");

// ✅ POST Route → Generate and Save PDF
app.post("/generate-pdf", (req, res) => {
    const { buyer, products, subtotal, paymentMethod } = req.body;

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfFilePath);
    
    doc.pipe(stream);
    doc.fontSize(18).text("Bill Receipt", { align: "center" });
    doc.moveDown();
    doc.text(`Buyer: ${buyer.name}, ${buyer.address}, ${buyer.contact}, ${buyer.email}`);
    doc.moveDown();

    products.forEach((p) => {
        doc.text(`${p.name} - ${p.quantity} x ${p.price} = ${p.total}`);
    });

    doc.moveDown();
    doc.text(`Subtotal: ${subtotal}`);
    doc.text(`Payment Method: ${paymentMethod}`);
    doc.end();

    stream.on("finish", () => res.json({ message: "PDF created!", url: "/view-pdf" }));
});

// ✅ GET Route → View PDF in Browser
app.get("/view-pdf", (req, res) => {
    if (fs.existsSync(pdfFilePath)) {
        res.setHeader("Content-Type", "application/pdf");
        res.sendFile(pdfFilePath);
    } else {
        res.status(404).json({ error: "PDF not found! Generate it first." });
    }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
