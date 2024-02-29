"use client";
import { FaFileUpload } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MoreDropDown from "../Dashboard/Files/MoreDropDown/MoreDropDown";

const FolderMoreInfo = ({ info, fileName,downloadUrL, refetchFiles}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(info?.length);
  const { _id, name, timeCreated, size, type, fullPath, contentType, bucket } =
    info;
  // console.log(name);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button onClick={openModal} className="">
        <BsThreeDotsVertical />
      </button>

      {/* modal */}
      {isModalOpen && (
        <dialog open={isModalOpen} className="modal text-black">
          <div className="modal-box bg-gradient-to-br from-cyan-400 to-sky-800 h-[400px]">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2 text-xl"
                onClick={closeModal}>
                <MdClose />
              </button>
            </form>
            <div>
              <Tabs>
                <TabList>
                  <Tab>Action</Tab>
                  <Tab>Property</Tab>
                </TabList>

                <TabPanel className={"ml-20"}>
                  {/* <h2>Any content 1</h2> */}
                  <MoreDropDown
                        fileName={fileName}
                        fullPath={fullPath}
                        downloadUrl={downloadUrL}
                        bucket={bucket}
                        id={_id}
                        name={name}
                        refetchFiles={refetchFiles}
                        />
                        
                </TabPanel>
                <TabPanel className="text-slate-200 space-y-3">
                  <h3>Name: {name}</h3>
                  <h3>Content: {contentType}</h3>
                  <h3>Create Date & Time: {timeCreated}</h3>
                  <h3>Size: {(size / 1024 / 1024).toFixed(2)} MB</h3>
                  <h3>Type: {type}</h3>
                  <h3>Bucket: {bucket}</h3>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default FolderMoreInfo;
