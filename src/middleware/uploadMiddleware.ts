import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads');
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    let name = path.parse(file.originalname).name;
    // Limitar nombre a 32 caracteres
    if (name.length > 32) {
      name = name.slice(0, 32);
    }
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

export const uploadMiddleware = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'audio/ogg' || file.originalname.endsWith('.oga')) {
      cb(null, true);
    } else {
      cb(new Error('Only .oga audio files are allowed'));
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
