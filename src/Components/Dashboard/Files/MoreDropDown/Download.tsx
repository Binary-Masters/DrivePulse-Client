import { getDownloadURL, getStorage, ref } from "firebase/storage";

interface DownloadProps {
  fileName: string;
  fullPath: string;
  bucket: string
}

const Download: React.FC<DownloadProps> = ({ fileName, fullPath,  }) => {
  const handleDownload = async () => {
    try {
      const storage = getStorage();
      const downloadURL = await getDownloadURL(ref(storage, fullPath));
      // console.log(downloadURL);
      // const downloadUrl = downloadURL.toString();
      // console.log(downloadUrl);
      
      // const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(fullPath)}?alt=media`;

  
      fetch(downloadURL)
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

  }

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Download;
