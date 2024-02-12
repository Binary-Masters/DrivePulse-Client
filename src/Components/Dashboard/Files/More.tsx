"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdArrowDropDownCircle,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { FiCopy, FiDownload, FiShare } from "react-icons/fi";
import ShareModal from "./ShareModal";
import RenameModal from "./RenameModal";
import CopyLink from "./Copy";
import Download from "./Download";
interface MoreDropDrownProps {
  fileName: string;
  downloadUrl: string;
}

const MoreDropDrown: React.FC<MoreDropDrownProps> = ({
  fileName,
  downloadUrl,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
    const modalElement = document.getElementById("my_modal_2");
    if (modalElement) {
      (modalElement as HTMLDialogElement).showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  const renameModal = () => {
    const modalElement = document.getElementById("my_modal_4");
    if (modalElement) {
      (modalElement as HTMLDialogElement).showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  return (
    <div className="relative">
      <motion.div animate={open ? "open" : "closed"} className="relative ">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center px-3 py-2 gap-2 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <motion.span animate={open ? "open" : "closed"}>
            <MdArrowDropDownCircle />
          </motion.span>
        </button>
        <motion.ul
          initial={false}
          animate={open ? "open" : "closed"}
          variants={wrapperVariants}
          className="flex flex-col gap-2 p-2 w-auto text-base rounded-lg bg-white text-black shadow-xl absolute top-[120%] left-[50%] z-10"
        >
          <motion.li className="flex gap-2" variants={itemVariants}>
            <FiCopy />
            <CopyLink downloadUrl={downloadUrl} />
          </motion.li>

          <motion.li variants={itemVariants}>
            <button className="flex gap-2" onClick={openModal}>
              <FiShare /> Share
            </button>
            <ShareModal fileName={fileName} downloadUrl={downloadUrl} />
          </motion.li>

          <motion.li className="flex gap-2" variants={itemVariants}>
            <FiDownload />
            <Download downloadUrl={downloadUrl} />
          </motion.li>

          <motion.li variants={itemVariants}>
            <button className="flex gap-2" onClick={renameModal}>
              <MdDriveFileRenameOutline /> Rename
            </button>
            <RenameModal />
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default MoreDropDrown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -15 },
};
