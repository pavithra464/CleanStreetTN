/**
 * Validates and compresses an image client-side before upload.
 * - Allowed types: image/jpeg, image/png, image/webp
 * - Max size before compression: 5MB
 * - Target resolution: max 1600px width/height, quality 0.8
 */
export async function validateAndCompressImage(file: File): Promise<{
  dataUrl: string;
  sizeBytes: number;
  fileName: string;
}> {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file format. Only JPG, PNG, and WebP images are allowed.');
  }

  const MAX_RAW_BYTES = 5 * 1024 * 1024; // 5 MB
  if (file.size > MAX_RAW_BYTES) {
    throw new Error('File exceeds the 5 MB maximum size limit. Please choose a smaller image.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be initialized for compression.'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);

        // Approximate size
        const head = 'data:image/jpeg;base64,';
        const base64Length = dataUrl.length - head.length;
        const sizeBytes = Math.round((base64Length * 3) / 4);

        resolve({
          dataUrl,
          sizeBytes,
          fileName: file.name.replace(/\.[^/.]+$/, '') + '.jpg'
        });
      };
      img.onerror = () => reject(new Error('Failed to load image for validation. The file may be corrupt.'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file from disk.'));
    reader.readAsDataURL(file);
  });
}
