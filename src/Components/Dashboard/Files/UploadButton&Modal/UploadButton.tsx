
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
            <button onClick={openModal} className="text-xs md:text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300" >
                <FaFileUpload className="text-xl  "/>
                <span className="hidden md:block">Upload</span>
            </button>

            {/* modal */}
            <dialog id="my_modal_1" className="modal text-black">
                <div className="modal-box bg-gradient-to-br from-[#0c2e52df] to-[#051c34] shadow shadow-sky-600">
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