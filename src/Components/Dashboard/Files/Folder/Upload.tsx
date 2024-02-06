
import { FaFileUpload } from "react-icons/fa";
import UploadForm from "@/Components/UploadForm/UploadForm";

const Upload = () => {
    const closeModal = () => {
        const modalElement = document.getElementById('my_modal_3');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
        }
    };
    const openModal = () => {
      const modalElement = document.getElementById('my_modal_3');
      if (modalElement) {
        (modalElement as HTMLDialogElement).showModal();
      } else {
        console.error('Modal element not found');
      }
    }
    return (
        <div>
            <button onClick={openModal}  className="text-sm btn" ><FaFileUpload/> Upload</button>
            
            {/* modal */}
            <dialog id="my_modal_3" className="modal text-black">
            <div className="modal-box bg-gradient-to-br from-cyan-900 to-sky-950">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                </form>
                <div>
                   <UploadForm/>
                  
                </div>
                
            </div>
        </dialog>
        </div>
    );
};

export default Upload;