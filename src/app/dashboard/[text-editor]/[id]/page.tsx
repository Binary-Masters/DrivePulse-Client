"use client"
import TextEditor from '@/Components/Dashboard/Files/CreateFile/TextEditor';
import useAuth from '@/Hooks/useAuth';
import useGetFiles from '@/Hooks/useGetFiles';
import { getDownloadURL, getStorage, ref, updateMetadata } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { MdOutlineArrowBack } from 'react-icons/md';
import useStorage from '@/Hooks/useStorage';
import LoadingAnimation from '@/Components/Animation/LoadingAnimation/LoadingAnimation';
import useTextEditor from '@/Hooks/useTextEditor';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EditTextFile = ({ params }) => {
    const { user } = useAuth();
    const navigation = useRouter()
    const { filesData, } = useGetFiles();
    const [fileContent, setFileContent] = useState('');
    const [loading, setLoading] = useState(true)
    const { getFileURL, uploadFile } = useStorage();
    // console.log(uploadFile)

    const findData = filesData.find(file => file._id === params.id)
    const fetchData = async () => {
        try {
            const textURL = await getFileURL(findData?.fullPath);
            const response = await fetch(textURL);
            const textContent = await response.text();
            setFileContent(textContent);
        } catch (error) {
            console.error('Error fetching file content:', error);
        } finally {
            setLoading(false);
        }
    };
    if (findData) {
        fetchData();
    }

    const handleSave = async () => {
        console.log('fileContent before save:', fileContent);

    const storage = getStorage();
    const fileRef = ref(storage, findData?.fullPath);
    
        try {
            await uploadFile(fileRef, fileContent);
            console.log('fileContent after save:', fileContent);
    
            await updateMetadata(fileRef, {
                customMetadata: {
                    lastModified: new Date().toISOString(),
                },
            });
    
            console.log('File saved successfully!');
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };
    
    console.log('fileContent text', fileContent)

    return (
        <section className='gradient2-bg pt-20 min-h-screen'>
            <div className='flex justify-between items-center text-white bottom-shadow py-2 px-4'>
                <h2>{findData?.name}</h2>
                <div className='flex gap-4 text-white'>
                    <button onClick={() => navigation.back()}
                        className='btn bg-slate-700 text-white hover:text-black border-none'><MdOutlineArrowBack className='text-xl' /> Go Back</button>
                    <button onClick={handleSave} className='btn bg-primary text-white hover:text-black border-none'><FaSave /> Submit</button>
                </div>
            </div>
            <div className='bg-slate-200 min-h-[calc(100vh-145px)]'>
                {loading ? (
                    <LoadingAnimation />
                ) : (
                    // <TextEditor fileContent={fileContent}  />
                    <ReactQuill theme="snow" value={fileContent} onChange={setFileContent} />
                )}
            </div>
        </section>
    );
};

export default EditTextFile;