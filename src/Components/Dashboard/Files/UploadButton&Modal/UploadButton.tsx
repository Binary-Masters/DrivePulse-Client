
import { FaFileUpload } from "react-icons/fa";
import UploadModal from "./UploadModal";

const UploadButton = () => {
    const openModal = () => {
        const modalElement = document.getElementById('my_modal_1');
        if (modalElement) {
            (modalElement as HTMLDialogElement).showModal();
        } else {
            console.error('Modal element not found');
        }
    }
    const closeModal = () => {
        const modalElement = document.getElementById('my_modal_1');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
        }
    };
    return (
        <div>
            <button onClick={openModal}  className="text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300text-sm" ><FaFileUpload/> Upload</button>
            
            {/* modal */}
            <dialog id="my_modal_1" className="modal text-black">
            <div className="modal-box bg-gradient-to-br from-cyan-900 to-sky-950">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                </form>
                <div>
                   <UploadModal />
                  
                </div>
                
            </div>
        </dialog>
        </div>
    );
};

export default UploadButton;