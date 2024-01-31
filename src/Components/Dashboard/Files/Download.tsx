
import React from 'react';

const img_url = 'https://i.ibb.co/qFBTv9K/fernando-marques-dz-ZV4-Pp-Q-NI-unsplash.jpg'
const Download = () => {
    const downloadUrl = (url) =>{
        fetch(url)
        .then ((res)=>res.blob())
        .then((blob)=>{
            const blobUrl = window.URL.createObjectURL(new Blob([blob]))
            const fileName = url.split('/').pop()
            const aTag = document.createElement('a')
            aTag.href = blobUrl
            aTag.setAttribute("download", fileName)
            document.body.appendChild(aTag)
            aTag.click();
            aTag.remove()
        })
       
    }
    return (
        <div>
            <button onClick={()=>{downloadUrl(img_url)}}>Download</button>
        </div>
    );
};

export default Download;