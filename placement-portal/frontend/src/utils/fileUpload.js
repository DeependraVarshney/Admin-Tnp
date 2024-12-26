// utils/fileUpload.js
export const validateFile = (file, allowedTypes, maxSize) => {
    const errors = [];
  
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not supported`);
    }
  
    if (file.size > maxSize) {
      errors.push(`File size exceeds ${formatFileSize(maxSize)}`);
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  export const compressImage = async (file, maxWidth = 800) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ratio = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * ratio;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              }));
            },
            'image/jpeg',
            0.8
          );
        };
      };
    });
  };