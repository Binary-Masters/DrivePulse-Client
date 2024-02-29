// useTextEditor.js

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

export default function useTextEditor() {
  const uploadFile = async (fileRef, content) => {
    const storage = getStorage();

    // Convert the content to bytes or any format suitable for your use case
    const contentBytes = new TextEncoder().encode(content);

    // Upload the content to the specified file reference
    await uploadBytes(fileRef, contentBytes);

    // You might want to return some information about the upload, like the download URL
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  return { uploadFile };
}
