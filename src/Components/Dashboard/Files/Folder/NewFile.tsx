import { FaFileAlt } from "react-icons/fa";

const NewFile = () => {
    return (
        <div>
            <button className="text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300" ><FaFileAlt/> New File</button>
        </div>
    );
};

export default NewFile;