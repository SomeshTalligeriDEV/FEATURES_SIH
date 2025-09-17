import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

console.log("Starting PDF Parse Test...");

async function testPdfParsing() {
  try {
    //Use correct file path
    const filePath = path.resolve("./test/sample.pdf");
    console.log("🔍 Checking file at:", filePath);

    if (!fs.existsSync(filePath)) {
      console.error(
        "Test not found! Make sure 'sample.pdf' is inside 'test/' folder."
      );
      return;
    }

    // Read file and ensure it's a NEW buffer
    const fileBuffer = fs.readFileSync(filePath);
    console.log("✅ Test PDF loaded, parsing...");

    // Explicitly pass ONLY the buffer
    const data = await pdfParse(Buffer.from(fileBuffer));
    console.log("Extracted Text:", data.text.substring(0, 500)); // Show first 500 chars
  } catch (error) {
    console.error("PDF Parsing Error:", error);
  }
}

testPdfParsing();
