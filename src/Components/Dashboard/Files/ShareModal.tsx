import { FaGlobeAsia, FaLock } from "react-icons/fa";
import {
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";
import "firebase/storage";

// interface ShareModalProps {
//   fileName: string;
//   downloadUrl: string;
//   setDownloadUrl: React.Dispatch<React.SetStateAction<string>>;
//   setFileName: React.Dispatch<React.SetStateAction<string>>;
// }
interface ShareModalProps {
  fileName: string;
  downloadUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ fileName, downloadUrl }) => {
  const closeModal = () => {
    const modalElement = document.getElementById("my_modal_2");
    if (modalElement) {
      (modalElement as HTMLDialogElement).close();
    }
  };

  return (
    <dialog id="my_modal_2" className="modal text-black">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
        </form>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Share this file</h2>
          <p className="text-lg text-gray-700">
            {fileName ? fileName : "share.png"}
          </p>
          <hr className="bg-gray-400 h-[1px]" />
          <label htmlFor="">Share Link</label>
          <input
            type="text"
            value={downloadUrl}
            className="input input-accent"
          />
          <hr className="bg-gray-400 h-[1px]" />
          <h2 className="text-xl font-medium">Access Control</h2>
          <div>
            <select className="select w-full">
              <option value="private">
                <FaLock /> Only me
              </option>
              <option value="public">
                <FaGlobeAsia /> Public
              </option>
            </select>
          </div>
          <hr className="bg-gray-400 h-[1px]" />
          <h2 className="text-xl font-medium">Share With</h2>
          <div className="flex gap-5 mb-5">
            <FacebookMessengerShareButton
              url={downloadUrl}
              appId="840871220840045"
            >
              <FacebookMessengerIcon size={32} round={true} />
            </FacebookMessengerShareButton>
            <EmailShareButton url={downloadUrl}>
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
          <hr className="bg-gray-400 h-[1px]" />
          <div className="form-control mt-6 flex flex-row justify-end gap-2 ">
            <button className="text-white bg-gradient-to-br from-sky-500 to-blue-600 hover:bg-gradient-to-bl rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
              Done
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ShareModal;
