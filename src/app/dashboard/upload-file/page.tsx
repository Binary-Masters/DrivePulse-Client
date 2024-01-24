import UploadForm from '@/Components/UploadForm/UploadForm';
import React from 'react';

const UploadFile = () => {

    return (
        <div className='mt-5'>
            <h3 className='text-2xl font-medium text-center'><span className='text-primary'>Upload </span>your <span className='text-primary'>file</span> and share it !</h3>
            <UploadForm/>

        </div>
    );
};

export default UploadFile;