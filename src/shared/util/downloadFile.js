export const downloadFile = (fileName, base64) =>{
    const base64Image = base64.split(";base64,").pop();
    const binaryData = Buffer.from(base64Image, "base64");
    const blob = new Blob([binaryData], { type: 'image/png' });
  
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    }
  }