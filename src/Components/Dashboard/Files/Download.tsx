import React from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const download = 'https://cdn.create.vista.com/api/media/small/96171264/stock-photo-solitude-tree-with-birds'
interface DownloadProps {
  fileName: string;
  fullPath: string;
}

const Download: React.FC<DownloadProps> = ({ fileName, fullPath,  }) => {
  const handleDownload = async () => {
    try {
      const storage = getStorage();
      const downloadURL = await getDownloadURL(ref(storage, fullPath));
  
      fetch(download)
        .then((res) => res.blob())
        .then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          const aTag = document.createElement("a");
          aTag.href = blobUrl;
          aTag.setAttribute("download", fileName); 
          document.body.appendChild(aTag);
          aTag.click();
          aTag.remove();
        })
        .catch((err) => {
          console.error("Error downloading file:", err);
        });
    } catch (error) {
      console.error("Error getting download URL:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Download;
