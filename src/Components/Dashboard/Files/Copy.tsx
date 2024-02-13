import React, { useState } from "react";

interface CopyLinkProps {
  downloadUrl: string | null; // Update the type definition to allow null
}
const CopyLink: React.FC<CopyLinkProps> = ({ downloadUrl }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyText, setCopyText] = useState(downloadUrl);
  
  const handleCopyClick = async () => {
    if (downloadUrl) { // Check if downloadUrl is not null
      const textarea = document.createElement("textarea");
      textarea.value = downloadUrl;
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");

      document.body.removeChild(textarea);
      setIsCopied(true);
    }
  };

  return (
    <div>
      <button onClick={handleCopyClick}>
        {isCopied ? "Link Copied!" : "Copy Link"}
      </button>
    </div>
  );
};
export default CopyLink;
