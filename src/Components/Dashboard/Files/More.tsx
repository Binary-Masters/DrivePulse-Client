'use client'
import { FiShare, FiCopy, FiDownload, FiAlertCircle, } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import React from 'react';
import { MdArrowDropDownCircle, MdDriveFileRenameOutline } from "react-icons/md";
import { IconType } from "react-icons";
import ShareModal from "./ShareModal";
import RenameModal from "./RenameModal";
import CopyLink from "./Copy";
import Link from "next/link";
import Download from "./Download";




const MoreDropDrown = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    const modalElement = document.getElementById('my_modal_3');
    if (modalElement) {
      (modalElement as HTMLDialogElement).showModal();
    } else {
      console.error('Modal element not found');
    }
  };
  const renameModal = () => {
    const modalElement = document.getElementById('my_modal_4');
    if (modalElement) {
      (modalElement as HTMLDialogElement).showModal();
    } else {
      console.error('Modal element not found');
    }
  };

  return (
    <div className="">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center px-3 py-2 gap-2 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <motion.span variants={iconVariants}>
            <MdArrowDropDownCircle />
          </motion.span>
        </button>
{/* Dropdown menu */}
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 pr-4 rounded-lg bg-white text-black shadow-xl absolute top-[120%] left-[50%] w-auto z-10"
        >
          <motion.li
            onClick={() => setOpen(true)}
            className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
          > <FiCopy/> <CopyLink/>
          </motion.li>

          <motion.li
            onClick={() => setOpen(true)}
            className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
          > <button className="flex gap-2" onClick={openModal}><FiShare/> Share</button>
            <ShareModal />
          </motion.li>


          <motion.li
            onClick={() => setOpen(false)}
            className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
          > <FiDownload/> <Download/>
          </motion.li>

          <motion.li
            onClick={() => setOpen(true)}
            className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
          > <button className="flex gap-2" onClick={renameModal}><MdDriveFileRenameOutline/> Rename</button>
            <RenameModal/>
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

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
