import axios from 'axios';
import React, { useState } from 'react';

const CopyLink: React.FC = () => {
    const [copyText, setCopyText] = useState('https://drivepulse.com'); 
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const handleCopyClick = async() => {
        const textarea = document.createElement('textarea')
        textarea.value = copyText
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        document.body.removeChild(textarea);
        setIsCopied(true)

        // for backend here (i'm using axios)
        // const response = await axios.post('/api/backend link here', {
        //     copiedText: copyText,
        //   });




    };

    return (
        <div>
            <button onClick={handleCopyClick}> {isCopied ? 'Link Copied!' : 'Copy Link'}</button>
        </div>
    );
};

export default CopyLink;
