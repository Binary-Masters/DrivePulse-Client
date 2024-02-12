import React, { useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

interface DownloadProps {
  fullPath: string;
}

const Download: React.FC<DownloadProps> = ({ fullPath }) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDownload = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, fullPath))
      .then((url) => {
        console.log(url);
        setDownloadUrl(url); // Update the downloadUrl state
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(new Blob([blob]));
            const aTag = document.createElement("a");
            aTag.href = blobUrl;
            aTag.setAttribute("download", blobUrl);
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
          });
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
