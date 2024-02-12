import React, { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

interface DownloadProps {
  downloadUrl: string;
}

const Download: React.FC<DownloadProps> = ({ downloadUrl }) => {
  const handleDownload = () => {
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
        console.log(err);
      });
  };

  return (
    <div>
      {downloadUrl ? (
        <a href={downloadUrl} download>
          Download
        </a>
      ) : (
        <button onClick={handleDownload}>Download</button>
      )}
    </div>
  );
};

export default Download;
