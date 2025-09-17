import { NextResponse } from "next/server";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker"; // Still needed to register the worker

pdfjs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/legacy/build/pdf.worker.js";
pdfjs.GlobalWorkerOptions.standardFontDataUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/standard_fonts/";

export async function POST(req) {
  try {
    console.log("Receiving file upload");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.error("No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    console.log("File received:", file.name);
    console.log("Loading pdf");

    const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;
    console.log("pdf loaded with", pdf.numPages, "pages.");

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      extractedText += pageText + "\n";
    }

    console.log("pdf text extracted ");
    return NextResponse.json({ text: extractedText }, { status: 200 });
  } catch (error) {
    console.error("Error during extraction:", error);
    return NextResponse.json(
      { error: "Failed to extract text " },
      { status: 500 }
    );
  }
}
