import { FaFileUpload } from "react-icons/fa";

const Upload = () => {
    return (
        <div>
            <button className="text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300text-sm" ><FaFileUpload/> Upload</button>
        </div>
    );
};

export default Upload;