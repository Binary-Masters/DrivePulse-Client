

interface DownloadProps {
  downloadUrl: string;
}

const Download: React.FC<DownloadProps> = ({ downloadUrl }) => {
  const handleDownload = (downloadUrl) => {
    console.log(downloadUrl);
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
        <a href={downloadUrl} target="_blank" download>
          Download
        </a>
      ) : (
        <button onClick={() => handleDownload(downloadUrl)}>Download</button>
      )}
    </div>
  );
};

export default Download;
