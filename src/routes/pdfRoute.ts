import { Router, Request, Response } from "express";
import multer from "multer";
import PDFDocument from "pdfkit";
import stream from "stream";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: PDF
 *   description: Image → PDF conversion
 */

/**
 * @swagger
 * /api/pdf/img-to-pdf:
 *   post:
 *     summary: Convert an uploaded image into a PDF
 *     tags: [PDF]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Returns the converted PDF
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post("/img-to-pdf", upload.single("image"), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No image uploaded." });
    return;
  }

  try {
    const imageBuffer = req.file.buffer;
    const doc = new PDFDocument({ autoFirstPage: false });
    const passthrough = new stream.PassThrough();

    doc.pipe(passthrough);

    const img = (doc as any).openImage(imageBuffer);
    doc.addPage({ size: [img.width, img.height] });
    doc.image(img, 0, 0);
    doc.end();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
    passthrough.pipe(res);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
