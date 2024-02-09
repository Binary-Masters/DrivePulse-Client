import React from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const img_url =
  "https://i.ibb.co/qFBTv9K/fernando-marques-dz-ZV4-Pp-Q-NI-unsplash.jpg";
const Download = ({ fullPath }) => {
  const downloadUrl = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, fullPath))
      .then((url) => {
        console.log(url);
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(new Blob([blob]));
            // const fileName = myDownloadUrl.split("/").pop();
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
      <button onClick={downloadUrl}>Download</button>
    </div>
  );
};

export default Download;
