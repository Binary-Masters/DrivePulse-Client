// Download.tsx

import React, { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

interface DownloadProps {
  downloadUrl: string | null; // Define downloadUrl prop here
}

const Download: React.FC<DownloadProps> = ({ downloadUrl }) => {
  const handleDownload = () => {
    if (!downloadUrl) {
      console.error("Download URL is not available");
      return;
    }

    fetch(downloadUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const aTag = document.createElement("a");
        aTag.href = blobUrl;
        aTag.setAttribute("download", blobUrl);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
      });
  };

  return (
    <div>
      {downloadUrl ? (
        <button onClick={handleDownload}>Download</button>
      ) : (
        <p>Download URL is not available</p>
      )}
    </div>
  );
};

export default Download;
