import ffmpeg from 'fluent-ffmpeg';

export function convertOgaToMp3(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('error', (err) => reject(err))
      .on('end', () => resolve())
      .save(outputPath);
  });
}
