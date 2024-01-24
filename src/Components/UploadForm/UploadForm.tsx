"use client"

import { File } from "lucide-react";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const UploadForm = () => {
    const [fileInfo, setFileInfo] = useState()
    // console.log(fileInfo);
    return (
        <div className="mx-3">
            <div className="flex items-center justify-center w-full max-w-3xl mx-auto mt-5">
    <label style={{ background: 'linear-gradient(to top, rgb(231, 233, 239), #ffffff)' }} htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300  shadow-lg border-dashed rounded-lg cursor-pointer bg-blue-100  ">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-4 text-primary " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-600 "><span className="font-semibold">Click to upload</span> or <span className='text-primary font-medium'>drag</span> and <span className='text-primary font-medium'>drop</span></p>
            <p className="text-xs text-gray-500 font-medium">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e)=>setFileInfo(e.target?.files[0])} />
    </label>
</div> 
<div className="flex items-center justify-between max-w-3xl mx-auto p-5 border border-gray-400 rounded-md mt-5 shadow-md relative">
<div className="flex items-center gap-1">
<File className="text-primary text-3xl"/> <h2 className="text-gray-500 font-medium">{fileInfo?.name}</h2>    
</div> <h3 className="text-gray-500 font-medium mr-10">{fileInfo?.type} / {(fileInfo?.size/1024/1024).toFixed(2)} MB</h3>
<button onClick={()=>setFileInfo(null)} className="absolute right-1 top-[14px] btn-sm btn btn-circle text-xl"><MdClose/></button>
</div>
   <div className='flex justify-center mt-4'>
   <button disabled={!fileInfo} className='bg-primary text-xl text rounded-full text-white hover:bg-blue-600 transition-all duration-300 px-6 py-2 text-center disabled:bg-gray-300'>Upload</button>
   </div>
        </div>
    );
};

export default UploadForm;