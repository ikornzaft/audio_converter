import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { convertOgaToMp3 } from '../utils/ffmpegUtils';

export const convertController = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const inputPath = req.file.path;
  const outputFilename = `${path.parse(req.file.filename).name}-${Date.now()}.mp3`;
  const outputPath = path.join('converted', outputFilename);

  try {
    await convertOgaToMp3(inputPath, outputPath);
    // Opcional: eliminar archivo original .oga
    fs.unlink(inputPath, () => {});
    // Enviar el archivo convertido directamente
    res.download(outputPath, outputFilename, (err) => {
      fs.unlink(outputPath, () => {}); // Limpieza del .mp3 después de la descarga
      if (err) {
        res.status(500).json({ error: 'Error sending file' });
        return;
      }
    });
  } catch (err) {
    fs.unlink(inputPath, () => {});
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    res.status(500).json({ error: 'Conversion failed', details: (err as Error).message });
    return;
  }
};
