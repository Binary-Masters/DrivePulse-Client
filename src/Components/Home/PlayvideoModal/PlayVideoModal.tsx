import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { MdClose } from "react-icons/md";

const PlayVideoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="btn bg-primary text-white hover:bg-blue-600 btn-circle text-xl animate-bounce absolute right-[40%] md:right-0 hover:animate-none -bottom-24 z-20"
        onClick={openModal}
      >
        <FaPlay />
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <dialog
            id="play_video_modal"
            className="modal"
            open={isOpen}
            onClick={closeModal}
          >
            <div className="modal-box w-11/12 max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <form method="dialog">
                <button className="btn text-xl btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                  <MdClose />
                </button>
              </form>
              {/* content */}
              <div className="mt-5">
                <ReactPlayer
                  className="react-player w-full rounded-md"
                  controls
                  playing={isOpen} // play when the modal is open
                  url="https://player.vimeo.com/video/154709932?app_id=122963&autoplay=1"
                  width="100%"
                  height="360px"
                />
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default PlayVideoModal;
