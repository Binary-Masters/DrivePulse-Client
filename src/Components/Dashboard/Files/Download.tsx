
import React from 'react';

const img_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Handyaufnahme_des_Sonnenuntergangs_als_Zeitraffer_20200909_DSC3277.jpg/330px-Handyaufnahme_des_Sonnenuntergangs_als_Zeitraffer_20200909_DSC3277.jpg'
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